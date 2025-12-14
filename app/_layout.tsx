import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GluestackUIProvider mode={colorScheme as any}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
              <Stack.Screen
                name="product-modal"
                options={{
                  presentation: "modal",
                  headerShown: false,
                  // headerTitle: () => (
                  //   <Text className="text-left text-2xl font-bold flex-1">Add Product</Text>
                  // ),
                  // headerRight: () => (
                  //   <TouchableOpacity>
                  //     <Center className="pl-2">
                  //       <X
                  //         size={24}
                  //         color={
                  //           isDark ? "rgba(255, 255, 255, 0.7)" : "#6B7280"
                  //         }
                  //       />
                  //     </Center>
                  //   </TouchableOpacity>
                  // ),
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
}
