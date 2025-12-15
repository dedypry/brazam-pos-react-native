import { switchCommasToDots, switchDotsToCommas } from "@/utils/helpers/formater";
import { useEffect, useState } from "react";
import FormTextInput, { PropsTextInputCustom } from "./text-input";
interface Props extends PropsTextInputCustom {
  onInput?: (val: number) => void;
  maxInput?: number;
  minimumOrderQuantity?: number;
  isInputBase?: boolean;
  isAllowDecimal?: boolean;
  maxDecimal?: number;
}
export default function FormNumberInput({
  onInput,
  maxInput,
  minimumOrderQuantity,
  isInputBase = false,
  isAllowDecimal = true,
  maxDecimal = 4,
  ...props
}: Props) {
  const [value, setValue] = useState(props.value);

   useEffect(() => {
     if (props.value !== undefined && props.value !== null) {
       setValue(
         formatIndonesianNumber(switchDotsToCommas(props.value.toString()))
       );
     }

      setTimeout(() => {
        if (
          minimumOrderQuantity !== undefined &&
          (props.value ? Number(props.value) : 0) < minimumOrderQuantity
        ) {
          setValue(switchDotsToCommas(minimumOrderQuantity));
          onInput?.(minimumOrderQuantity);
        }
      }, 500);
   }, [props.value]);

  function formatIndonesianNumber(input: string): string {
    if (!input) return "";

    // Split into integer and decimal parts
    const [integerPart, decimalPart] = input.split(",");

    // Add thousand separators to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (isAllowDecimal) {
      if (decimalPart?.length > maxDecimal) {
        return `${formattedInteger},${decimalPart.slice(0, maxDecimal)}`;
      }
    } else {
      return `${formattedInteger}`;
    }

    // If there's no decimal part but a trailing comma exists, preserve it
    if (input.endsWith(",")) {
      return `${formattedInteger},`;
    }

    // Combine formatted integer with the decimal part (if present)
    return decimalPart !== undefined
      ? `${formattedInteger},${decimalPart}`
      : formattedInteger;
  }

  function handleChangeText(input: string) {
    if (!input) setValue(undefined);
    const sanitizedInput = input.replace(/[^0-9,]/g, "");
    const commaCount = (sanitizedInput.match(/,/g) || []).length;
    if (commaCount > 1) return;

    setValue(formatIndonesianNumber(sanitizedInput) as any);

    // Convert sanitized input to a number
    const numericValue = switchCommasToDots(sanitizedInput);

    // Validate maximum input value
    if (maxInput && numericValue > maxInput) return;

    // Call the onInput callback with the numeric value
    onInput?.(numericValue);
  }

  return (
    <FormTextInput
      {...props}
      value={value}
      onChangeText={handleChangeText}
      keyboardType="numeric"
    />
  );
}
