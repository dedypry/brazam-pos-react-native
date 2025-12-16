import { colors } from "@/utils/configs/colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Button, ButtonText } from "./ui/button";
import { Center } from "./ui/center";
import { CloseIcon, Icon } from "./ui/icon";

interface Props {
  onScan: (val: string) => void;
  onClose?: () => void;
}
export default function ScanBarcode({ onScan, onClose }: Props) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission?.granted) {
    requestPermission();
  }
  return (
    <View className="flex-1">
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={({ data }) => onScan(data)}
      />
      <View className="absolute top-10 w-full justify-between flex-row px-5">
        <TouchableOpacity
          onPress={onClose}
          className="bg-white shadow-sm rounded-full p-2"
        >
          <Icon as={CloseIcon} />
        </TouchableOpacity>
        <Button size="xs" onPress={() => router.push("/product-modal")}>
          <ButtonText>Cari Produk</ButtonText>
        </Button>
      </View>

      <View className="absolute top-10 w-full h-full px-10 py-10">
        <Center className="flex-1 pb-3">
          <View
            className="w-full h-full rounded-md"
            style={{
              borderWidth: 1,
              borderColor: colors.white,
            }}
          />
        </Center>
      </View>
    </View>
  );
}
