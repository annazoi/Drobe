import { ModalBody, ModalFooter, Textarea, useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import ImagePicker from "../../../components/ui/ImagePicker";
import { useMutation } from "react-query";
import Modal from "../../../components/ui/Modal";
import { ImagePickerItemData } from "../../../interfaces/components";
import { NewClothe } from "../../../interfaces/clothe";
import Select from "../../../components/ui/Select";
import { CLOTHE_TYPES, SEASONS } from "../../../constants/clotheTypes";
import { createClothe } from "../../../services/clothe";
import Button from "../../../components/ui/Button";

interface CreateItemProps {
  isOpen: any;
  onClose: any;
}

const CreateItem: FC<CreateItemProps> = ({ isOpen, onClose }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [season, setSeason] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const toast = useToast();

  const handleImageChange = (value: ImagePickerItemData) => {
    const filesToStore = value.files.map((image: any) => image.file);
    setSelectedImages(filesToStore);
  };

  const { mutate: createClotheMutate, isLoading: createClotheIsLoading } =
    useMutation({
      mutationFn: ({ images, type, season, notes }: NewClothe) =>
        createClothe({ images, type, season, notes }),
    });

  const handleSave = () => {
    if (!selectedImages.length) {
      console.log("Please select an image");
      toast({ title: "Please select an image", status: "error" });
      return;
    }
    createClotheMutate(
      {
        images: selectedImages,
        type: category,
        season: season,
        notes: notes,
      },
      {
        onSuccess: () => {
          toast({
            title: "Item created successfully",
            status: "success",
          });
          onClose();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleTypeChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handleSeasonChange = (e: any) => {
    setSeason([e.target.value]);
  };

  const handleNotes = (e: any) => {
    setNotes(e.target.value);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create an item from your closet"
      >
        <ModalBody pb={6}>
          <div style={{ display: "grid", gap: "35px" }}>
            <Select
              onChange={handleTypeChange}
              options={CLOTHE_TYPES}
              placeholder="Select Type"
            />
            <Select
              onChange={handleSeasonChange}
              options={SEASONS}
              placeholder="Select Season"
            />
            <ImagePicker
              onChange={handleImageChange}
              label="Select Image"
              name="image"
              // images={selectedImages}
            />
            <Textarea placeholder="Add notes..." onChange={handleNotes} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            text="Save"
            width="100%"
            marginRight={3}
            isLoading={createClotheIsLoading}
            loadingText="Saving"
            onClick={handleSave}
          />
          <Button
            text="Close"
            width="100%"
            onClick={onClose}
            secondary={true}
          />
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateItem;
