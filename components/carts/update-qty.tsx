import { db } from "@/db";
import { salesSchema } from "@/db/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import * as yup from "yup";
import FormNumberInput from "../form/number-input";
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
import { Text } from "../ui/text";

const qtySchema = yup.object({
  qty: yup.number().required("Qty wajib diisi"),
});

type QtyFormValues = yup.InferType<typeof qtySchema>;

interface Props {
  id: number;
  qty: number;
}
export default function ModalEditQty({ qty, id }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<QtyFormValues>({
    resolver: yupResolver(qtySchema),
    mode: "onChange",
    defaultValues: { qty },
  });

  useEffect(() => {
    setValue("qty", qty);
    console.log("QTY", qty);
  }, [qty]);

  async function onSubmit(data: QtyFormValues) {
    await db
      .update(salesSchema)
      .set({
        quantity: data.qty,
      })
      .where(eq(salesSchema.id, id));

    setOpenModal(false);
  }

  return (
    <>
      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Ubah Quantity</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <Controller
              control={control}
              name="qty"
              render={({ field }) => (
                <FormNumberInput
                  value={field.value?.toString()}
                  onInput={field.onChange}
                  label="Quantity"
                  placeholder="Masukan Quantity..."
                  isInvalid={!!errors.qty}
                  errorMessage={errors.qty?.message}
                />
              )}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              className="mr-3"
              onPress={() => {
                setOpenModal(false);
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
      <TouchableOpacity onPress={() => setOpenModal(true)} className="min-w-20">
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginHorizontal: 16,
            minWidth: 30,
            textAlign: "center",
          }}
        >
          {qty}
        </Text>
      </TouchableOpacity>
    </>
  );
}
