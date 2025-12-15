import { useAppDispatch } from "@/store/hooks";
import { setBarcode } from "@/store/slices/product/product-slice";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
export default function ScanBarcode() {
  const [permission, requestPermission] = useCameraPermissions();
  const dispatch = useAppDispatch();
  if (!permission?.granted) {
    requestPermission();
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      onBarcodeScanned={({ data, type }) => {
        dispatch(setBarcode(data));
        router.back();
      }}
    />
  );
}
