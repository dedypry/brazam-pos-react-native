import FilterCategory from "@/components/filter-categories";
import HeaderTitle from "@/components/header-title";
import StatCard from "@/components/histories/stat-card";
import TransactionCard from "@/components/histories/transaction-card";
import SearchBar from "@/components/search-bar";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSearchQuery,
  setSelectedFilter,
} from "@/store/slices/transaction/transaction-slice";
import { Receipt } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, useColorScheme, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

export default function HistoryTab() {
  const { todayStats, filters, selectedFilter, transactions, searchQuery } =
    useAppSelector((state) => state.transaction);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const scrollY = useSharedValue(0);
  const [isGrey, setIsGrey] = useState(false);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      console.log("SCROLL", e.contentOffset.y);
      scrollY.value = e.contentOffset.y;

      runOnJS(setIsGrey)(scrollY.value > 257);
    },
  });

  const dispatch = useAppDispatch();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.includes(searchQuery) ||
      (transaction?.customer &&
        transaction?.customer
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase()));

    if (selectedFilter === "all") return matchesSearch;

    const transactionDate = new Date(transaction.date);
    const now = new Date();

    if (selectedFilter === "today") {
      return (
        matchesSearch && transactionDate.toDateString() === now.toDateString()
      );
    }
    if (selectedFilter === "week") {
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return matchesSearch && transactionDate >= weekStart;
    }
    if (selectedFilter === "month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return matchesSearch && transactionDate >= monthStart;
    }

    return matchesSearch;
  });

  const heightStyle = useAnimatedStyle(() => {
    const paddingTop = interpolate(
      scrollY.value,
      [140, 170],
      [0, 30],
      Extrapolation.CLAMP
    );

     const color = interpolateColor(
       scrollY.value,
       [280, 315],
       ["#ffffff", "#05A0C0"]
     );

    return {
      paddingTop,
      backgroundColor: color,
    };
  });

  const topStyle = useAnimatedStyle(() => {
    const top = interpolate(
      scrollY.value,
      [200, 325],
      [0, -120],
      Extrapolation.CLAMP
    );
    const color = interpolateColor(
      scrollY.value,
      [280, 315],
      ["#ffffff", "#05A0C0"]
    );

    return { top, backgroundColor: color };
  });

  const colorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollY.value,
      [280, 321],
      ["transparent", "#05A0C0"]
    );

    return { backgroundColor: color };
  });
  return (
    <>
      <Animated.View
        className="pt-14 pb-4 absolute w-full z-30"
        style={topStyle}
      >
        <HeaderTitle
          title="Transaction History"
          subtitle="5 total transactions"
        />
      </Animated.View>
      <Animated.View style={heightStyle} />
      <Animated.ScrollView
        onScroll={onScroll}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        contentContainerStyle={{
          paddingTop: 120,

        }}
      >
        
        <View className="pt-5">
          <Text
            className="pl-5"
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: isDark ? "rgba(255, 255, 255, 0.9)" : "#1F2937",
              marginBottom: 16,
            }}
          >
            Today&apos;s Performance
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 10,
              paddingBottom: 5,
              paddingLeft: 20,
            }}
          >
            {todayStats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </ScrollView>
        </View>
        <View>
          <Animated.View style={colorStyle}>
            <VStack className="px-5 gap-1 pt-5 pb-2">
              <SearchBar
                value={searchQuery}
                onChangeText={(val) => dispatch(setSearchQuery(val))}
                placeholder="Search by transaction ID or customer..."
                className="bg-white"
              />
              <FilterCategory
                data={filters}
                selected={selectedFilter}
                setSelected={(val) => dispatch(setSelectedFilter(val.id))}
              />
            </VStack>
          </Animated.View>
        </View>

        <VStack className="mt-5 px-5">
          <Text className="text-xl font-bold mb-3">Recent Transactions</Text>

          {filteredTransactions.length === 0 ? (
            <Center>
              <Receipt
                size={64}
                color={isDark ? "rgba(255, 255, 255, 0.3)" : "#D1D5DB"}
              />
              <Text className="text-lg font-semibold mt-4 mb-2">
                No transactions found
              </Text>
              <Text className="text-center text-sm">
                Try adjusting your search or filter criteria
              </Text>
            </Center>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                index={index}
              />
            ))
          )}
        </VStack>
      </Animated.ScrollView>
    </>
  );
}
