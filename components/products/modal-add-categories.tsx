import { categorySchema } from "@/db/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferSelectModel } from "drizzle-orm";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import FormTextInput from "../form/text-input";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { CloseIcon, Icon } from "../ui/icon";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "../ui/modal";

const catSchema = yup.object({
  name: yup.string().required("Kategori wajib diisi"),
});

type CatFormValues = yup.InferType<typeof catSchema>;

interface Props {
  show: boolean;
  setShow: (val: boolean) => void;
  categories: InferSelectModel<typeof categorySchema>;
}
export default function ModalAddCategories({ show, setShow, categories }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CatFormValues>({
    resolver: yupResolver(catSchema),
    mode: "onChange",
  });

  function onSubmit(data: CatFormValues) {}

  return (
    <Modal
      isOpen={show}
      onClose={() => {
        setShow(false);
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Buat kategori baru</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormTextInput
                placeholder="Masukan Nama Kategory"
                value={field.value}
                onChangeText={field.onChange}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
          />
        </ModalBody>
      </ModalContent>
      <ModalFooter>
        <Button
          variant="outline"
          action="secondary"
          className="mr-3"
          onPress={() => {
            setShow(false);
          }}
        >
          <ButtonText>Batal</ButtonText>
        </Button>
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Simpan</ButtonText>
        </Button>
      </ModalFooter>
    </Modal>
  );
}
