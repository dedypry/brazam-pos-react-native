import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ReactElement } from "react";
import { TouchableOpacity, View } from "react-native";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";

interface Props {
  title: string;
  to?: string;
  goBack?: boolean;
  actions?: ReactElement;
}
export default function LayoutHeader({ title, to, goBack, actions }: Props) {
  return (
    <HStack className="bg-white pt-16 pb-4 px-5 justify-between">
      <HStack className="items-center gap-4">
        <TouchableOpacity
          onPress={() =>
            goBack ? router.back() : router.push(to ? (to as any) : "/")
          }
        >
          <Icon as={ChevronLeft} size="xl" />
        </TouchableOpacity>
        <Heading className="font-semibold">{title}</Heading>
      </HStack>
      <View>{actions}</View>
    </HStack>
  );
}
