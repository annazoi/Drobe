import { FC } from "react";
import { Grid, useColorModeValue, Button, Text, Box } from "@chakra-ui/react";
import { capsFirst } from "../../../utils";
import { ClotheImage } from "../../../interfaces/clothe";
import Carousel from "../Carousel";
interface ClotheCardProps {
  clothe: any;
}
const ClotheCard: FC<ClotheCardProps> = ({ clothe }) => {
  return (
    <Grid
      boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
      gap={8}
      //   flexDirection={{ base: "column", md: "row" }}
      overflow="hidden"
      color="gray.300"
      bg="base.d100"
      rounded={5}
      w={"100%"}
    >
      <Carousel
        images={clothe.images.map((image: ClotheImage) => image.file)}
      ></Carousel>

      <Grid gap={4} p={2}>
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
            Notes: {capsFirst(clothe.notes)}
          </Text>
          <Text
            fontSize={12}
            color={useColorModeValue("black", "white")}
            textAlign={"left"}
          >
            {/* {capsFirst(outfit.notes)} */}
          </Text>
        </Box>

        <Button
          bg={useColorModeValue("pink.200", "black")}
          fontWeight="bold"
          color="gray.900"
          size="sm"
          w={{
            base: "100%",
            // md: "100%",
          }}
        >
          More
        </Button>
      </Grid>
    </Grid>
  );
};
export default ClotheCard;
