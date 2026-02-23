import { FC } from "react";
import { Container, Heading, Text, VStack, Box, useDisclosure } from "@chakra-ui/react";
import CreateOutfit from "../closet/CreateOutfit";
import Button from "../../components/ui/Button";
import { IoAddOutline } from "react-icons/io5";

const Studio: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={12} align="stretch">
        <Box>
            <Heading size="2xl" fontWeight="900" letterSpacing="tight">
                STUDIO
            </Heading>
            <Text color="neutral.400" fontSize="md" letterSpacing="widest" textTransform="uppercase">
                The Creative Hub
            </Text>
        </Box>

        <Box
          bg="neutral.50"
          p={12}
          boxShadow="inner"
          border="1px dashed"
          borderColor="neutral.200"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minH="400px"
        >
            <VStack spacing={6}>
              <Text color="neutral.400" fontWeight="500" letterSpacing="widest" textAlign="center">
                READY TO CURATE YOUR NEXT LOOK?
              </Text>
              <Button
                text="OPEN CURATOR"
                onClick={onOpen}
                rightIcon={<IoAddOutline />}
                px={10}
              />
            </VStack>

            <CreateOutfit
              isOpen={isOpen}
              onClose={onClose}
            />
        </Box>
      </VStack>
    </Container>
  );
};

export default Studio;
