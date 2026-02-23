import { FC } from "react";
import { Outfit as OutfitInterface } from "../../../interfaces/outfit";
import {
  Grid,
  Flex,
  Heading,
  Tag,
  useColorModeValue,
  Button,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineStarRate } from "react-icons/md";
import { capsFirst } from "../../../utils";
import Outfit from "../../Outfit";

interface OutfitCardProps {
  outfit: OutfitInterface;
}
const OutfitCard: FC<OutfitCardProps> = ({ outfit }) => {
  const {
    isOpen: isOpenOutfit,
    onOpen: onOpenOutfit,
    onClose: onCloseOutfit,
  } = useDisclosure();
  return (
    <Grid
      boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
      justifyContent="space-between"
      gap={8}
      // flexDirection={{ base: "column", md: "row" }}
      overflow="hidden"
      color="gray.300"
      bg="base.d100"
      rounded={5}
      // flex={1}
      p={5}
    >
      <Grid>
        <Flex
          gap={4}
          mb={2}
          w={"100%"}
          // flexDirection={{ base: "column", md: "row" }}
        >
          <Heading
            // fontSize={{ base: "xl", md: "2xl" }}
            fontSize={"xl"}
            // textAlign="left"
          >
            {capsFirst(outfit.type)}
          </Heading>{" "}
          <Tag
            size="sm"
            variant="outline"
            colorScheme="blackAlpha"
            w={"80px"}
            height={"25px"}
            // mt={1}
          >
            <Text w={"100%"}>Rating: {outfit.rating}</Text>
            <MdOutlineStarRate
              style={{ marginBottom: "3px", marginLeft: "2px" }}
              color="pink"
              size={16}
            />
          </Tag>
        </Flex>
        <Grid
          gridTemplateColumns={{
            base: "repeat(3, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          w={"100%"}
          gap={2}
          justifyItems={"center"}
        >
          {outfit.clothes.map((clothe: any, index: number) => (
            <img
              key={index}
              src={clothe.clothe.images[0].file}
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          ))}
        </Grid>
      </Grid>

      <Grid
        gap={5}
        w={{
          base: "100%",
          md: "100%",
        }}
      >
        <Grid gap={2}>
          {outfit.notes && (
            <Box
              bg={useColorModeValue("pink.100", "gray.100")}
              p={2}
              borderRadius={5}
              // w={"100%"}
            >
              <Text
                color={useColorModeValue("black", "white")}
                fontSize={12}
                textAlign={"left"}
              >
                Notes:
              </Text>
              <Text
                fontSize={12}
                color={useColorModeValue("black", "white")}
                textAlign={"left"}
              >
                {capsFirst(outfit.notes)}
              </Text>
            </Box>
          )}

          <Text textAlign={"left"}>by: {outfit.userId.username}</Text>
        </Grid>
        <Button
          // onClick={() => alert(`Post ${post.id - 5} clicked`)}
          bg={useColorModeValue("pink.200", "black")}
          fontWeight="bold"
          color="gray.900"
          size="sm"
          w={{
            base: "100%",
            // md: "100%",
          }}
          onClick={onOpenOutfit}
        >
          More
        </Button>
      </Grid>
      <Outfit isOpen={isOpenOutfit} onClose={onCloseOutfit} outfit={outfit} />
    </Grid>
  );
};
export default OutfitCard;
