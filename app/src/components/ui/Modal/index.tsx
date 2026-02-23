import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";

type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  onAction?: () => void;
  actionTitle?: string;
  onClick?: any;
  closeTitle?: string;
  actionTitleLoading?: boolean;
  isLoading?: boolean;
  maxW?: string;
  alert?: boolean;
} & React.ComponentProps<typeof ChakraModal>;

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onClick,
  title,
  isLoading,
  alert,
  maxW,
  ...rest
}) => {
  return (
    <ChakraModal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent maxW={maxW}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {/* <ModalBody pb={6}>{rest.children}</ModalBody> */}
        {rest.children}
      </ModalContent>
    </ChakraModal>
  );
};
export default Modal;
