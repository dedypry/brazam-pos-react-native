import { CameraView, useCameraPermissions } from "expo-camera";
import { View } from "react-native";
import { Button, ButtonText } from "./ui/button";

interface Props {
  onScan: (val: string) => void;
}
export default function ScanBarcode({ onScan }: Props) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission?.granted) {
    return (
      <Button onPress={requestPermission}>
        <ButtonText>Allow Camera</ButtonText>
      </Button>
    );
  }
  return (
    <View className="flex-1">
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={({ data }) => onScan(data)}
      />
      <View className="absolute top-10 right-3">
        <Button size="xs">
          <ButtonText>Cari Produk</ButtonText>
        </Button>
      </View>
    </View>
  );
}
