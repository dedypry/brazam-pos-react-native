import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTransaction } from "@/store/slices/transaction/transaction-slice";
import { SaveIcon, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import FormNumberInput from "../form/number-input";
import ModalCustom from "../modal-custom";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Card } from "../ui/card";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { InputSlot } from "../ui/input";
import { ModalFooter } from "../ui/modal";
import { Text } from "../ui/text";

interface Props {
  show: boolean;
  setShow: (val: boolean) => void;
}
export default function ModalDiscount({ show, setShow }: Props) {
  const [discount, setDiscount] = useState(0);
  const { transaction } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();
  const options = [
    { id: "percentage", label: "%" },
    { id: "idr", label: "Rp" },
  ];

  function setIsActive(id: string) {
    dispatch(
      setTransaction({
        discountType: id,
      })
    );
  }

  useEffect(()=>{
    if(transaction.discount){
        setDiscount(transaction.discount)
    }
  },[transaction])

  function handleSave(val: number) {
    dispatch(
      setTransaction({
        discount: val,
      })
    );
    setDiscount(0)
    setShow(false);
  }

  return (
    <ModalCustom
      title="Tambahkan Diskon"
      show={show}
      onClose={() => setShow(false)}
      hideFooter
      closeOnOverlayClick={false}
      footer={
        <ModalFooter>
          <Button
            variant="outline"
            action="negative"
            onPress={() => handleSave(0)}
          >
            <ButtonIcon as={Trash2} />
            <ButtonText className="text-error-500">Hapus Discount</ButtonText>
          </Button>
          <Button onPress={() => handleSave(discount)}>
            <ButtonIcon as={SaveIcon} />
            <ButtonText>Simpan</ButtonText>
          </Button>
        </ModalFooter>
      }
    >
      <HStack className="gap-2">
        <Card variant="outline" className="border-primary-500 p-1">
          <HStack>
            {options.map((e) => (
              <TouchableOpacity key={e.id} onPress={() => setIsActive(e.id)}>
                <Card
                  className={`py-1 px-3 ${
                    transaction.discountType === e.id ? "bg-primary-500" : ""
                  }`}
                >
                  <Center>
                    <Text
                      className={
                        transaction.discountType === e.id ? "text-white" : ""
                      }
                    >
                      {e.label}
                    </Text>
                  </Center>
                </Card>
              </TouchableOpacity>
            ))}
          </HStack>
        </Card>
        <View className="flex-1">
          <FormNumberInput
            value={discount.toString()}
            onInput={setDiscount}
            placeholder="Masukan Diskon..."
            prefix={
              transaction.discountType === "idr" ? (
                <InputSlot className="pl-3">
                  <Text>Rp</Text>
                </InputSlot>
              ) : undefined
            }
            suppix={
              transaction.discountType === "percentage" ? (
                <InputSlot className="pr-3">
                  <Text>%</Text>
                </InputSlot>
              ) : undefined
            }
          />
        </View>
      </HStack>
    </ModalCustom>
  );
}
