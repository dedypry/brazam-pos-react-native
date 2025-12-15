import { ReactElement } from "react";
import { TextInputProps } from "react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import { AlertCircleIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { IVariant } from "../ui/types/variant";
import { VStack } from "../ui/vstack";

export interface PropsTextInputCustom extends TextInputProps {
  label?: string;
  prefix?: ReactElement;
  suppix?: ReactElement;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  textHelper?: string;
  variant?: IVariant;
}

export default function FormTextInput({
  label,
  prefix,
  suppix,
  isInvalid,
  errorMessage,
  isDisabled,
  isReadOnly,
  isRequired,
  textHelper,
  variant,
  ...inputProps
}: PropsTextInputCustom) {
  return (
    <VStack>
      <FormControl
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      >
        {label && (
          <FormControlLabel>
            <FormControlLabelText>{label}</FormControlLabelText>
          </FormControlLabel>
        )}
        <Input variant={variant} size="lg">
          {prefix}
          <InputField {...(inputProps as any)} />
          {suppix}
        </Input>

        {textHelper && (
          <FormControlHelper>
            <FormControlHelperText>{textHelper}</FormControlHelperText>
          </FormControlHelper>
        )}

        {errorMessage && (
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-error-500"
            />
            <FormControlErrorText className="text-error-500">
              {errorMessage}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
