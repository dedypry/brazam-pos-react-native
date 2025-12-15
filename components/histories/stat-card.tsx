import { ITrxTodayStat } from "@/utils/interfaces/product";
import { TrendingDown, TrendingUp } from "lucide-react-native";
import { View } from "react-native";
import { Card } from "../ui/card";
import { Text } from "../ui/text";

export default function StatCard({
  title,
  value,
  change,
  isPositive,
}: ITrxTodayStat) {

  return (
    <Card className="rounded-xl p-5 mr-2 min-w-36">
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
