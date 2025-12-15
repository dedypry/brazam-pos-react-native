import { useAppDispatch } from "@/store/hooks";
import { setPhotoProduct } from "@/store/slices/product/product-slice";
import { colors } from "@/utils/configs/colors";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Camera, GalleryThumbnailsIcon, PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { Alert, Linking, TouchableOpacity, View } from "react-native";
import { Card } from "../ui/card";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { CloseIcon, Icon } from "../ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "../ui/modal";

interface Props {
  id?: string;
}
export default function AddCardButton({ id }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  async function handleCamera() {
    if (!permission?.granted) {
      if (permission?.canAskAgain) {
        const result = await requestPermission();

        if (!result.granted) {
          return;
        }
      } else {
        Alert.alert(
          "Camera Permission",
          "Camera access is required. Please enable it in Settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return;
      }
    }

    setShowModal(false);
    router.push({
      pathname: "/pages/product/camera-screen",
      params: { id },
    });
  }

  async function pickFromGallery() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setShowModal(false);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("URI", result.assets[0].uri);
      dispatch(setPhotoProduct(result.assets[0].uri));
      setShowModal(false);
    }
  }

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Ambil Photo Product</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <HStack className="justify-center gap-8 mt-10">
              <TouchableOpacity onPress={pickFromGallery}>
                <Card variant="outline">
                  <Center className="gap-1">
                    <Icon as={GalleryThumbnailsIcon} size="xl" />
                    <Heading>Gallery</Heading>
                  </Center>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCamera}>
                <Card variant="outline">
                  <Center className="gap-1">
                    <Icon as={Camera} size="xl" />
                    <Heading>Camera</Heading>
                  </Center>
                </Card>
              </TouchableOpacity>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          height: 60,
          width: 80,
          borderRadius: 10,
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: colors.secondary,
          borderStyle: "dashed",
        }}
      >
        <View className="bg-gray-200 p-2 rounded-full">
          <Icon as={PlusIcon} />
        </View>
      </TouchableOpacity>
    </>
  );
}
