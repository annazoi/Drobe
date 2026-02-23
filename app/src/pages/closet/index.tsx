import {
  Box,
  ButtonGroup,
  ChakraProvider,
  Container,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { IoShirt } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import CreateItem from "./CreateItem";
import OutfitCard from "../../components/ui/OutfitCard";

import CreateOutfit from "./CreateOutfit";
import { authStore } from "../../store/authStore";
import { getOutfits } from "../../services/outfit";
import { useQuery } from "react-query";
import ChakraCarousel from "../../components/ui/ChakraCarousel";
import Clothes from "../../components/Clothes";
import Button from "../../components/ui/Button";

const Closet: FC = () => {
  const {
    isOpen: isOpenitem,
    onOpen: onOpenItem,
    onClose: onCloseItem,
  } = useDisclosure();
  const {
    isOpen: isOpenOutfit,
    onOpen: onOpenOutfit,
    onClose: onCloseOutfit,
  } = useDisclosure();

  const { userId } = authStore((state) => state);
  // const [outfitsImages, setOutfitsImages] = useState<string[][]>([]);
  const [outfits, setOutfits] = useState<any[]>([]);

  const {} = useQuery({
    queryKey: ["outfits", { userId: userId }],
    queryFn: () => getOutfits({ userId: userId }),
    onSuccess: (data) => {
      // const imagesOutfit = data?.map((outfit: any) => {
      //   return outfit.clothes.map((clothe: any) => {
      //     return clothe.clothe.images[0].file;
      //   });
      // });
      // setOutfitsImages(imagesOutfit);

      const dataClothes = data?.map((clothe: any) => {
        return clothe;
      });
      setOutfits(dataClothes);
    },
  });

  // const { mutate: deleteOutfitMutate } = useMutation((id: string) =>
  //   deleteOutfit(id)
  // );

  // const handleDeleteOutfit = (outfitId: string) => {
  //   deleteOutfitMutate(outfitId);
  // };

  return (
    <>
      <Box display="grid" gap={4}>
        <img
          src="https://www.thecreativecurator.com/wp-content/uploads/2021/07/types-of-clothes-guide-to-clothing-types.jpg.webp"
          alt=""
        />
        <ButtonGroup>
          <Button
            text="Add Item"
            width="100%"
            onClick={onOpenItem}
            rightIcon={<IoShirt />}
          />
          <Button
            text="Create Outfit"
            onClick={onOpenOutfit}
            rightIcon={<GiClothes />}
            width="100%"
          />
        </ButtonGroup>

        <CreateItem isOpen={isOpenitem} onClose={onCloseItem} />
        <CreateOutfit isOpen={isOpenOutfit} onClose={onCloseOutfit} />
        {/* {outfits.map((outfit, index) => (
          <Carousel key={index} images={outfit}></Carousel>
        ))} */}
        {outfits.length > 0 && (
          <>
            <Heading
              fontSize={34}
              color={useColorModeValue("pink.200", "gray.200")}
              textAlign={"left"}
              letterSpacing={4}
              mt={4}
            >
              Outfits
            </Heading>
            <ChakraProvider>
              <Container
                // py={8}
                px={0}
                maxW={{
                  base: "20rem",
                  // sm: "35rem",
                  md: "43.75rem",
                  // lg: "57.5rem",
                  // xl: "75rem",
                  // xxl: "87.5rem",
                }}
                minW={{ base: "100%" }}
              >
                <ChakraCarousel gap={32}>
                  {outfits.map((outfit, index) => (
                    <OutfitCard key={index} outfit={outfit} />
                  ))}
                </ChakraCarousel>
              </Container>
            </ChakraProvider>
          </>
        )}
        {outfits.length === 0 && (
          <Text
            fontSize={24}
            color={useColorModeValue("pink.200", "gray.200")}
            textAlign={"center"}
            letterSpacing={4}
            mt={4}
          >
            No Outfits yet
          </Text>
        )}
        <Clothes />
      </Box>
    </>
  );
};
export default Closet;
