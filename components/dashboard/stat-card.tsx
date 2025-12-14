import { Card } from "../ui/card";
import { Text } from "../ui/text";

interface Props {
  title: string;
  value: string;
  change: string;
  color: string;
}
export default function StatCard({ title, value, change, color }: Props) {
  return (
    <Card
      className="rounded-2xl mr-2 min-w-36 p-5"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <Text className="text-xs font-semibold uppercase tracking-wider mb-2">
        {title}
      </Text>
      <Text className="text-2xl font-extrabold mb-1">{value}</Text>
      {change && (
        <Text
          className="text-xs font-semibold"
          style={{
            color: color,
          }}
        >
          {change}
        </Text>
      )}
    </Card>
  );
}
