import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PiPlusThin } from "react-icons/pi";

interface StudioDropzoneProps {
  onUpload: (file: File) => void;
}

const fileTypes = ["JPG", "PNG", "JPEG"];

const StudioDropzone: FC<StudioDropzoneProps> = ({ onUpload }) => {
  const handleChange = (file: File) => {
    onUpload(file);
  };

  return (
    <Box w="100%">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        multiple={false}
      >
        <Box
          w="100%"
          h="300px"
          border="1px dashed"
          borderColor="neutral.200"
          borderRadius="xl"
          bg="neutral.50"
          cursor="pointer"
          transition="all 0.3s ease"
          _hover={{
            bg: "white",
            borderColor: "brand.500",
            transform: "translateY(-2px)",
            boxShadow: "xl",
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          overflow="hidden"
        >
          <VStack spacing={4}>
            <Box
              w="60px"
              h="60px"
              borderRadius="full"
              bg="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="sm"
            >
              <Icon as={PiPlusThin} boxSize={8} color="brand.500" />
            </Box>
            <VStack spacing={1}>
              <Text
                fontSize="xs"
                fontWeight="900"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="neutral.800"
              >
                Add Photo
              </Text>
              <Text fontSize="10px" color="neutral.400" fontWeight="600">
                DRAG & DROP OR CLICK TO BROWSE
              </Text>
            </VStack>
          </VStack>
        </Box>
      </FileUploader>
    </Box>
  );
};

export default StudioDropzone;
