import { Box, Heading, Text, VStack, useDisclosure, Icon } from "@chakra-ui/react";
import CreateOutfit from "../closet/CreateOutfit";
import Button from "../../components/ui/Button";
import { IoAddOutline } from "react-icons/io5";
import { FC } from "react";

const Studio: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box w="100%" py={6} px={12} pt={{ base: "80px", md: 6 }}>
      <VStack spacing={8} align="stretch">
        <Box>
            <Heading size="2xl" fontWeight="900" letterSpacing="tight">
                STUDIO
            </Heading>
            <Text color="neutral.400" fontSize="xs" fontWeight="700" letterSpacing="widest" textTransform="uppercase">
                The Creative Hub
            </Text>
        </Box>

        <Box
          bg="white"
          p={12}
          border="1px dashed"
          borderColor="neutral.200"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minH="450px"
          boxShadow="sm"
        >
            <VStack spacing={6}>
              <Text color="neutral.400" fontSize="xs" fontWeight="800" letterSpacing="0.3em" textAlign="center">
                READY TO CURATE YOUR NEXT LOOK?
              </Text>
              <Button
                text="OPEN CURATOR"
                onClick={onOpen}
                rightIcon={<Icon as={IoAddOutline} />}
                px={10}
              />
            </VStack>

            <CreateOutfit
              isOpen={isOpen}
              onClose={onClose}
            />
        </Box>
      </VStack>
    </Box>
  );
};

export default Studio;
