import ActionTile from "@/components/action-tile";
import StatCard from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { colors } from "@/utils/configs/colors";
import { getGreeting } from "@/utils/helpers/greeting";
import { router } from "expo-router";
import {
  BarChart3,
  CreditCard,
  CrownIcon,
  Package,
  Settings,
  Users,
} from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const quickActions = [
    {
      title: "Kasir",
      subtitle: "Mulai Transaksi",
      icon: CreditCard,
      gradient: ["#FF6B6B", "#FF8E8E"],
      onPress: () => router.push("/pages/transaction"),
      large: true,
    },
    {
      title: "Products",
      subtitle: "Manage inventory",
      icon: Package,
      gradient: ["#4ECDC4", "#44A08D"],
      onPress: () => router.push("/(tabs)/products"),
    },
    {
      title: "Reports",
      subtitle: "View analytics",
      icon: BarChart3,
      gradient: ["#45B7D1", "#96C93D"],
      onPress: () => {},
    },
    {
      title: "Customers",
      subtitle: "Manage clients",
      icon: Users,
      gradient: ["#96CEB4", "#FFEAA7"],
      onPress: () => {},
    },
    {
      title: "Settings",
      subtitle: "App preferences",
      icon: Settings,
      gradient: ["#FECA57", "#FF9FF3"],
      onPress: () => router.push("/(tabs)/settings"),
    },
  ];

  const todayStats = [
    {
      title: "Today's Sales",
      value: "$2,847",
      change: "+12.5%",
      color: "#10B981",
    },
    {
      title: "Transactions",
      value: "47",
      change: "+8.2%",
      color: "#10B981",
    },
    {
      title: "Items Sold",
      value: "183",
      change: "+15.7%",
      color: "#10B981",
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack className="pt-20 px-5 pb-10">
        <HStack className="justify-between">
          <VStack>
            <Text className="text-3xl font-bold">{getGreeting()}</Text>
            <Text>Welcome Back</Text>
          </VStack>
          <View>
            <Center className="bg-primary-500 px-4 py-1 rounded-full">
              <HStack className="gap-2 items-center">
                <CrownIcon color={colors.white} size={14} />
                <Text className="text-white text-[14px]">Premium</Text>
              </HStack>
            </Center>
          </View>
        </HStack>
        <Text className="text-2xl font-bold mt-5">Quict Action</Text>
        <View className="mb-4 mt-2">
          <ActionTile {...(quickActions[0] as any)} />
        </View>

        <Grid className="gap-2" _extra={{ className: "grid-cols-2" }}>
          {quickActions.slice(1).map((action, index) => (
            <GridItem key={index} _extra={{ className: "col-span-1" }}>
              <ActionTile {...(action as any)} />
            </GridItem>
          ))}
        </Grid>

        <View className="mt-5">
          <Text className="text-2xl font-bold">Today&apos;s Overview</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 5,
              paddingLeft: 5,
            }}
          >
            {todayStats.map((stat, i) => (
              <StatCard key={i} {...(stat as any)} />
            ))}
          </ScrollView>
        </View>

        <View className="mt-5">
          <Text className="text-2xl font-bold mb-2">Recent Activity</Text>

          <Card className="rounded-md">
            {[
              { time: "2:30 PM", action: "Sale completed", amount: "$45.50" },
              {
                time: "1:15 PM",
                action: "Product added",
                amount: "Coffee Beans",
              },
              { time: "12:45 PM", action: "Sale completed", amount: "$23.75" },
            ].map((item, i) => (
              <View key={i}>
                <HStack className="justify-between items-end">
                  <VStack>
                    <Text className="text-xl font-semibold">{item.action}</Text>
                    <Text>{item.time}</Text>
                  </VStack>
                  <Text className="text-lg">{item.amount}</Text>
                </HStack>
                <Divider className="my-2" />
              </View>
            ))}
          </Card>
        </View>
      </VStack>
    </ScrollView>
  );
}
