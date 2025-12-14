import { ITrxTodayStat } from "@/utils/interfaces/product";
import { TrendingDown, TrendingUp } from "lucide-react-native";
import { useColorScheme, View } from "react-native";
import { Card } from "../ui/card";
import { Text } from "../ui/text";

export default function StatCard({
  title,
  value,
  change,
  isPositive,
}: ITrxTodayStat) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Card
      className="rounded-xl p-5 mr-2 min-w-36"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <Text className="text-xs font-semibold mb-2 uppercase tracking-wider">
        {title}
      </Text>
      <Text className="text-2xl font-extrabold mb-1">{value}</Text>
      {change && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isPositive ? (
            <TrendingUp size={14} color="#10B981" />
          ) : (
            <TrendingDown size={14} color="#EF4444" />
          )}
          <Text
            className={`text-xs font-semibold ml-1 ${
              isPositive ? "text-success-500" : "text-error-500"
            }`}
          >
            {change}
          </Text>
        </View>
      )}
    </Card>
  );
}
