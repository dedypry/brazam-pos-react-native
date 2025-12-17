import FormTextArea from "@/components/form/text-area";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTransaction } from "@/store/slices/transaction/transaction-slice";
import { formatNumber } from "@/utils/helpers/formater";
import { router } from "expo-router";
import { BanknoteArrowUp, Delete } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Input() {
  const { transaction } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();
  const buttons = [
    ["C", "%", ",", "÷"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["000", "0", "del", "="],
  ];
  const operators = ["+", "-", "x", "÷"];

  const [expression, setExpression] = useState("");
  // const [result, setResult] = useState("");

  function setResult(val: string) {
    dispatch(
      setTransaction({
        totalPrice: val,
      })
    );
  }

  const handleResult = (value?: string) => {
    if (!expression || !value) return;
    let result = value || expression;
    const lastChar = result.at(-1);
    const isLastOperator = operators.includes(lastChar ?? "");

    if (isLastOperator) {
      result = result.slice(0, -1);
    }

    try {
      const sanitized = result
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/,/g, ".");

      const evalResult = eval(sanitized);
      setResult(String(evalResult));
    } catch {
      setResult("Error");
    }
  };

  const onPress = (value: string) => {
    if (value === "C") {
      setExpression("");
      setResult("");
      return;
    }

    // DELETE
    if (value === "del") {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "=") {
      handleResult();
      return;
    }

    // PERCENT
    if (value === "%") {
      setExpression((prev) => {
        const match = prev.match(/(\d+(\.\d+)?)$/);
        if (!match) return prev;

        const number = match[0];
        const percent = String(Number(number) / 100);

        return prev.slice(0, -number.length) + percent;
      });
      return;
    }

    // OPERATOR — cegah double operator
    if (operators.includes(value)) {
      setExpression((prev) => {
        if (!prev) return prev;
        if (operators.includes(prev.slice(-1))) {
          return prev.slice(0, -1) + value;
        }
        return prev + value;
      });
      return;
    }

    // DECIMAL
    if (value === ",") {
      setExpression((prev) => {
        const lastNumber = prev.split(/[+\-x÷]/).pop();
        if (lastNumber?.includes(",")) return prev;
        return prev + ",";
      });
      return;
    }

    handleResult(expression + value);
    setExpression((prev) => prev + value);
  };

  async function handleNext() {
    router.push("/pages/receive-payment");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
        bounces={false} // iOS
        alwaysBounceVertical={false} // iOS
        overScrollMode="never"
      >
        <Card className="p-4">
          <VStack className="gap-3">
            {/* DISPLAY */}
            <Card variant="outline" className="p-4 items-end">
              <Text className="text-gray-500 text-lg">{expression || "0"}</Text>
              <Text className="text-2xl font-bold">
                {formatNumber(transaction.totalPrice)}
              </Text>
            </Card>

            {/* BUTTONS */}
            <Card variant="outline" className="p-3">
              <VStack className="gap-2">
                {buttons.map((row, i) => (
                  <HStack key={i} className="gap-2">
                    {row.map((btn) => (
                      <TouchableOpacity
                        key={btn}
                        onPress={() => onPress(btn)}
                        className={`flex-1 h-12 rounded-xl items-center justify-center ${
                          ["+", "-", "/", "=", "x", "÷"].includes(btn)
                            ? "bg-primary-500"
                            : ["C", "del"].includes(btn)
                            ? "bg-red-500"
                            : "bg-gray-200"
                        }`}
                      >
                        {btn === "del" ? (
                          <Icon as={Delete} size="xl" className="text-white" />
                        ) : (
                          <Text
                            className={`text-lg font-semibold ${
                              ["+", "-", "/", "=", "C", "x", "÷"].includes(btn)
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            {btn}
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </HStack>
                ))}
              </VStack>
            </Card>
          </VStack>
        </Card>
        <Card>
          <VStack className="gap-5">
            <FormTextArea
              label="Tambahkan Catatan"
              value={transaction.note}
              onChangeText={(val) => {
                dispatch(
                  setTransaction({
                    note: val,
                  })
                );
              }}
            />
            <Button
              size="xl"
              variant="outline"
              disabled={Number(transaction.totalPrice) < 1}
              onPress={handleNext}
              action={`${
                Number(transaction.totalPrice) < 1 ? "secondary" : "primary"
              }`}
            >
              <ButtonIcon as={BanknoteArrowUp} />
              <ButtonText>Lanjutkan Ke Pembayaran</ButtonText>
            </Button>
          </VStack>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
