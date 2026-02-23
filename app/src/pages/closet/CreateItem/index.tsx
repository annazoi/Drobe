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
import ImagePicker from "../../../components/ui/ImagePicker";
import { useMutation } from "react-query";
import Modal from "../../../components/ui/Modal";
import { ImagePickerItemData } from "../../../interfaces/components";
import { NewClothe } from "../../../interfaces/clothe";
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

const CreateItem: FC<CreateItemProps> = ({ isOpen, onClose }) => {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [season, setSeason] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const toast = useToast();

  const handleImageChange = (value: ImagePickerItemData) => {
    const filesToStore = value.files.map((image: any) => image.file);
    setSelectedImages(filesToStore);
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
          <Box minH="300px">
            {activeStep === 0 && (
              <VStack spacing={6}>
                <Text fontWeight="600" fontSize="sm" color="neutral.500" alignSelf="flex-start" textTransform="uppercase" letterSpacing="widest">
                  Step 01 / Photo
                </Text>
                <ImagePicker
                  onChange={handleImageChange}
                  label="DROP OR SELECT IMAGE"
                  name="image"
                />
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
              isDisabled={activeStep === 0 && selectedImages.length === 0}
            />
          ) : (
            <Button
              text="SAVE TO CLOSET"
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
