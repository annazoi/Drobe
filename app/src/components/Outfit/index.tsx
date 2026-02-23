import { FC } from "react";
import Modal from "../ui/Modal";
import { 
  Box, 
  SimpleGrid, 
  Image, 
  ModalBody, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Divider,
  Icon
} from "@chakra-ui/react";
import { Outfit as OutfitInterface } from "../../interfaces/outfit";
import { capsFirst } from "../../utils";
import Button from "../ui/Button";
import { IoStarOutline, IoPersonOutline, IoTimeOutline } from "react-icons/io5";

interface OutfitProps {
  isOpen?: boolean;
  onClose?: () => void;
  outfit?: OutfitInterface;
}

const Outfit: FC<OutfitProps> = ({ isOpen = false, onClose = () => {}, outfit }) => {
  if (!outfit) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editorial View"
    >
      <ModalBody p={0} overflow="hidden">
        <Box bg="white" minH="80vh">
          {/* Main Visual Section */}
          <Box pos="relative" bg="neutral.50" py={12} px={8}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
              {/* Featured Large Image (First Item) */}
              <Box boxShadow="2xl" overflow="hidden">
                <Image
                  src={outfit.clothes[0]?.clothe?.images[0]?.file}
                  w="100%"
                  h="auto"
                  objectFit="cover"
                />
              </Box>

              {/* Composition Breakdown */}
              <VStack align="flex-start" spacing={8}>
                <VStack align="flex-start" spacing={2}>
                    <Text 
                        fontSize="xs" 
                        fontWeight="800" 
                        letterSpacing="0.3em" 
                        textTransform="uppercase" 
                        color="brand.500"
                    >
                        {outfit.type || "Seasonal Concept"}
                    </Text>
                    <Heading size="2xl" fontWeight="300" letterSpacing="tight">
                        Concept {outfit.id?.slice(-4).toUpperCase() || "LOOK"}
                    </Heading>
                </VStack>

                <HStack spacing={10} color="neutral.400">
                    <HStack spacing={2}>
                        <Icon as={IoPersonOutline} />
                        <Text fontSize="sm" fontWeight="600">@{outfit.userId.username}</Text>
                    </HStack>
                    <HStack spacing={2}>
                        <Icon as={IoStarOutline} />
                        <Text fontSize="sm" fontWeight="600">{outfit.rating}/5.0</Text>
                    </HStack>
                    <HStack spacing={2}>
                        <Icon as={IoTimeOutline} />
                        <Text fontSize="sm" fontWeight="600">2026 Archive</Text>
                    </HStack>
                </HStack>

                <Divider borderColor="neutral.200" />

                <Box>
                    <Text fontSize="xs" fontWeight="700" color="neutral.300" mb={4} textTransform="uppercase" letterSpacing="widest">
                        Styling Notes
                    </Text>
                    <Text fontSize="lg" fontWeight="300" fontStyle="italic" color="neutral.600" lineHeight="tall">
                        {outfit.notes ? `"${capsFirst(outfit.notes)}"` : "A minimal composition focusing on silhouette and balance."}
                    </Text>
                </Box>
              </VStack>
            </SimpleGrid>
          </Box>

          {/* Itemized Grid (Detailed Archive View) */}
          <Box p={12}>
            <Text fontSize="xs" fontWeight="800" letterSpacing="0.4em" mb={8} textTransform="uppercase">
                Deconstructed Elements
            </Text>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
                {outfit.clothes.map((clothe: any, index: number) => (
                    <VStack key={index} align="flex-start" spacing={4}>
                         <Box bg="neutral.50" p={4} w="100%" transition="all 0.3s ease" _hover={{ bg: "neutral.100" }}>
                            <Image
                                src={clothe.clothe.images[0].file}
                                alt=""
                                w="100%"
                                h="150px"
                                objectFit="contain"
                            />
                         </Box>
                         <VStack align="flex-start" spacing={0}>
                            <Text fontSize="xx-small" fontWeight="800" textTransform="uppercase" color="neutral.300">
                                {clothe.clothe.type}
                            </Text>
                            <Text fontSize="xs" fontWeight="500">Ref: {clothe.clothe.id?.slice(-6).toUpperCase()}</Text>
                         </VStack>
                    </VStack>
                ))}
            </SimpleGrid>
          </Box>

          <Box p={8} bg="neutral.900" display="flex" justifyContent="flex-end">
            <Button text="Close Archive" onClick={onClose} variant="outline" bg="transparent" color="white" borderColor="white" />
          </Box>
        </Box>
      </ModalBody>
    </Modal>
  );
};

export default Outfit;
