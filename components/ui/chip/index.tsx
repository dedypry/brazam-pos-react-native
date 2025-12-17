import Bounce from "@/components/bounce";
import { Card } from "../card";
import { HStack } from "../hstack";
import { CloseCircleIcon, Icon } from "../icon";
import { Text } from "../text";

interface Props {
  title: string;
  onClose?: () => void;
}
export default function Chip({title, onClose}:Props) {
  return (
    <Card variant="outline" className="py-1 px-2 rounded-full">
      <HStack className="gap-2 items-center">
        <Text size="sm">{title}</Text>
        <Bounce onPress={onClose}>
          <Icon as={CloseCircleIcon} className="text-gray-500" />
        </Bounce>
      </HStack>
    </Card>
  );
}
