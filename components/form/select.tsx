import { ISelectProps } from "@gluestack-ui/core/lib/esm/select/creator/types";
import { ReactElement } from "react";
import { View } from "react-native";
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
import { AlertCircleIcon, ChevronDownIcon } from "../ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../ui/select";
import { IVariant } from "../ui/types/variant";
import { VStack } from "../ui/vstack";

interface IItems {
  label?: string;
  value?: any;
}
export interface PropsSelectCustom extends ISelectProps {
  label?: string;
  prefix?: ReactElement;
  suppix?: ReactElement;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  textHelper?: string;
  contentRight?: ReactElement;
  variant?: IVariant;
  items?: IItems[];
}

export default function FormSelect({
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
  items,
  contentRight,
  ...inputProps
}: PropsSelectCustom) {
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
            <View className="flex-1" />

            {contentRight}
          </FormControlLabel>
        )}
        <Select {...(inputProps as any)}>
          <SelectTrigger variant="outline" size="lg">
            <SelectInput placeholder={inputProps.placeholder} />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>

          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {items?.length! > 0 &&
                items?.map((item, i) => (
                  <SelectItem
                    key={i}
                    label={item?.label || (item as any)}
                    value={item?.value || item}
                  />
                ))}
            </SelectContent>
          </SelectPortal>
        </Select>
        {/* <Input variant={variant} size="lg">
          {prefix}
          <InputField {...(inputProps as any)} />
          {suppix}
        </Input> */}

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
