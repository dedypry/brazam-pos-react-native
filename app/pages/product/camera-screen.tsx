import { Center } from "@/components/ui/center";
import { useAppDispatch } from "@/store/hooks";
import { setPhotoProduct } from "@/store/slices/product/product-slice";
import { CameraType, CameraView } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const cameraRef = useRef<CameraView>(null);
  const [facing] = useState<CameraType>("back");

  console.log("ID", id);

  const dispatch = useAppDispatch();

  async function takePhoto() {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    dispatch(setPhotoProduct(photo.uri));
    router.replace({
      pathname: "/pages/product/add",
      params: { id, cameraBack: 1 },
    });
  }
  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View className="absolute bottom-3 w-full pb-4">
        <TouchableOpacity onPress={takePhoto}>
          <Center>
            <View className="bg-white w-20 aspect-square rounded-full shadow-md" />
          </Center>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
