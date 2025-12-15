import { Search } from "lucide-react-native";
import { TextInputProps } from "react-native";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";

interface Props {
  className?: string;
}
export default function SearchBar({
  className,
  ...props
}: Props & TextInputProps) {
  return (
    <Input variant="paded" size="xl" className={`rounded-full ${className}`}>
      <InputSlot className="pl-3">
        <InputIcon as={Search} />
      </InputSlot>
      <InputField placeholder="Search Product..." />
    </Input>
  );
}
