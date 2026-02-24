import {
  ModalBody,
  ModalFooter,
  Textarea,
  useToast,
  VStack,
  HStack,
  Text,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepSeparator,
  Box,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { NewClothe } from "../../../interfaces/clothe";
import { useMutation } from "react-query";
import Modal from "../../../components/ui/Modal";
import Select from "../../../components/ui/Select";
import { CLOTHE_TYPES, SEASONS } from "../../../constants/clotheTypes";
import { createClothe } from "../../../services/clothe";
import Button from "../../../components/ui/Button";

interface CreateItemProps {
  isOpen: any;
  onClose: any;
}

const steps = [
  { title: "Media", description: "Upload photo" },
  { title: "Details", description: "Categorize" },
  { title: "Finalize", description: "Add notes" },
];

import StudioDropzone from "../../../components/Studio/StudioDropzone";
import AIProcessor from "../../../components/Studio/AIProcessor";
import StudioToolbar from "../../../components/Studio/StudioToolbar";

const CreateItem: FC<CreateItemProps> = ({ isOpen, onClose }) => {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<"restore" | "erase" | null>(null);
  const [season, setSeason] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const toast = useToast();

  const handleUpload = (file: File) => {
    setSelectedImages([file]);
    const reader = new FileReader();
    reader.onload = (e) => setRawImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleProcessed = (blob: Blob) => {
    // Create a new file from the blob to be uploaded
    const file = new File([blob], "processed_item.png", { type: "image/png" });
    setSelectedImages([file]);
    setProcessedImage(URL.createObjectURL(blob));
  };

  const { mutate: createClotheMutate, isLoading: createClotheIsLoading } =
    useMutation({
      mutationFn: ({ images, type, season, notes }: NewClothe) =>
        createClothe({ images, type, season, notes }),
    });

  const handleSave = () => {
    if (!selectedImages.length) {
      toast({ title: "Please select an image", status: "error", position: "top" });
      return;
    }
    // In a real app, we would send the processed PNG Blob here
    createClotheMutate(
      {
        images: selectedImages,
        type: category,
        season: season,
        notes: notes,
      },
      {
        onSuccess: () => {
          toast({
            title: "Item added to closet",
            status: "success",
            position: "top",
          });
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="NEW CLOSET ITEM"
      size="xl"
    >
      <ModalBody py={8}>
        <VStack spacing={8} align="stretch">
          {/* Minimal Stepper */}
          <Stepper index={activeStep} colorScheme="brand" size="sm">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink='0' display={{ base: "none", md: "block" }}>
                  <StepTitle>{step.title}</StepTitle>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          {/* Step Contents */}
          <Box minH="400px">
            {activeStep === 0 && (
              <VStack spacing={6} position="relative">
                <HStack w="100%" justify="space-between">
                  <Text fontWeight="600" fontSize="sm" color="neutral.500" textTransform="uppercase" letterSpacing="widest">
                    Step 01 / Studio
                  </Text>
                  {rawImage && (
                    <Button 
                      text="RESET" 
                      variant="ghost" 
                      size="xs" 
                      onClick={() => {
                        setRawImage(null);
                        setProcessedImage(null);
                        setSelectedImages([]);
                      }} 
                    />
                  )}
                </HStack>

                {!rawImage ? (
                  <StudioDropzone onUpload={handleUpload} />
                ) : (
                  <Box w="100%" position="relative">
                    <AIProcessor 
                      originalImage={rawImage} 
                      onProcessed={handleProcessed} 
                      activeTool={activeTool}
                    />
                    {processedImage && (
                      <StudioToolbar 
                        activeTool={activeTool}
                        onToolSelect={setActiveTool}
                      />
                    )}
                  </Box>
                )}
              </VStack>
            )}

            {activeStep === 1 && (
              <VStack spacing={6}>
                <Text fontWeight="600" fontSize="sm" color="neutral.500" alignSelf="flex-start" textTransform="uppercase" letterSpacing="widest">
                  Step 02 / Classification
                </Text>
                <Select
                  onChange={(e: any) => setCategory(e.target.value)}
                  options={CLOTHE_TYPES}
                  placeholder="SELECT TYPE"
                />
                <Select
                  onChange={(e: any) => setSeason([e.target.value])}
                  options={SEASONS}
                  placeholder="SELECT SEASON"
                />
              </VStack>
            )}

            {activeStep === 2 && (
              <VStack spacing={6}>
                <Text fontWeight="600" fontSize="sm" color="neutral.500" alignSelf="flex-start" textTransform="uppercase" letterSpacing="widest">
                  Step 03 / Finalize
                </Text>
                <Textarea 
                  placeholder="ADD STYLING NOTES OR DETAILS..." 
                  onChange={(e) => setNotes(e.target.value)} 
                  h="150px"
                  borderRadius="0"
                  borderColor="neutral.200"
                  _focus={{ borderColor: "neutral.900", boxShadow: "none" }}
                />
              </VStack>
            )}
          </Box>
        </VStack>
      </ModalBody>
      
      <ModalFooter borderTop="1px solid" borderColor="neutral.100" pt={6}>
        <HStack w="100%" spacing={4}>
          {activeStep > 0 && (
            <Button
              text="BACK"
              variant="outline"
              onClick={goToPrevious}
              width="100%"
            />
          )}
          {activeStep < 2 ? (
            <Button
              text="NEXT"
              onClick={goToNext}
              width="100%"
              isDisabled={activeStep === 0 && !processedImage}
            />
          ) : (
            <Button
              text="SAVE TO ARCHIVE"
              width="100%"
              isLoading={createClotheIsLoading}
              onClick={handleSave}
            />
          )}
        </HStack>
      </ModalFooter>
    </Modal>
  );
};

export default CreateItem;
