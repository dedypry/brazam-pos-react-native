import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { Barcode, Calculator, Package } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

import LayoutHeader from "@/components/layouts/header";
import { Text } from "@/components/ui/text";
import { colors } from "@/utils/configs/colors";
import { useState } from "react";
const { Navigator } = createMaterialTopTabNavigator();

const TopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const [isBarcode, setIsBarcode] = useState(true);
  return (
    <View className="bg-white flex-1">
      <LayoutHeader
        title="Transaksi Baru"
        actions={
          isBarcode ? (
            <TouchableOpacity>
              <HStack className="bg-primary-500 px-3 py-1 rounded-md gap-2">
                <Icon as={Barcode} className="text-white" />
                <Text className="text-white" size="sm">
                  Scan Barcode
                </Text>
              </HStack>
            </TouchableOpacity>
          ) : (
            <View />
          )
        }
      />
      <TopTabs
        onTabSelect={({ index }) => setIsBarcode(index === 0)}
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            height: 40,
          },

          sceneStyle: { paddingTop: 10, backgroundColor: "white" },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 40,
            borderRadius: 999,
          },
          tabBarStyle: {
            marginTop: 10,
            backgroundColor: colors.tonalPrimary,
            marginHorizontal: 16,
            borderRadius: 100,
            height: 40,
          },
          tabBarItemStyle: {
            borderRadius: 999,
            height: 40,
          },
          tabBarIndicatorContainerStyle: {
            height: 40,
          },
          tabBarLabel: ({ focused, children, color }) => {
            return (
              <HStack className="gap-2">
                <Icon
                  as={children === "Product" ? Package : Calculator}
                  color={focused ? "#fff" : "#000"}
                />
                <Text
                  style={{
                    color: focused ? "#fff" : "#000",
                    fontSize: 14,
                    fontWeight: "600",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {children}
                </Text>
              </HStack>
            );
          },
        }}
      >
        <TopTabs.Screen
          name="index"
          options={{
            title: "Product",
          }}
        />
        <TopTabs.Screen name="input" options={{ title: "Kalkulator" }} />
      </TopTabs>
    </View>
  );
}
