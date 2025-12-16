/* eslint-disable no-unused-expressions */
import { useAppDispatch } from "@/store/hooks";
import { setBarcode } from "@/store/slices/product/product-slice";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";
export default function ScanBarcode() {
  const { id } = useLocalSearchParams();
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

        if (Platform.OS === "ios") {
          router.replace({
            pathname: "/pages/product/add",
            params: { id, barcodeData: data },
          });
        } else {
          router.canGoBack()
            ? router.back()
            : router.replace({
                pathname: "/pages/product/add",
                params: { id, barcodeData: data },
              });
        }
      }}
    />
  );
}
