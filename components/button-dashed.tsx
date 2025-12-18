import { colors } from "@/utils/configs/colors";
import { TouchableOpacity } from "react-native";
import { Avatar } from "./ui/avatar";
import { HStack } from "./ui/hstack";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";

interface Props {
  title: string;
  onPress?: () => void;
  icon: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
  isActive?: boolean;
  total?: number;
}
export default function ButtonDashed({
  title,
  onPress,
  icon,
  isActive,
  total,
}: Props) {
  return (
    <HStack>
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderWidth: 1,
          borderColor: isActive ? colors.success : colors.secondary,
          paddingVertical: 10,
          borderRadius: 10,
          width: "100%",
          borderStyle: "dashed",
          alignItems: "center",
        }}
      >
        <HStack className="items-center gap-3">
          <Icon
            as={icon}
            size="lg"
            className={isActive ? "text-success-500" : "text-gray-500"}
          />
          <Text className={isActive ? "text-success-500" : ""}>{title}</Text>
          {total && (
            <Avatar size="xs">
              <Text size="xs" className="text-white">
                {total}
              </Text>
            </Avatar>
          )}
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
