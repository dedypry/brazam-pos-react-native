import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";

interface Props {
  title: string;
  value: string;
}
export default function ListText({ title, value }: Props) {
  return (
    <HStack className="px-5 gap-4 justify-between items-center">
      <Text size="md" className="font-semibold text-gray-500">
        {title}
      </Text>
      <Text size="lg" className="font-semibold">{value}</Text>
    </HStack>
  );
}
