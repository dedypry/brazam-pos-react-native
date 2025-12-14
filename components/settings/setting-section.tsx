import { ReactNode } from "react";
import { useColorScheme, View } from "react-native";
import { Text } from "../ui/text";

interface Props {
  title: string;
  children: ReactNode;
}
export default function SettingSection({ title, children }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={{ marginBottom: 32 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: isDark ? "rgba(255, 255, 255, 0.9)" : "#1F2937",
          marginBottom: 16,
          paddingHorizontal: 4,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
