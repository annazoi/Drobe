import {
  Box,
  Heading,
  VStack,
  Image,
  Text,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { getOutfits } from "../../services/outfit";
import { useQuery } from "react-query";
import { IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";
import Outfit from "../../components/Outfit";

const Home: FC = () => {
  const [outfits, setOutfits] = useState<any[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useQuery({
    queryKey: ["outfits"],
    queryFn: () => getOutfits(),
    onSuccess: (data) => {
      setOutfits(data || []);
    },
  });

  const handleOpenOutfit = (outfit: any) => {
    setSelectedOutfit(outfit);
    onOpen();
  };

  return (
    <Box bg="neutral.50" minH="100vh" pt={{ base: "64px", md: 0 }}>
      {/* Editorial Hero */}
      <Box pos="relative" h="50vh" overflow="hidden" mb={8}>
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
          alt="Fashion Hero"
          w="100%"
          h="100%"
          objectFit="cover"
        />
        <Flex
          pos="absolute"
          inset={0}
          bg="rgba(0,0,0,0.3)"
          backdropFilter="blur(2px)"
          align="center"
          justify="center"
          direction="column"
          color="white"
          p={8}
        >
          <Heading size="3xl" fontWeight="900" letterSpacing="0.2em" textTransform="uppercase" mb={4}>
            DROBE
          </Heading>
          <Text fontSize="xl" letterSpacing="widest" fontWeight="300" textTransform="uppercase">
            The Digital Revolution of Style
          </Text>
        </Flex>
      </Box>

      {/* Magazine Feed */}
      <Box px={12} pb={20}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={12} alignItems="start">
          {outfits.length > 0 ? (
            outfits.map((outfit, index) => (
              <VStack 
                key={index} 
                spacing={4} 
                align="stretch" 
                pos="relative"
                role="group"
              >
                {/* Refined Minimal Header */}
                <HStack justify="space-between" px={1}>
                  <Text fontSize="10px" fontWeight="900" letterSpacing="widest" color="neutral.900">
                    @{outfit.userId.username.toUpperCase()}
                  </Text>
                  <Text fontSize="10px" color="neutral.300" fontWeight="700" letterSpacing="widest">
                    #{outfit.id?.slice(-4).toUpperCase() || "00"}
                  </Text>
                </HStack>

                {/* Moodboard Grid Visual */}
                <Box 
                  boxShadow="sm" 
                  overflow="hidden" 
                  transition="all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)"
                  _hover={{ transform: "translateY(-4px)", boxShadow: "2xl", borderColor: "brand.200" }}
                  bg="white"
                  p={3}
                  border="1px solid"
                  borderColor="neutral.100"
                  cursor="pointer"
                  onClick={() => handleOpenOutfit(outfit)}
                  pos="relative"
                >
                  <SimpleGrid columns={3} spacing={2}>
                    {outfit.clothes.map((clothe: any, cIdx: number) => (
                      <Box 
                        key={cIdx} 
                        bg="neutral.50" 
                        aspectRatio={1}
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          src={clothe.clothe.images[0].file}
                          alt=""
                          maxH="100%"
                          objectFit="contain"
                          transition="all 0.5s"
                          _groupHover={{ transform: "scale(1.1)" }}
                        />
                      </Box>
                    ))}
                    {/* Placeholder boxes to maintain 3x2 grid if items are few */}
                    {[...Array(Math.max(0, 6 - outfit.clothes.length))].map((_, i) => (
                      <Box key={`empty-${i}`} bg="neutral.50" aspectRatio={1} opacity={0.3} />
                    ))}
                  </SimpleGrid>

                  {/* Enhanced Hover Overlay */}
                  <Box
                    pos="absolute"
                    inset={0}
                    bg="rgba(0,0,0,0.05)"
                    backdropFilter="blur(0px)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity={0}
                    transition="all 0.3s"
                    _groupHover={{ opacity: 1, backdropFilter: "blur(2px)" }}
                  >
                    <Box
                      bg="neutral.900"
                      color="white"
                      px={6}
                      py={2}
                      fontSize="9px"
                      fontWeight="900"
                      letterSpacing="0.3em"
                      transform="translateY(20px)"
                      transition="all 0.4s"
                      _groupHover={{ transform: "translateY(0)" }}
                    >
                      VIEW SERIES
                    </Box>
                  </Box>
                </Box>

                {/* Interaction & Details */}
                <VStack align="stretch" spacing={2} px={1}>
                  <HStack justify="space-between">
                    <HStack spacing={3}>
                      <IconButton
                        variant="ghost"
                        size="xs"
                        icon={<Icon as={IoHeartOutline} boxSize={4} />}
                        aria-label="Like"
                        _hover={{ color: "brand.500", bg: "transparent" }}
                      />
                      <IconButton
                        variant="ghost"
                        size="xs"
                        icon={<Icon as={IoChatbubbleOutline} boxSize={4} />}
                        aria-label="Comment"
                        _hover={{ color: "brand.500", bg: "transparent" }}
                      />
                    </HStack>
                    <Text fontSize="9px" fontWeight="900" letterSpacing="0.1em" color="brand.500" textTransform="uppercase">
                        {outfit.type || "EDITORIAL"}
                    </Text>
                  </HStack>
                  
                  {outfit.notes && (
                    <Text fontSize="10px" fontWeight="400" color="neutral.500" noOfLines={1} lineHeight="1.6">
                      {outfit.notes}
                    </Text>
                  )}
                </VStack>
              </VStack>
            ))
          ) : (
            <VStack py={20} gridColumn="span 3">
                <Text color="neutral.300" letterSpacing="widest" fontSize="xs">EXPLORE THE FUTURE OF FASHION</Text>
            </VStack>
          )}
        </SimpleGrid>
      </Box>

      {/* Detailed Modal */}
      <Outfit 
        isOpen={isOpen} 
        onClose={onClose} 
        outfit={selectedOutfit} 
      />
    </Box>
  );
};

export default Home;
