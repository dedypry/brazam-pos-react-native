import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { formatNumber } from "@/utils/helpers/formater";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Input() {
  const buttons = [
    ["7", "8", "9", "C"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "-"],
    ["000", ".", "/", "="],
  ];

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const onPress = (value: string) => {
    if (value === "C") {
      setExpression("");
      setResult("");
      return;
    }

    if (value === "=") {
      try {
        const evalResult = eval(expression.replace("/", "*1/"));
        setResult(String(evalResult));
      } catch {
        setResult("Error");
      }
      return;
    }

    setExpression((prev) => prev + value);
  };

  return (
    <Card className="p-4">
      <VStack className="gap-3">
        {/* DISPLAY */}
        <Card variant="outline" className="p-4 items-end">
          <Text className="text-gray-500 text-lg">{expression || "0"}</Text>
          <Text className="text-2xl font-bold">{formatNumber(result as any)}</Text>
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
                      ["+", "-", "/", "="].includes(btn)
                        ? "bg-primary-500"
                        : btn === "C"
                        ? "bg-red-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-lg font-semibold ${
                        ["+", "-", "/", "=", "C"].includes(btn)
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {btn}
                    </Text>
                  </TouchableOpacity>
                ))}
              </HStack>
            ))}
          </VStack>
        </Card>
      </VStack>
    </Card>
  );
}
