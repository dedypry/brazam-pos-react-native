import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router, withLayoutContext } from "expo-router";
import { Calculator, ChevronLeft, Package } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

import { Text } from "@/components/ui/text";
import { colors } from "@/utils/configs/colors";
import { useTabAnimation } from "@react-navigation/material-top-tabs";
const { Navigator } = createMaterialTopTabNavigator();

const TopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const 
  return (
    <>
      <View className="bg-white pt-16 pb-4 px-5">
        <HStack className="items-center gap-4">
          <TouchableOpacity onPress={() => router.push("/")}>
            <Icon as={ChevronLeft} size="xl" />
          </TouchableOpacity>
          <Heading className="font-semibold">Transaksi Baru</Heading>
        </HStack>
      </View>
      <TopTabs
        onLayout={(e)=>{
          console.log("LAYOUT", e)
        }}
        onTouchMove={()=>{
          console.log("BLUR")
        }}
        onTabSelect={(e)=>{
          console.log("SEL",e)
        }}
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            height: 40,
          },
          sceneStyle: { paddingTop: 10 },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 40,
            borderRadius: 999,
          },
          tabBarStyle: {
            marginTop: 10,
            backgroundColor: colors.white,
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
          tabBarLabel: ({ focused, children }) => {
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
    </>
  );
}
