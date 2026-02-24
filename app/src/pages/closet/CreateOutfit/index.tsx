import { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Image,
  HStack,
  ModalBody,
  ModalFooter,
  VStack,
  useToast,
  Text,
  SimpleGrid,
  Textarea,
  Flex,
  Heading,
  Icon,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { authStore } from "../../../store/authStore";
import { CategorizedClothes, Clothe } from "../../../interfaces/clothe";
import { CLOTHE_TYPES } from "../../../constants/clotheTypes";
import Modal from "../../../components/ui/Modal";
import { getClothes } from "../../../services/clothe";
import { NewOutfit } from "../../../interfaces/outfit";
import { createOutfit } from "../../../services/outfit";
import { categorizeClothes } from "../../../utils/categorizeClothes";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import { OUTFIT_TYPES } from "../../../constants/outfittypes";
import { IoCloseOutline, IoTrashOutline, IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { fabric } from "fabric";

interface CreateOutfitProps {
  isOpen: any;
  onClose: any;
}

const CreateOutfit: FC<CreateOutfitProps> = ({ isOpen, onClose }) => {
  const { userId } = authStore((state) => state);
  const [clothes, setClothes] = useState<CategorizedClothes>();
  const [selectedClothes, setSelectedClothes] = useState<Clothe[]>([]);
  const [colorScheme, setColorScheme] = useState("");
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("");

  const toast = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<fabric.Canvas | null>(null);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

  // Initialize Fabric Canvas
  useEffect(() => {
    if (isOpen && canvasRef.current && !fabricCanvas.current) {
      fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#ffffff",
        preserveObjectStacking: true,
      });

      // Selection styles
      fabric.Object.prototype.set({
        transparentCorners: false,
        cornerColor: "#000000",
        cornerStyle: "circle",
        borderColor: "#000000",
        cornerSize: 8,
        padding: 10,
      });

      const updateToolbarPos = () => {
        const activeObj = fabricCanvas.current?.getActiveObject();
        if (activeObj) {
          const rect = activeObj.getBoundingRect();
          // Adjust for canvas position if needed, but here it's relative to container
          setToolbarPos({
            top: rect.top - 50,
            left: rect.left + rect.width / 2,
          });
          setActiveObject(activeObj);
        } else {
          setActiveObject(null);
        }
      };

      const canvas = fabricCanvas.current;
      canvas.on('selection:created', updateToolbarPos);
      canvas.on('selection:updated', updateToolbarPos);
      canvas.on('selection:cleared', () => setActiveObject(null));
      canvas.on('object:moving', updateToolbarPos);
      canvas.on('object:scaling', updateToolbarPos);
      canvas.on('object:rotating', updateToolbarPos);
    }

    return () => {
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
        fabricCanvas.current = null;
      }
    };
  }, [isOpen]);

  // Sync selected clothes with canvas
  useEffect(() => {
    if (!fabricCanvas.current) return;

    const canvas = fabricCanvas.current;
    const currentObjects = canvas.getObjects() as (fabric.Object & { clotheId?: string })[];

    // Add new items
    selectedClothes.forEach((clothe) => {
      const exists = currentObjects.some((obj) => obj.clotheId === clothe.id);
      if (!exists) {
        fabric.Image.fromURL(clothe.images[0].file, (img) => {
          img.set({
            left: 100 + Math.random() * 200,
            top: 100 + Math.random() * 200,
          });
          img.scaleToWidth(200);
          (img as any).clotheId = clothe.id;
          canvas.add(img);
          canvas.requestRenderAll();
        }, { crossOrigin: 'anonymous' });
      }
    });

    // Remove unselected items
    currentObjects.forEach((obj) => {
      if (obj.clotheId && !selectedClothes.some((c) => c.id === obj.clotheId)) {
        canvas.remove(obj);
      }
    });
  }, [selectedClothes]);

  useQuery(
    "clothes",
    () => getClothes({ userId: userId }),
    {
      onSuccess: (data: Clothe[]) => {
        categorizeClothes({ data, setClothes });
      },
    }
  );

  const { mutate: CreateOutfitMutate, isLoading: CreateOutfitIsLoading } =
    useMutation({
      mutationFn: ({ clothes, colorScheme, notes, type }: NewOutfit) =>
        createOutfit({ clothes, colorScheme, notes, type }),
    });

  const handleSelectedClothes = (clothe: Clothe) => {
    const isSelected = selectedClothes.find((item) => item.id === clothe.id);
    if (isSelected) {
      setSelectedClothes(selectedClothes.filter((item) => item.id !== clothe.id));
    } else {
      setSelectedClothes([...selectedClothes, clothe]);
    }
  };

  const handleNewOutfit = () => {
    if (selectedClothes.length === 0) {
      toast({ title: "Please select at least one item", status: "warning", position: "top" });
      return;
    }

    CreateOutfitMutate(
      {
        clothes: selectedClothes.map((item) => item.id),
        colorScheme: colorScheme,
        notes: notes,
        type: type,
      },
      {
        onSuccess: () => {
          toast({ title: "Outfit curated", status: "success", position: "top" });
          onClose();
        },
      }
    );
  };

  const handleClearCanvas = () => {
    setSelectedClothes([]);
    fabricCanvas.current?.clear();
    if (fabricCanvas.current) {
        fabricCanvas.current.backgroundColor = "#ffffff";
        fabricCanvas.current.renderAll();
    }
    setActiveObject(null);
  };

  const deleteSelected = () => {
    if (activeObject) {
      const clotheId = (activeObject as any).clotheId;
      if (clotheId) {
        setSelectedClothes(prev => prev.filter(c => c.id !== clotheId));
      }
      fabricCanvas.current?.remove(activeObject);
      fabricCanvas.current?.discardActiveObject();
      setActiveObject(null);
    }
  };

  const bringToFront = () => {
    if (activeObject) {
      fabricCanvas.current?.bringToFront(activeObject);
      fabricCanvas.current?.requestRenderAll();
    }
  };

  const sendToBack = () => {
    if (activeObject) {
      fabricCanvas.current?.sendToBack(activeObject);
      // Ensure background stays at the very back if it exists
      if (fabricCanvas.current?.backgroundColor) {
        // Fabric handles backgroundColor separately, so this is usually fine
      }
      fabricCanvas.current?.requestRenderAll();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      title="OUTFIT CURATOR"
      maxW="95vw"
    >
      <ModalBody p={0} >
        <Flex h="75vh" overflow="hidden" >
          {/* LEFT: Item Library */}
          <Box w="300px" borderRight="1px solid" borderColor="neutral.200" overflowY="auto" p={6}>
            <Heading size="xs" textTransform="uppercase" letterSpacing="widest" mb={6} color="neutral.400">
              Library
            </Heading>
            <VStack spacing={8} align="stretch">
              {CLOTHE_TYPES.map((type, idx) => {
                const typeItems = clothes ? clothes[type.value] : [];
                if (!typeItems || typeItems.length === 0) return null;
                return (
                  <VStack key={idx} align="stretch" spacing={3}>
                    <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="widest">
                      {type.label}
                    </Text>
                    <SimpleGrid columns={2} gap={2}>
                      {typeItems.map((clothe: Clothe) => (
                        <Box
                          key={clothe.id}
                          pos="relative"
                          cursor="pointer"
                          onClick={() => handleSelectedClothes(clothe)}
                          transition="all 0.2s"
                          _hover={{ opacity: 0.8 }}
                        >
                          <Image
                            src={clothe.images[0].file}
                            boxSize="100px"
                            objectFit="cover"
                            border="1px solid"
                            borderColor={selectedClothes.find(i => i.id === clothe.id) ? "brand.500" : "neutral.100"}
                            filter={selectedClothes.find(i => i.id === clothe.id) ? "none" : "grayscale(1)"}
                          />
                        </Box>
                      ))}
                    </SimpleGrid>
                  </VStack>
                );
              })}
            </VStack>
          </Box>

          {/* CENTER: Canvas */}
          <Flex flex="1" bg="neutral.50" pos="relative" justify="center" align="center" direction="column" p={8}>
             <HStack pos="absolute" top={4} left={4} spacing={1} onClick={handleClearCanvas} cursor="pointer" _hover={{ color: "red.400" , bg: "gray.100"}} transition="all 0.2s" bg="white" p={2} px={4} borderRadius="full" zIndex={10} boxShadow="sm">
                 <Icon as={IoCloseOutline} />
                 <Text fontSize="xs" fontWeight="700" color="neutral.500" textTransform="uppercase" letterSpacing="widest">
                   Clear Canvas
                 </Text>
             </HStack>

            <Box 
              bg="white" 
              boxShadow="0 20px 50px rgba(0,0,0,0.1)" 
              pos="relative"
              overflow="hidden"
            >
              <canvas ref={canvasRef} />
              
              {/* Floating Object Toolbar */}
              {activeObject && (
                <HStack
                  pos="absolute"
                  top={`${toolbarPos.top}px`}
                  left={`${toolbarPos.left}px`}
                  transform="translateX(-50%)"
                  bg="white"
                  p={1}
                  borderRadius="full"
                  boxShadow="xl"
                  border="1px solid"
                  borderColor="neutral.100"
                  zIndex={20}
                  spacing={1}
                >
                  <Tooltip label="Bring to Front" fontSize="xs">
                    <IconButton
                      aria-label="Bring to Front"
                      icon={<IoArrowForwardOutline style={{ transform: "rotate(-90deg)" }} />}
                      size="sm"
                      variant="ghost"
                      onClick={(e) => { e.stopPropagation(); bringToFront(); }}
                      rounded="full"
                    />
                  </Tooltip>
                  <Tooltip label="Send to Back" fontSize="xs">
                    <IconButton
                      aria-label="Send to Back"
                      icon={<IoArrowBackOutline style={{ transform: "rotate(-90deg)" }} />}
                      size="sm"
                      variant="ghost"
                      onClick={(e) => { e.stopPropagation(); sendToBack(); }}
                      rounded="full"
                    />
                  </Tooltip>
                  <Box w="1px" h="15px" bg="neutral.100" mx={1} />
                  <Tooltip label="Remove Item" fontSize="xs">
                    <IconButton
                      aria-label="Remove Item"
                      icon={<IoTrashOutline />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={(e) => { e.stopPropagation(); deleteSelected(); }}
                      rounded="full"
                    />
                  </Tooltip>
                </HStack>
              )}

              {selectedClothes.length === 0 && (
                <Flex pos="absolute" inset={0} align="center" justify="center" pointerEvents="none">
                  <Text color="neutral.300" textTransform="uppercase" letterSpacing="0.2em" fontWeight="300">
                    Select items to curate
                  </Text>
                </Flex>
              )}
            </Box>
          </Flex>

          {/* RIGHT: Curate Panel */}
          <Box w="350px" borderLeft="1px solid" borderColor="neutral.200" p={8} overflowY="auto">
            <Heading size="xs" textTransform="uppercase" letterSpacing="widest" mb={8} color="neutral.400">
              Curation
            </Heading>
            <VStack spacing={6} align="stretch">
              <Select
                onChange={(e: any) => setType(e.target.value)}
                options={OUTFIT_TYPES}
                placeholder="OCCASION"
              />
              <Box>
                <Text fontSize="xs" fontWeight="700" mb={2} textTransform="uppercase" letterSpacing="widest">Color Palette</Text>
                <Textarea 
                  placeholder="E.g., Monochrome charcoal, Gold accents..."
                  onChange={(e) => setColorScheme(e.target.value)}
                  borderRadius="0"
                  borderColor="neutral.100"
                  size="sm"
                />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight="700" mb={2} textTransform="uppercase" letterSpacing="widest">Styling Notes</Text>
                <Textarea 
                  placeholder="Add editorial notes..."
                  onChange={(e) => setNotes(e.target.value)}
                  borderRadius="0"
                  borderColor="neutral.100"
                  h="120px"
                  size="sm"
                />
              </Box>
            </VStack>
          </Box>
        </Flex>
      </ModalBody>
      
      <ModalFooter borderTop="1px solid" borderColor="neutral.100" p={6}>
        <HStack w="100%" spacing={6} justify="flex-end">
          <Button text="CANCEL" variant="ghost" onClick={onClose} />
          <Button 
            text="FINALIZE OUTFIT" 
            onClick={handleNewOutfit} 
            isLoading={CreateOutfitIsLoading}
            isDisabled={selectedClothes.length === 0}
          />
        </HStack>
      </ModalFooter>
    </Modal>
  );
};

export default CreateOutfit;
