import { FC, useState } from "react";
import { authStore } from "../../store/authStore";
import { useQuery } from "react-query";
import { getClothes } from "../../services/clothe";
import {
  Heading,
  SimpleGrid,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
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
    <VStack spacing={16} align="stretch">
      {CLOTHE_TYPES.map((item: OptionItem, index: number) => (
        <Box key={index}>
          {clothes && clothes[item.value] && clothes[item.value].length > 0 && (
            <>
              <Heading
                size="sm"
                textTransform="uppercase"
                letterSpacing="widest"
                mb={8}
                color="neutral.300"
                borderBottom="1px solid"
                borderColor="neutral.100"
                pb={4}
              >
                {item.label}
              </Heading>
              
              <SimpleGrid 
                columns={{ base: 2, md: 3, lg: 4, xl: 5 }} 
                spacing={8}
              >
                {clothes[item.value].map((clothe: Clothe, idx: number) => (
                  <ClotheCard key={idx} clothe={clothe} />
                ))}
              </SimpleGrid>
            </>
          )}
        </Box>
      ))}
      
      {!clothes && (
        <Text color="neutral.300" letterSpacing="widest" textAlign="center" py={20}>
          CURATING YOUR COLLECTION...
        </Text>
      )}
    </VStack>
  );
};

export default Clothes;
