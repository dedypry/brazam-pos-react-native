import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { runMigrations } from "@/db/migrate";
import "@/global.css";
import { persistor, store } from "@/store";
import { setupNotificationChannel } from "@/utils/configs/notifucation";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  useEffect(() => {
    setupNotificationChannel();
    Notifications.requestPermissionsAsync();
    runMigrations()
      .then(() => console.log("DB migrated"))
      .catch(console.error);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GluestackUIProvider mode="light">
          <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
              <Stack.Screen
                name="pages/product/scan-barcode"
                options={{
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="product-modal"
                options={{
                  presentation: "modal",
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
