import LayoutHeader from "@/components/layouts/header";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, View } from "react-native";

export default function StorePage() {
  return (
    <View className="flex-1">
      <LayoutHeader title="Informasi Toko" goBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        bounces={false} // iOS
        alwaysBounceVertical={false} // iOS
        overScrollMode="never"
      >
        <VStack className="gap-1">
          <Card>
            <Center>
              <Avatar size="xl">
                <AvatarFallbackText>de</AvatarFallbackText>
              </Avatar>
              <Button variant="link">
                <ButtonText>Ubah Logo</ButtonText>
              </Button>
            </Center>
          </Card>

          <Card>
            <Heading size="md" className="text-gray-600">Informasi Toko</Heading>
          </Card>
        </VStack>
      </ScrollView>
    </View>
  );
}
