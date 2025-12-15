import { useState } from "react";
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
import { AlertCircleIcon, EyeIcon, EyeOffIcon, LockIcon } from "../ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";
import { IVariant } from "../ui/types/variant";
import { VStack } from "../ui/vstack";
interface Props {
  label?: string;
  isInvalid?: boolean;
  showIconPrefix?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  textHelper?: string;
  variant?: IVariant;
}

export default function FormPassword({
  label,
  showIconPrefix,
  isInvalid,
  errorMessage,
  isDisabled,
  isReadOnly,
  isRequired,
  textHelper,
  variant,
  ...inputProps
}: Props & TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
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
            <FormControlLabelText size="lg">{label}</FormControlLabelText>
          </FormControlLabel>
        )}
        <Input variant={variant}>
          {showIconPrefix && (
            <InputSlot className="pl-3">
              <InputIcon as={LockIcon} />
            </InputSlot>
          )}

          <InputField
            {...(inputProps as any)}
            type={showPassword ? "text" : "password"}
          />
          <InputSlot
            className="pr-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
          </InputSlot>
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
