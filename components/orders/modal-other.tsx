import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTransaction } from "@/store/slices/transaction/transaction-slice";
import { Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import FormNumberInput from "../form/number-input";
import FormTextInput from "../form/text-input";
import ModalCustom from "../modal-custom";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Divider } from "../ui/divider";
import { VStack } from "../ui/vstack";

interface Props {
  show: boolean;
  setShow: (val: boolean) => void;
}
export default function ModalOther({ show, setShow }: Props) {
  const { transaction } = useAppSelector((state) => state.transaction);
  const [form, setForm] = useState([{ description: "", fee: "" }]);

  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(transaction?.additionFee){
      setForm(transaction?.additionFee);
    }
  },[transaction])

  function handleRemoce(index:number){
    setForm((e)=> e.filter((_,i) => i !== index))
  }

  function handleForm(index: number, key: "description" | "fee", val: string) {
    setForm((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: val } : item))
    );
  }

  function handleAdd() {
    setForm((val) => [...val, { description: "", fee: "" }]);
  }

  function handleSave() {
    dispatch(
      setTransaction({
        additionFee: form,
      })
    );

    setShow(false)
  }
  return (
    <ModalCustom
      title="Biaya Lain-lain"
      show={show}
      onClose={() => setShow(false)}
      onConfirm={handleSave}
      avoidKeyboard={true}
      isKeyboardDismissable={true}
    >
      {form.map((e, i) => (
        <VStack className="gap-3" key={i}>
          <FormTextInput
            value={e.description}
            onChangeText={(val) => handleForm(i, "description", val)}
            isRequired
            label="Deskripsi"
            placeholder="Masukan Biaya lain-lain"
          />
          <FormNumberInput
            value={e.fee.toString()}
            onInput={(val) => handleForm(i, "fee", val?.toString())}
            label="Fee"
            isRequired
            placeholder="20.000"
          />
          <Button
            size="xs"
            action="negative"
            variant="outline"
            onPress={() => handleRemoce(i)}
          >
            <ButtonIcon as={Trash2} />
            <ButtonText className="text-error-500">Haspus</ButtonText>
          </Button>
          <Divider className="my-3" />
        </VStack>
      ))}
      <Button className="mt-5" variant="outline" onPress={handleAdd}>
        <ButtonText>Tambah biaya lain-lain</ButtonText>
      </Button>
    </ModalCustom>
  );
}
