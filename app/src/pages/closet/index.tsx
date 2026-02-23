import {
  Box,
  ButtonGroup,
  Container,
  Heading,
  Text,
  useDisclosure,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import CreateItem from "./CreateItem";
import OutfitCard from "../../components/ui/OutfitCard";
import { authStore } from "../../store/authStore";
import { getOutfits } from "../../services/outfit";
import { useQuery } from "react-query";
import Clothes from "../../components/Clothes";
import Button from "../../components/ui/Button";

const Archive: FC = () => {
  const { userId } = authStore((state) => state);
  const [outfits, setOutfits] = useState<any[]>([]);
  const { isOpen: isOpenitem, onOpen: onOpenItem, onClose: onCloseItem } = useDisclosure();

  useQuery({
    queryKey: ["outfits", { userId: userId }],
    queryFn: () => getOutfits({ userId: userId }),
    onSuccess: (data) => {
      setOutfits(data || []);
    },
  });

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={18} align="stretch">
        {/* Editorial Header */}
        <HStack justify="space-between" align="center" wrap="wrap" gap={8}>
          <VStack align="flex-start" spacing={0}>
            <Heading size="2xl" fontWeight="900" letterSpacing="tight">
              ARCHIVE
            </Heading>
            <Text color="neutral.400" fontSize="md" letterSpacing="widest" textTransform="uppercase">
              The Digital Curation
            </Text>
          </VStack>
          
          <ButtonGroup spacing={4}>
            <Button
              text="Import Clothe"
              variant="outline"
              onClick={onOpenItem}
              rightIcon={<IoAddOutline />}
              px={8}
            />
          </ButtonGroup>
        </HStack>

        {/* Featured Outfits Section - Flat Grid */}
        {outfits.length > 0 && (
          <Box>
            <Heading
              size="xs"
              textTransform="uppercase"
              letterSpacing="0.3em"
              mb={10}
              color="neutral.300"
              textAlign="center"
            >
              Recent Series
            </Heading>
            <Box overflowX="auto" pb={8}>
                <HStack spacing={8} align="flex-start">
                    {outfits.slice(0, 4).map((outfit, index) => (
                        <Box key={index} minW="350px">
                            <OutfitCard outfit={outfit} />
                        </Box>
                    ))}
                </HStack>
            </Box>
            <Divider mt={12} borderColor="neutral.100" />
          </Box>
        )}

        {/* Modular Clothes Grid */}
        <Box>
          <HStack justify="space-between" mb={12} align="center">
            <Heading
                size="sm"
                fontWeight="800"
                letterSpacing="widest"
                textTransform="uppercase"
            >
              Inventory
            </Heading>
            <HStack spacing={8}>
              {["All", "Tops", "Bottoms", "Shoes", "Accessories"].map((cat) => (
                <Text 
                    key={cat}
                    fontSize="xs" 
                    fontWeight="700"
                    letterSpacing="widest"
                    textTransform="uppercase"
                    color={cat === "All" ? "neutral.900" : "neutral.300"} 
                    cursor="pointer" 
                    _hover={{ color: "brand.500" }}
                    transition="all 0.3s ease"
                >
                    {cat}
                </Text>
              ))}
            </HStack>
          </HStack>
          
          <Clothes />
        </Box>

        {/* Modals */}
        <CreateItem isOpen={isOpenitem} onClose={onCloseItem} />
      </VStack>
    </Container>
  );
};

export default Archive;
