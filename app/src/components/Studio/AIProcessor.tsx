import {
  Box,
  Image,
  Progress,
  VStack,
  Text,
  HStack,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiSelectionAllThin, PiShapesThin } from "react-icons/pi";
import removeBackground, { Config } from "@imgly/background-removal";

interface AIProcessorProps {
  originalImage: string;
  onProcessed: (processedImageBlob: Blob) => void;
}

const MotionBox = motion(Box);

const AIProcessor: FC<AIProcessorProps> = ({ originalImage, onProcessed }) => {
  const [stage, setStage] = useState<"processing" | "refined">("processing");
  const [progress, setProgress] = useState(0);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"original" | "processed">("processed");
  const toast = useToast();

  useEffect(() => {
    let active = true;

    const processImage = async () => {
      try {
        const config: Config = {
          progress: (key: any, current: any, total: any) => {
            if (active) {
              const perc = Math.round((current / total) * 100);
              setProgress(perc);
            }
          },
          publicPath: "/node_modules/@imgly/background-removal/dist/"
        };

        const blob = await removeBackground(originalImage, config);
        
        if (active) {
          const url = URL.createObjectURL(blob);
          setProcessedUrl(url);
          setStage("refined");
          onProcessed(blob);
        }
      } catch (error) {
        if (active) {
          toast({
            title: "Background removal failed",
            description: "Please try another image or check your connection.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.error("BG Removal Error:", error);
        }
      }
    };

    processImage();

    return () => {
      active = false;
      if (processedUrl) URL.revokeObjectURL(processedUrl);
    };
  }, [originalImage]);

  return (
    <VStack spacing={8} w="100%" align="stretch">
      <Box
        position="relative"
        w="100%"
        pt="100%" // 1:1 Aspect Ratio
        borderRadius="lg"
        bg="neutral.50"
        overflow="hidden"
        border="1px solid"
        borderColor="neutral.100"
      >
        <Box position="absolute" inset={0} p={8} display="flex" alignItems="center" justifyContent="center">
          <AnimatePresence mode="wait">
            {viewMode === "original" ? (
              <MotionBox
                key="original"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                w="100%"
                h="100%"
              >
                <Image
                  src={originalImage}
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  filter="grayscale(0.5)"
                />
              </MotionBox>
            ) : (
              <MotionBox
                key="processed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                w="100%"
                h="100%"
                position="relative"
              >
                <Image 
                  src={stage === "refined" && processedUrl ? processedUrl : originalImage} 
                  w="100%" 
                  h="100%" 
                  objectFit="contain" 
                  opacity={stage === "refined" ? 1 : 0.3}
                />
                
                {stage === "processing" && (
                  <MotionBox
                    position="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="2px"
                    bg="brand.500"
                    boxShadow="0 0 15px var(--chakra-colors-brand-500)"
                    animate={{
                      top: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        {stage === "processing" && (
          <Box position="absolute" bottom={0} left={0} w="100%">
            <Progress
              value={progress}
              size="xs"
              colorScheme="brand"
              bg="transparent"
              borderRadius="0"
            />
          </Box>
        )}
      </Box>

      <HStack justify="space-between" align="center">
        <VStack align="flex-start" spacing={1}>
          <Text
            fontSize="xs"
            fontWeight="900"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="neutral.800"
          >
            {stage === "processing"
              ? "AI Deconstruction..."
              : "Curation Ready"}
          </Text>
          <Text fontSize="10px" color="neutral.400" fontWeight="600">
            {stage === "refined" ? "Background removed successfully" : "Analyzing geometry and texture"}
          </Text>
        </VStack>

        {stage === "refined" && (
          <HStack spacing={2} bg="neutral.50" p={1} borderRadius="full">
            <Tooltip label="Original" fontSize="xs">
              <IconButton
                aria-label="Original View"
                icon={<PiSelectionAllThin />}
                size="sm"
                variant={viewMode === "original" ? "solid" : "ghost"}
                colorScheme={viewMode === "original" ? "brand" : "gray"}
                rounded="full"
                onClick={() => setViewMode("original")}
              />
            </Tooltip>
            <Tooltip label="Clean PNG" fontSize="xs">
              <IconButton
                aria-label="Processed View"
                icon={<PiShapesThin />}
                size="sm"
                variant={viewMode === "processed" ? "solid" : "ghost"}
                colorScheme={viewMode === "processed" ? "brand" : "gray"}
                rounded="full"
                onClick={() => setViewMode("processed")}
              />
            </Tooltip>
          </HStack>
        )}
      </HStack>
    </VStack>
  );
};

export default AIProcessor;
