import { FC, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
  HStack,
  ModalBody,
  ModalFooter,
  VStack,
  useToast,
  Grid,
  Textarea,
} from "@chakra-ui/react";
import "./style.css";
import { useMutation, useQuery } from "react-query";
import { authStore } from "../../../store/authStore";
import { CategorizedClothes, Clothe } from "../../../interfaces/clothe";
import { CLOTHE_TYPES } from "../../../constants/clotheTypes";
import Modal from "../../../components/ui/Modal";
import { getClothes } from "../../../services/clothe";
import { NewOutfit } from "../../../interfaces/outfit";
import { createOutfit } from "../../../services/outfit";
import Input from "../../../components/ui/Input";
import { OptionItem } from "../../../interfaces/components";
import Select from "../../../components/ui/Select";
import { OUTFIT_TYPES } from "../../../constants/outfittypes";
import { categorizeClothes } from "../../../utils/categorizeClothes";
import Button from "../../../components/ui/Button";

// {
//  shirts:[{images:[],type:'',season:[]},{images:[],type:'',season:[]}],
//   pants:[],
//   shoes:[{},{}]
// }

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

  useEffect(() => {
    // console.log("clothes", clothes);
  }, [clothes]);

  const handleSelectedClothes = (clothe: Clothe) => {
    const existingClothe = selectedClothes.find(
      (item) => item.id === clothe.id
    );
    const existingType = selectedClothes.find(
      (item) => item.type === clothe.type
    );
    if (existingClothe) {
      setSelectedClothes(
        selectedClothes.filter((item) => item.id !== clothe.id)
      );
      return;
    }
    if (existingType) {
      return;
    }
    setSelectedClothes([...selectedClothes, clothe]);
  };

  const handleNewOutfit = () => {
    CreateOutfitMutate(
      {
        clothes: selectedClothes.map((item) => item.id),
        colorScheme: colorScheme,
        notes: notes,
        type: type,
      },
      {
        onSuccess: () => {
          toast({
            title: "Outfit created successfully",
            status: "success",
          });
          onClose();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleColorScheme = (e: any) => {
    setColorScheme(e.target.value);
  };

  const handleNotes = (e: any) => {
    setNotes(e.target.value);
  };

  const handleType = (e: any) => {
    setType(e.target.value);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create an item from your closet"
        maxW="100%"
      >
        <ModalBody pb={6}>
          <HStack>
            <Grid gap={8}>
              <Accordion defaultIndex={[0]} allowMultiple w={"100%"} pb={6}>
                {CLOTHE_TYPES.map((item: OptionItem, index: number) => (
                  <AccordionItem key={index}>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {item.label}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <HStack spacing={"20px"}>
                        {clothes &&
                          clothes[item.value] &&
                          clothes[item.value].map(
                            (clothe: Clothe, index: number) => (
                              <div key={index}>
                                {clothe.images.map(
                                  (image: any, index: number) => (
                                    <Image
                                      key={index}
                                      boxSize="100%"
                                      objectFit="cover"
                                      src={image.file}
                                      alt=""
                                      onClick={() =>
                                        handleSelectedClothes(clothe)
                                      }
                                      border={
                                        selectedClothes.find(
                                          (item: any) => item.id === clothe.id
                                        )
                                          ? "2px solid red"
                                          : ""
                                      }
                                    />
                                  )
                                )}
                              </div>
                            )
                          )}
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
              <Select
                onChange={handleType}
                options={OUTFIT_TYPES}
                placeholder="Select Type"
              ></Select>

              <Input
                label="Color Scheme"
                placeholder="total black, colorfull..."
                onChange={handleColorScheme}
              />
              <Textarea placeholder="Add notes..." onChange={handleNotes} />
            </Grid>

            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {selectedClothes && (
                <VStack>
                  {selectedClothes.map((clothe: any, index: number) => (
                    <Image
                      key={index}
                      boxSize="100px"
                      objectFit="cover"
                      src={clothe.images[0].file}
                      alt=""
                    />
                  ))}
                </VStack>
              )}

              {/* <Canvas image={} /> */}
            </div>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            text="Save"
            isLoading={CreateOutfitIsLoading}
            loadingText="Saving"
            marginRight={3}
            onClick={handleNewOutfit}
          />

          <Button text="Close" secondary={true} onClick={onClose} />
        </ModalFooter>
      </Modal>
    </>
  );
};
export default CreateOutfit;
