import HeaderTitle from "@/components/header-title";
import SettingItem from "@/components/settings/setting-item";
import SettingSection from "@/components/settings/setting-section";
import {
  Bell,
  CreditCard,
  DollarSign,
  Globe,
  HelpCircle,
  LogOut,
  Printer,
  Receipt,
  Store,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, useColorScheme, View } from "react-native";

export default function SettingTab() {
  const [notifications, setNotifications] = useState(true);
  const [autoPrint, setAutoPrint] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <>
      <View className="pt-14 pb-4 bg-white">
        <HeaderTitle title="Settings" subtitle="Configure your POS system" />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 mt-5">
          <SettingSection title="Store">
            <SettingItem
              icon={Store}
              title="Store Information"
              subtitle="Business name, address, tax settings"
              color="#FF6B6B"
              onPress={() => {}}
              index={0}
            />
            <SettingItem
              icon={CreditCard}
              title="Payment Methods"
              subtitle="Configure accepted payment types"
              color="#4ECDC4"
              onPress={() => {}}
              index={1}
            />
            <SettingItem
              icon={Printer}
              title="Receipt Printer"
              subtitle="Setup and test receipt printing"
              color="#45B7D1"
              onPress={() => {}}
              index={2}
            />
          </SettingSection>
          <SettingSection title="Preferences">
            <SettingItem
              icon={Bell}
              title="Notifications"
              subtitle="Receive alerts and updates"
              color="#96CEB4"
              hasToggle={true}
              toggleValue={notifications}
              onToggle={setNotifications}
              index={3}
            />
            <SettingItem
              icon={Receipt}
              title="Auto Print Receipts"
              subtitle="Automatically print after each sale"
              color="#FECA57"
              hasToggle={true}
              toggleValue={autoPrint}
              onToggle={setAutoPrint}
              index={4}
            />
            <SettingItem
              icon={Globe}
              title="Sound Effects"
              subtitle="Play sounds for interactions"
              color="#FF8E8E"
              hasToggle={true}
              toggleValue={soundEnabled}
              onToggle={setSoundEnabled}
              index={5}
            />
            <SettingItem
              icon={DollarSign}
              title="Haptic Feedback"
              subtitle="Vibration for button presses"
              color="#B8A2E8"
              hasToggle={true}
              toggleValue={hapticEnabled}
              onToggle={setHapticEnabled}
              index={6}
            />
          </SettingSection>

          {/* Support */}
          <SettingSection title="Support">
            <SettingItem
              icon={HelpCircle}
              title="Help & Support"
              subtitle="Get assistance and tutorials"
              color="#9775FA"
              onPress={() => {}}
              index={10}
            />
          </SettingSection>

          {/* Account Actions */}
          <SettingSection title="Account">
            <SettingItem
              icon={LogOut}
              title="Sign Out"
              subtitle="Sign out of your account"
              color="#EF4444"
              onPress={() => {}}
              index={10}
              isSameColor
            />
          </SettingSection>
        </View>
      </ScrollView>
    </>
  );
}
