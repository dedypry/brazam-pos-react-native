import { Search } from "lucide-react-native";
import { TextInput, TextInputProps, useColorScheme } from "react-native";
import { HStack } from "./ui/hstack";

export default function SearchBar({ ...props }: TextInputProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <HStack
      className="items-center rounded-lg py-1 ios:py-4 px-3"
      style={{
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <Search
        size={20}
        color={isDark ? "rgba(255, 255, 255, 0.6)" : "#6B7280"}
      />
      <TextInput
        {...props}
        placeholderTextColor={isDark ? "rgba(255, 255, 255, 0.5)" : "#9CA3AF"}
        style={{
          flex: 1,
          marginLeft: 5,
          fontSize: 16,
          color: isDark ? "rgba(255, 255, 255, 0.9)" : "#1F2937",
        }}
      />
    </HStack>
  );
}
