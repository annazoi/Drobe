import { FC } from "react";
import Modal from "../ui/Modal";
import { Box, Grid, Image, ModalBody, ButtonGroup } from "@chakra-ui/react";
import { Outfit as OutfitInterface } from "../../interfaces/outfit";
import { capsFirstLowerThen } from "../../utils";
import Button from "../ui/Button";
// import Rating from "../ui/Rating";
// import { authStore } from "../../store/authStore";

interface OutfitProps {
  isOpen?: any;
  onClose?: any;
  outfit?: OutfitInterface;
}

const Outfit: FC<OutfitProps> = ({ isOpen, onClose, outfit }) => {
  // const { userId } = authStore((store: any) => store);
  //   console.log(outfit);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${capsFirstLowerThen(outfit?.type)} outfit`}
      // maxW="100%"
    >
      <ModalBody p={5}>
        <Box>
          <Grid
            borderRadius={5}
            gap={1}
            justifyContent={"center"}
            boxShadow={"0px 0px 10px 0px rgba(255, 86, 204, 0.61)"}
          >
            {outfit?.clothes.map((clothe: any, index: number) => (
              <Image
                key={index}
                src={clothe.clothe.images[0].file}
                w={"100px"}
                h={"100px"}
              />
            ))}
          </Grid>
          <ButtonGroup mt={5} justifyContent="end" w={"100%"} onClick={onClose}>
            {/* <Rating value={outfit?.rating}></Rating> */}
            {/* {outfit?.userId.id === userId && <Button>Edit</Button>} */}
            <Button text="Close" secondary={true} />
          </ButtonGroup>
        </Box>
      </ModalBody>
    </Modal>
  );
};
export default Outfit;
