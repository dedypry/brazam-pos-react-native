import { colors } from "@/utils/configs/colors";
import { router } from "expo-router";
import { PackagePlus, PackageX } from "lucide-react-native";
import { Box } from "../ui/box";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

interface Props {
  backUrl?: string;
}
export default function ProductEmpty({ backUrl }: Props) {
  return (
    <Center className="flex-1 px-6 pt-24">
      <Box className="items-center gap-4 mb-10">
        <Box className="bg-blue-100 p-5 rounded-full">
          <PackageX size={60} color={colors.primary} />
        </Box>

        <Heading className="text-center">Produk Kosong</Heading>

        <Text className="text-center text-gray-500">
          Belum ada produk yang tersedia. Tambahkan produk untuk mulai
          berjualan.
        </Text>
      </Box>
      <Button
        className="rounded-full"
        onPress={() =>
          router.replace({
            pathname: "/pages/product/add",
            params: {
              backUrl,
            },
          })
        }
      >
        <ButtonIcon as={PackagePlus} />
        <ButtonText>Tambah Produk</ButtonText>
      </Button>
    </Center>
  );
}
