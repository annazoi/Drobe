import { FC, useState } from "react";
import { authStore } from "../../store/authStore";
import { useQuery } from "react-query";
import { getClothes } from "../../services/clothe";
import {
  Card,
  ChakraProvider,
  Container,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import ChakraCarousel from "../ui/ChakraCarousel";
import { CategorizedClothes, Clothe } from "../../interfaces/clothe";
import ClotheCard from "../ui/ClotheCard";
import { CLOTHE_TYPES } from "../../constants/clotheTypes";
import { OptionItem } from "../../interfaces/components";
import { categorizeClothes } from "../../utils/categorizeClothes";

const Clothes: FC = () => {
  const { userId } = authStore((state) => state);
  const [clothes, setClothes] = useState<CategorizedClothes>();

  useQuery({
    queryKey: ["clothes", { userId: userId }],
    queryFn: () => getClothes({ userId: userId }),
    onSuccess: (data) => {
      categorizeClothes({ data, setClothes });
    },
  });

  return (
    <>
      <Heading
        size="l"
        textAlign="start"
        // mt={10}
        color={useColorModeValue("pink.200", "gray.200")}
      >
        My Closet
      </Heading>
      {CLOTHE_TYPES.map((item: OptionItem, index: number) => (
        <>
          {clothes && clothes[item.value] && clothes[item.value].length > 0 && (
            <Card key={index}>
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
                  //   py={8}
                  px={0}
                  maxW={{
                    base: "20rem",
                    md: "43.75rem",
                  }}
                  minW={{ base: "100%", md: "100%" }}
                >
                  <ChakraCarousel gap={32}>
                    {clothes[item.value].map(
                      (clothe: Clothe, index: number) => (
                        <ClotheCard key={index} clothe={clothe} />
                      )
                    )}
                  </ChakraCarousel>
                </Container>
              </ChakraProvider>
            </Card>
          )}
        </>
      ))}
    </>
  );
};

export default Clothes;
