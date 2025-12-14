import { ReactNode } from "react";
import { useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  color?: string;
}

interface ISafeBackground {
  children: ReactNode;
  noPadding?: boolean;
}
export function SafeBackground({ children, noPadding }: ISafeBackground) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <View
      style={{
        backgroundColor: isDark ? "black" : "white",
        paddingBottom: noPadding ? 0 : 10,
      }}
    >
      {children}
    </View>
  );
}

export default function SafeArea({ color }: Props) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <View
      style={{
        paddingTop: insets.top - 10,
        backgroundColor: color ? color : isDark ? "black" : "white",
      }}
    />
  );
}
