import {
  Box,
  Container,
  Heading,
  VStack,
  Image,
  Text,
  HStack,
  Icon,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { getOutfits } from "../../services/outfit";
import { useQuery } from "react-query";
import { IoHeartOutline, IoChatbubbleOutline, IoBookmarkOutline } from "react-icons/io5";

const Home: FC = () => {
  const [outfits, setOutfits] = useState<any[]>([]);

  useQuery({
    queryKey: ["outfits"],
    queryFn: () => getOutfits(),
    onSuccess: (data) => {
      setOutfits(data || []);
    },
  });

  return (
    <Box bg="neutral.50" minH="100vh">
      {/* Editorial Hero */}
      <Box pos="relative" h="70vh" overflow="hidden" mb={16}>
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
      <Container maxW="container.md" py={12}>
        <VStack spacing={24} align="stretch">
          {outfits.length > 0 ? (
            outfits.map((outfit, index) => (
              <VStack key={index} spacing={6} align="stretch" pos="relative">
                {/* Minimal Header */}
                <HStack justify="space-between" px={2}>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="xs" fontWeight="700" letterSpacing="widest" textTransform="uppercase">
                      {outfit.type || "Daily Look"}
                    </Text>
                    <Text fontSize="sm" color="neutral.400">
                      Curated by @User
                    </Text>
                  </VStack>
                  <Text fontSize="xs" color="neutral.300">
                    FEATURED
                  </Text>
                </HStack>

                {/* Main Visual - 90% */}
                <Box 
                  boxShadow="2xl" 
                  overflow="hidden" 
                  transition="transform 0.5s ease"
                  _hover={{ transform: "scale(1.02)" }}
                >
                  <Image
                    src={outfit.clothes[0]?.clothe?.images[0]?.file || "https://via.placeholder.com/800x1200"}
                    alt="Outfit Image"
                    w="100%"
                    h="auto"
                    minH="600px"
                    objectFit="cover"
                  />
                </Box>

                {/* Interaction - 10% */}
                <HStack justify="space-between" px={4} py={2}>
                  <HStack spacing={6}>
                    <IconButton
                      variant="ghost"
                      icon={<Icon as={IoHeartOutline} boxSize={6} />}
                      aria-label="Like"
                    />
                    <IconButton
                      variant="ghost"
                      icon={<Icon as={IoChatbubbleOutline} boxSize={6} />}
                      aria-label="Comment"
                    />
                  </HStack>
                  <IconButton
                    variant="ghost"
                    icon={<Icon as={IoBookmarkOutline} boxSize={6} />}
                    aria-label="Save"
                  />
                </HStack>
                
                <Box px={4}>
                    <Text fontSize="md" fontStyle="italic" color="neutral.600">
                        "{outfit.notes || "No styling notes provided."}"
                    </Text>
                </Box>
              </VStack>
            ))
          ) : (
            <VStack py={20}>
                <Text color="neutral.300" letterSpacing="widest">EXPLORE THE FUTURE OF FASHION</Text>
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
