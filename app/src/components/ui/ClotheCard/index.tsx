import { FC } from "react";
import { 
  Box, 
  Image, 
  Text, 
  VStack, 
  Fade, 
  useDisclosure, 
  Flex,
  Icon,
  AspectRatio
} from "@chakra-ui/react";
import { capsFirst } from "../../../utils";
import { IoInformationOutline } from "react-icons/io5";

interface ClotheCardProps {
  clothe: any;
  onClick?: () => void;
}

const ClotheCard: FC<ClotheCardProps> = ({ clothe, onClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      pos="relative"
      role="group"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      overflow="hidden"
      cursor="pointer"
      bg="neutral.100"
      transition="all 0.4s ease"
      onClick={onClick}
    >
      <AspectRatio ratio={3 / 4}>
        <Image
          src={clothe.images[0]?.file || "https://via.placeholder.com/600x800"}
          alt={clothe.notes}
          objectFit="cover"
          transition="transform 0.6s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />
      </AspectRatio>

      {/* Hover Overlay */}
      <Fade in={isOpen}>
        <Flex
          pos="absolute"
          inset={0}
          bg="rgba(0,0,0,0.4)"
          backdropFilter="blur(4px)"
          p={6}
          direction="column"
          justify="flex-end"
          color="white"
        >
          <VStack align="flex-start" spacing={1}>
            <Text 
              fontSize="xs" 
              fontWeight="700" 
              letterSpacing="widest" 
              textTransform="uppercase"
              color="brand.100"
            >
              {clothe.type || "Essential"}
            </Text>
            <Text fontSize="sm" noOfLines={2} fontWeight="300" fontStyle="italic">
              {clothe.notes ? `"${capsFirst(clothe.notes)}"` : "No styling notes."}
            </Text>
          </VStack>
          
          <Flex mt={4} align="center" gap={2}>
            <Icon as={IoInformationOutline} boxSize={4} />
            <Text fontSize="xs" fontWeight="600" letterSpacing="widest" textTransform="uppercase">
              View Details
            </Text>
          </Flex>
        </Flex>
      </Fade>
    </Box>
  );
};

export default ClotheCard;
