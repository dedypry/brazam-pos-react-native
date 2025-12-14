import { ChevronRight } from "lucide-react-native";
import { ComponentType } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import Animated, {
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { Switch } from "../ui/switch";
import { Text } from "../ui/text";

interface Props {
  icon: ComponentType<any>;
  title: string;
  isSameColor?: boolean;
  subtitle: string;
  onPress?: () => void;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (val: boolean) => void;
  color: string;
  index: number;
}
export default function SettingItem({
  icon: Icon,
  title,
  subtitle,
  onPress,
  hasToggle,
  toggleValue,
  onToggle,
  color = "#FF6B6B",
  isSameColor,
  index,
}: Props) {
  const scale = useSharedValue(1);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!hasToggle) {
      scale.value = withTiming(0.98, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 300, damping: 20 });
  };

  const handleToggle = (value: boolean) => {
    onToggle && onToggle(value);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)}
      style={animatedStyle}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={hasToggle ? 1 : 0.7}
        disabled={hasToggle}
        style={{
          backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
          borderRadius: 16,
          padding: 20,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: `${color}15`,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <Icon size={20} color={color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: isSameColor
                ? color
                : isDark
                ? "rgba(255, 255, 255, 0.9)"
                : "#1F2937",
              marginBottom: subtitle ? 4 : 0,
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontSize: 12,
                color: isDark ? "rgba(255, 255, 255, 0.6)" : "#6B7280",
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {hasToggle ? (
          <Switch
            value={toggleValue}
            onValueChange={handleToggle}
            trackColor={{
              false: isDark ? "#2D2D2D" : "#E5E5EA",
              true: `${color}50`,
            }}
            thumbColor={toggleValue ? color : isDark ? "#8E8E93" : "#FFFFFF"}
            style={{
              transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
            }}
          />
        ) : (
          <ChevronRight
            size={20}
            color={
              isSameColor
                ? color
                : isDark
                ? "rgba(255, 255, 255, 0.4)"
                : "#9CA3AF"
            }
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
