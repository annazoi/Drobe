import {
  Box,
  ChakraProvider,
  Container,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { getOutfits } from "../../services/outfit";
import { useQuery } from "react-query";
import ChakraCarousel from "../../components/ui/ChakraCarousel";
import OutfitCard from "../../components/ui/OutfitCard";
import { CategorizedOutfits } from "../../interfaces/outfit";
import { OUTFIT_TYPES, OUTFIT_TYPES_ARRAY } from "../../constants/outfittypes";
import { OptionItem } from "../../interfaces/components";

const Home: FC = () => {
  // const [outfits, setOutfits] = useState<any[]>([]);
  const [categorizedOutfits, setCategorizedOutfits] =
    useState<CategorizedOutfits>();

  useQuery({
    queryKey: ["outfits"],
    queryFn: () => getOutfits(),
    onSuccess: (data) => {
      // setOutfits(data);
      categorizeOutfits(data);
    },
  });

  const categorizeOutfits = (data: any) => {
    let tempOutfits: { [key: string]: any[] } = {};

    for (let i = 0; i < OUTFIT_TYPES_ARRAY.length; i++) {
      tempOutfits[OUTFIT_TYPES_ARRAY[i]] = [];
      for (let j = 0; j < data?.length; j++) {
        if (OUTFIT_TYPES_ARRAY[i] === data[j]?.type) {
          tempOutfits[OUTFIT_TYPES_ARRAY[i]].push(data[j]);
        }
      }
    }
    setCategorizedOutfits(tempOutfits);
  };

  return (
    <Box display={"grid"} placeItems={"center"} gap={5}>
      <img
        src="https://www.andagain.co.nz/cdn/shop/files/minimalist-retail-clothing-display.jpg?v=1663240556&width=1500"
        alt=""
      />

      <Heading
        fontSize={"18px"}
        textAlign="center"
        color={useColorModeValue("pink.200", "gray.200")}
      >
        Join the Fashion Revolution
      </Heading>
      <Heading
        size="xl"
        textAlign="center"
        color={useColorModeValue("pink.200", "gray.200")}
      >
        Outfits
      </Heading>
      {OUTFIT_TYPES.map((item: OptionItem, index: number) => (
        <>
          {categorizedOutfits &&
            categorizedOutfits[item.value] &&
            categorizedOutfits[item.value].length > 0 && (
              <div key={index} style={{ width: "100%" }}>
                <Heading
                  size="xl"
                  textAlign="start"
                  // mt={10}
                  color={useColorModeValue("pink.200", "gray.200")}
                >
                  {item.label}
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
                    minW={{ base: "100%", md: "100%" }}
                  >
                    <ChakraCarousel gap={32}>
                      {categorizedOutfits[item.value].map((outfit, index) => (
                        <OutfitCard key={index} outfit={outfit} />
                      ))}
                    </ChakraCarousel>
                  </Container>
                </ChakraProvider>
              </div>
            )}
        </>
      ))}
    </Box>
  );
};
export default Home;
