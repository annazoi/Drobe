import { FC, useState } from "react";
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
import { IoCloseOutline } from "react-icons/io5";

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      title="OUTFIT CURATOR"
      maxW="95vw"
    >
      <ModalBody p={0} >
        <Flex h="70vh" overflow="hidden" >
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
          <Flex flex="1" bg="neutral.50" pos="relative" justify="center" align="center" direction="column">
             <HStack pos="absolute" top={6} left={6} spacing={2}>
                 <Icon as={IoCloseOutline} cursor="pointer" onClick={() => setSelectedClothes([])} />
                 <Text fontSize="xs" fontWeight="600" color="neutral.400" textTransform="uppercase" letterSpacing="widest">
                   Clear Canvas
                 </Text>
             </HStack>

            <Box 
              w="90%" 
              h="90%" 
              bg="white" 
              boxShadow="0 10px 30px rgba(0,0,0,0.05)" 
              pos="relative"
              overflow="hidden"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignContent="center"
              gap={4}
              p={8}
            >
              {selectedClothes.length === 0 ? (
                <Text color="neutral.300" textTransform="uppercase" letterSpacing="0.2em" fontWeight="300">
                  Select items to curate
                </Text>
              ) : (
                selectedClothes.map((clothe) => (
                  <Box 
                    key={clothe.id} 
                    w="150px" 
                    h="200px" 
                    pos="relative"
                    transition="transform 0.3s ease"
                    _hover={{ transform: "scale(1.05)", zIndex: 10 }}
                  >
                    <Image
                      src={clothe.images[0].file}
                      w="100%"
                      h="100%"
                      objectFit="contain"
                    />
                    <IconButton 
                      pos="absolute" 
                      top={-2} 
                      right={-2} 
                      size="xs" 
                      rounded="full"
                      bg="white"
                      boxShadow="sm"
                      icon={<IoCloseOutline />}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleSelectedClothes(clothe);
                      }}
                      aria-label="Remove"
                    />
                  </Box>
                ))
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
