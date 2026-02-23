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
} from "@chakra-ui/react";
import { Outfit as OutfitInterface } from "../../interfaces/outfit";
import { capsFirst } from "../../utils";
import Button from "../ui/Button";

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
      size="6xl"
      maxW="95%"
    >
      <ModalBody p={0}>
        <Box bg="white" minH="50vh">
          {/* Main Visual Section */}
          <Box pos="relative" bg="neutral.50" py={{ base: 8, md: 16 }} px={{ base: 6, md: 12 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 16 }} alignItems="center">
              {/* Featured Large Image (First Item) */}
              <Box boxShadow="2xl" overflow="hidden" bg="white">
                <Image
                  src={outfit.clothes[0]?.clothe?.images[0]?.file}
                  w="100%"
                  h="auto"
                  maxH="70vh"
                  objectFit="contain"
                />
              </Box>

              {/* Composition Breakdown */}
              <VStack align="flex-start" spacing={10}>
                <VStack align="flex-start" spacing={4}>
                    <Text 
                        fontSize="xs" 
                        fontWeight="900" 
                        letterSpacing="0.4em" 
                        textTransform="uppercase" 
                        color="brand.500"
                    >
                        {outfit.type || "VOL. 01"} 
                    </Text>
                    <Heading size="3xl" fontWeight="300" letterSpacing="tight" lineHeight="1.1">
                        Concept Look {outfit.id?.slice(-4).toUpperCase() || "ALPHA"}
                    </Heading>
                </VStack>

                <HStack spacing={12} color="neutral.500" wrap="wrap" rowGap={4}>
                    <VStack align="flex-start" spacing={0}>
                        <Text fontSize="10px" fontWeight="800" letterSpacing="widest" color="neutral.300">CURATOR</Text>
                        <Text fontSize="md" fontWeight="600" color="neutral.900">@{outfit.userId.username}</Text>
                    </VStack>
                    <VStack align="flex-start" spacing={0}>
                        <Text fontSize="10px" fontWeight="800" letterSpacing="widest" color="neutral.300">RATING</Text>
                        <Text fontSize="md" fontWeight="600" color="neutral.900">{outfit.rating}/5.0</Text>
                    </VStack>
                    <VStack align="flex-start" spacing={0}>
                        <Text fontSize="10px" fontWeight="800" letterSpacing="widest" color="neutral.300">SERIES</Text>
                        <Text fontSize="md" fontWeight="600" color="neutral.900">2026 Archive</Text>
                    </VStack>
                </HStack>

                <Divider borderColor="neutral.200" />

                <Box w="100%">
                    <Text fontSize="10px" fontWeight="900" color="neutral.300" mb={4} textTransform="uppercase" letterSpacing="widest">
                        STYLING MANIFESTO
                    </Text>
                    <Text fontSize="xl" fontWeight="300" fontStyle="italic" color="neutral.600" lineHeight="1.8">
                        {outfit.notes ? `"${capsFirst(outfit.notes)}"` : "A minimal composition focusing on silhouette and balance."}
                    </Text>
                </Box>
              </VStack>
            </SimpleGrid>
          </Box>

          {/* Itemized Grid (Detailed Archive View) */}
          <Box py={20} px={{ base: 6, md: 16 }}>
            <VStack align="stretch" spacing={12}>
                <HStack justify="space-between" align="baseline">
                    <Heading size="sm" fontWeight="900" letterSpacing="0.4em" textTransform="uppercase">
                        DECONSTRUCTED ELEMENTS
                    </Heading>
                    <Text fontSize="xs" fontWeight="700" color="neutral.300">
                        {outfit.clothes.length} PIECES TOTAL
                    </Text>
                </HStack>
                
                <SimpleGrid columns={{ base: 2, md: 4, xl: 6 }} spacing={10}>
                    {outfit.clothes.map((clothe: any, index: number) => (
                        <VStack key={index} align="flex-start" spacing={5}>
                             <Box 
                                bg="neutral.50" 
                                p={6} 
                                w="100%" 
                                aspectRatio={1}
                                transition="all 0.4s ease" 
                                _hover={{ bg: "neutral.100", transform: "translateY(-4px)" }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                border="1px solid"
                                borderColor="neutral.100"
                             >
                                <Image
                                    src={clothe.clothe.images[0].file}
                                    alt=""
                                    maxW="110%"
                                    maxH="110%"
                                    objectFit="contain"
                                />
                             </Box>
                             <VStack align="flex-start" spacing={1}>
                                <Text fontSize="9px" fontWeight="900" textTransform="uppercase" color="brand.500" letterSpacing="widest">
                                    {clothe.clothe.type}
                                </Text>
                                <Text fontSize="xs" fontWeight="700" letterSpacing="tight">REF: {clothe.clothe.id?.slice(-8).toUpperCase()}</Text>
                             </VStack>
                        </VStack>
                    ))}
                </SimpleGrid>
            </VStack>
          </Box>

          <Box p={10} bg="white" borderTop="1px solid" borderColor="neutral.100" display="flex" justifyContent="flex-end">
            <Button text="CLOSE ARCHIVE" onClick={onClose} variant="solid" bg="neutral.900" color="white" px={12} letterSpacing="0.2em" h="50px" />
          </Box>
        </Box>
      </ModalBody>
    </Modal>
  );
};

export default Outfit;
