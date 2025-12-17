import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";

interface Props {
  title: string;
  value: string;

}
export default function ListText({ title, value }: Props) {
  return (
    <HStack className="gap-4 justify-between items-center">
      <Text size="md" className="font-semibold text-gray-500">
        {title}
      </Text>
      <Text size="md" className="font-semibold">{value}</Text>
    </HStack>
  );
}
