import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import { Button, ButtonText } from "./ui/button";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";

interface Props {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  buttonTitleConfirm?: string;
  children?: ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "positive"
    | "negative"
    | "default"
    | undefined;
}
export default function ConfirmAlert({
  show,
  onClose,
  onConfirm,
  title,
  subtitle,
  children,
  buttonTitleConfirm = "Delete",
  color = "negative",
}: Props) {
  return (
    <AlertDialog isOpen={show} onClose={onClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            {title || "Apakah Anda yakin ingin menghapus produk ini?"}
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          {children ? (
            children
          ) : (
            <Text size="sm">
              {subtitle ||
                "Menghapus produk akan menghilangkannya secara permanen dan tidak dapat dibatalkan. Silakan konfirmasi jika Anda ingin melanjutkan."}
            </Text>
          )}
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <Button
            variant="outline"
            action="secondary"
            onPress={onClose}
            size="sm"
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size="sm" onPress={onConfirm} action={color}>
            <ButtonText>{buttonTitleConfirm}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
