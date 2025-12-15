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
import { Textarea, TextareaInput } from "../ui/textarea";
import { IVariant } from "../ui/types/variant";
import { VStack } from "../ui/vstack";

export interface PropsTextAreaCustom extends TextInputProps {
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

export default function FormTextArea({
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
}: PropsTextAreaCustom) {
  return (
    <VStack>
      <FormControl
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      >
        {label && (
          <FormControlLabel className="justify-between">
            <FormControlLabelText>{label}</FormControlLabelText>
            {inputProps.maxLength && (
              <FormControlLabelText>
                {inputProps.value?.length || 0}/{inputProps.maxLength}
              </FormControlLabelText>
            )}
          </FormControlLabel>
        )}
        <Textarea>
          <TextareaInput {...(inputProps as any)} />
        </Textarea>

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
