import { Button, ButtonText } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { setBarcode } from "@/store/slices/product/product-slice";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
export default function ScanBarcode() {
  const [permission, requestPermission] = useCameraPermissions();
  const dispatch = useAppDispatch();
  if (!permission?.granted) {
    return (
      <Button onPress={requestPermission}>
        <ButtonText>Allow Camera</ButtonText>
      </Button>
    );
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      onBarcodeScanned={({ data, type }) => {
        dispatch(setBarcode(data))
        router.back()
      }}
    />
  );
}
