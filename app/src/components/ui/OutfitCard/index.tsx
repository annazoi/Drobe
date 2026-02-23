import { FC } from "react";
import { Outfit as OutfitInterface } from "../../../interfaces/outfit";
import {
  Grid,
  Flex,
  Heading,
  Button,
  Text,
  Box,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { capsFirst } from "../../../utils";
import Outfit from "../../Outfit";

interface OutfitCardProps {
  outfit: OutfitInterface;
}
const OutfitCard: FC<OutfitCardProps> = ({ outfit }) => {
  const {
    isOpen: isOpenOutfit,
    onOpen: onOpenOutfit,
    onClose: onCloseOutfit,
  } = useDisclosure();

  return (
    <Box
      role="group"
      pos="relative"
      bg="white"
      border="1px solid"
      borderColor="neutral.100"
      transition="all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
      p={6}
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Flex justify="space-between" align="baseline" mb={4}>
          <Heading
            fontSize="xs"
            fontWeight="900"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="neutral.900"
          >
            {outfit.type || "CURATION"}
          </Heading>
          <Text fontSize="10px" fontWeight="700" color="neutral.300" letterSpacing="widest">
            #{outfit.id?.slice(-4).toUpperCase() || "LOOK"}
          </Text>
        </Flex>

        <Grid
          gridTemplateColumns="repeat(3, 1fr)"
          gap={3}
          mb={6}
        >
          {outfit.clothes.slice(0, 3).map((clothe: any, index: number) => (
            <Box 
              key={index} 
              bg="neutral.50" 
              p={2} 
              aspectRatio={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={clothe.clothe.images[0].file}
                alt=""
                maxH="100%"
                objectFit="contain"
                filter="grayscale(1)"
                transition="filter 0.3s"
                _groupHover={{ filter: "none" }}
              />
            </Box>
          ))}
        </Grid>
      </Box>

      <Box>
        {outfit.notes && (
          <Text
            fontSize="xs"
            color="neutral.400"
            fontStyle="italic"
            mb={4}
            noOfLines={2}
            lineHeight="tall"
          >
            "{capsFirst(outfit.notes)}"
          </Text>
        )}

        <Flex align="center" justify="space-between">
          <Text fontSize="10px" fontWeight="800" textTransform="uppercase" letterSpacing="widest" color="neutral.500">
            BY {outfit.userId.username}
          </Text>
          
          <Button
            size="xs"
            variant="solid"
            bg="neutral.900"
            color="white"
            borderRadius="0"
            px={4}
            h="28px"
            fontSize="10px"
            fontWeight="900"
            letterSpacing="widest"
            opacity={0}
            transform="translateY(10px)"
            transition="all 0.3s"
            _groupHover={{ opacity: 1, transform: "translateY(0)" }}
            _hover={{ bg: "brand.500" }}
            onClick={onOpenOutfit}
          >
            MORE
          </Button>
        </Flex>
      </Box>

      <Outfit isOpen={isOpenOutfit} onClose={onCloseOutfit} outfit={outfit} />
    </Box>
  );
};
export default OutfitCard;
