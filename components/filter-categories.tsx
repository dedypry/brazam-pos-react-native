import { ITrxFilter } from "@/utils/interfaces/product";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";

interface Props {
  data: ITrxFilter[];
  selected: number;
  setSelected: (val: ITrxFilter) => void;
}
export default function FilterCategory({ data, selected, setSelected }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack className="gap-2 py-1">
        {data.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => setSelected(filter)}
            style={{
              backgroundColor:
                selected === filter.id ? filter.color || "#FF6B6B" : "#FFFFFF",
              // paddingHorizontal: 16,
              // paddingVertical: 8,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: isDark ? 0.3 : 0.1,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <View className="px-4 py-2 flex-col items-center">
              <Text
                className="text-md font-semibold"
                style={{
                  color:
                    selected === filter.id
                      ? "white"
                      : isDark
                      ? "rgba(255, 255, 255, 0.7)"
                      : "#6B7280",
                }}
              >
                {filter.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </HStack>
    </ScrollView>
  );
}
