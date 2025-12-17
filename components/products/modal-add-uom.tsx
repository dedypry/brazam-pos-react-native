import { db } from "@/db";
import { uomSchema } from "@/db/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { eq, InferSelectModel } from "drizzle-orm";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import FormTextInput from "../form/text-input";
import { Button, ButtonText } from "../ui/button";
import Chip from "../ui/chip";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
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
  name: yup.string().required("Satuan wajib diisi"),
});

type CatFormValues = yup.InferType<typeof catSchema>;

interface Props {
  show: boolean;
  setShow: (val: boolean) => void;
  uoms: InferSelectModel<typeof uomSchema>[];
}
export default function ModalAddUom({
  show,
  setShow,
  uoms,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CatFormValues>({
    resolver: yupResolver(catSchema),
    mode: "onChange",
  });

  async function onSubmit(data: CatFormValues) {
    await db.insert(uomSchema).values(data);
    reset();
    setShow(false);
  }

  async function onDelete(id: number) {
    await db.delete(uomSchema).where(eq(uomSchema.id, id));
  }

  return (
    <Modal
      isOpen={show}
      onClose={() => {
        setShow(false);
      }}
      size="lg"
      avoidKeyboard={true}
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
                placeholder="Masukan Nama Satuan"
                value={field.value}
                onChangeText={field.onChange}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <HStack className="flex-wrap gap-2 pt-3">
            {uoms.map((e, i) => (
              <Chip title={e.name} key={i} onClose={() => onDelete(e.id)} />
            ))}
          </HStack>
        </ModalBody>
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
      </ModalContent>
    </Modal>
  );
}
