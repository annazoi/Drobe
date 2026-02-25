import {
  Box,
  ButtonGroup,
  Heading,
  Text,
  useDisclosure,
  VStack,
  HStack,
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isOpen: isOpenitem, onOpen: onOpenItem, onClose: onCloseItem } = useDisclosure();

  useQuery({
    queryKey: ["outfits", { userId: userId }],
    queryFn: () => getOutfits({ userId: userId }),
    onSuccess: (data) => {
      setOutfits(data || []);
    },
  });

  return (
    <Box w="100%" py={6} px={12} pt={{ base: "80px", md: 6 }}>
      <VStack spacing={12} align="stretch">
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

        {/* Featured Outfits Section - Polish Slider */}
        {outfits.length > 0 && (
          <Box>
            <Heading
              size="xs"
              textTransform="uppercase"
              letterSpacing="0.4em"
              mb={8}
              color="neutral.300"
              fontWeight="900"
            >
              RECENT SERIES
            </Heading>
            <Box 
              overflowX="auto" 
              pb={4}
              sx={{
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none'
              }}
            >
                <HStack spacing={6} align="flex-start">
                    {outfits.slice(0, 6).map((outfit, index) => (
                        <Box key={index} minW="380px" transition="all 0.3s" _hover={{ transform: "translateY(-4px)" }}>
                            <OutfitCard outfit={outfit} />
                        </Box>
                    ))}
                    <Box minW="100px" /> 
                </HStack>
            </Box>
          </Box>
        )}

        {/* Modular Clothes Grid */}
        <Box>
          <HStack justify="space-between" mb={8} align="center">
            <Heading
                size="sm"
                fontWeight="900"
                letterSpacing="widest"
                textTransform="uppercase"
              >
              INVENTORY
            </Heading>
            <HStack spacing={8}>
              {["All", "Tops", "Bottoms", "Shoes", "Accessories"].map((cat) => (
                <Text 
                    key={cat}
                    fontSize="10px" 
                    fontWeight="800"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    color={cat === selectedCategory ? "brand.500" : "neutral.300"} 
                    cursor="pointer" 
                    onClick={() => setSelectedCategory(cat)}
                    _hover={{ color: "brand.300" }}
                    transition="all 0.3s ease"
                >
                    {cat}
                </Text>
              ))}
            </HStack>
          </HStack>
          
          <Clothes category={selectedCategory} />
        </Box>

        {/* Modals */}
        <CreateItem isOpen={isOpenitem} onClose={onCloseItem} />
      </VStack>
    </Box>
  );
};

export default Archive;
