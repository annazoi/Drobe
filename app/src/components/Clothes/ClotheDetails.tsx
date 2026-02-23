import {
  Box,
  Heading,
  VStack,
  Text,
  Image,
  HStack,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { FC } from "react";
import Modal from "../ui/Modal";
import { Clothe } from "../../interfaces/clothe";
import { capsFirst } from "../../utils";
import Button from "../ui/Button";

interface ClotheDetailsProps {
  clothe: Clothe | null;
  isOpen: boolean;
  onClose: () => void;
}

const ClotheDetails: FC<ClotheDetailsProps> = ({ clothe, isOpen, onClose }) => {
  if (!clothe) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CLOTHE DETAILS"
      size="5xl"
      isCentered
    >
      <ModalBody p={0}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
          {/* Visual Section */}
          <Box bg="neutral.50" p={8} display="flex" alignItems="center" justifyContent="center">
            <Image
              src={clothe.images[0]?.file}
              alt={clothe.notes}
              maxH="60vh"
              objectFit="contain"
              boxShadow="2xl"
            />
          </Box>

          {/* Info Section */}
          <VStack align="stretch" spacing={8} p={12} justify="center">
            <VStack align="flex-start" spacing={2}>
              <Text
                fontSize="xs"
                fontWeight="900"
                letterSpacing="0.4em"
                textTransform="uppercase"
                color="brand.500"
              >
                {clothe.type}
              </Text>
              <Heading size="2xl" fontWeight="300" letterSpacing="tight">
                Ref: {clothe.id?.slice(-8).toUpperCase()}
              </Heading>
            </VStack>

            <Divider borderColor="neutral.200" />

            <Box>
              <Text
                fontSize="10px"
                fontWeight="900"
                color="neutral.300"
                mb={4}
                textTransform="uppercase"
                letterSpacing="widest"
              >
                STYLING NOTES
              </Text>
              <Text fontSize="xl" fontWeight="300" fontStyle="italic" color="neutral.600" lineHeight="1.8">
                {clothe.notes ? `"${capsFirst(clothe.notes)}"` : "A versatile essential for your curated wardrobe."}
              </Text>
            </Box>

            <HStack spacing={12} pt={4}>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="10px" fontWeight="800" letterSpacing="widest" color="neutral.300">STATUS</Text>
                <Text fontSize="md" fontWeight="600" color="neutral.900">ARCHIVED</Text>
              </VStack>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="10px" fontWeight="800" letterSpacing="widest" color="neutral.300">CONDITION</Text>
                <Text fontSize="md" fontWeight="600" color="neutral.900">PRISTINE</Text>
              </VStack>
            </HStack>
          </VStack>
        </SimpleGrid>
      </ModalBody>
      <ModalFooter borderTop="1px solid" borderColor="neutral.100" p={6}>
        <Button text="CLOSE DETAILS" onClick={onClose} px={10} />
      </ModalFooter>
    </Modal>
  );
};

export default ClotheDetails;
