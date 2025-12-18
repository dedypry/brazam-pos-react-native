import { InterfaceModalProps } from "@gluestack-ui/core/lib/esm/modal/creator/types";
import { ReactElement, ReactNode } from "react";
import { Button, ButtonText } from "./ui/button";
import { Heading } from "./ui/heading";
import { CloseIcon, Icon } from "./ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./ui/modal";

interface Props {
  title?: string;
  show: boolean;
  hideFooter?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  children?: ReactNode;
  footer?: ReactElement;
}
export default function ModalCustom({
  show,
  onClose,
  onConfirm,
  title,
  children,
  hideFooter,
  footer,
  ...props
}: Props & InterfaceModalProps) {
  return (
    <Modal isOpen={show} onClose={onClose} size="lg" avoidKeyboard={true} {...props}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{title}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {!hideFooter && (
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              className="mr-3"
              onPress={onClose}
            >
              <ButtonText>Batal</ButtonText>
            </Button>
            <Button onPress={onConfirm}>
              <ButtonText>Simpan</ButtonText>
            </Button>
          </ModalFooter>
        )}
        {footer}
      </ModalContent>
    </Modal>
  );
}
