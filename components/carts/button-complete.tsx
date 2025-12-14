import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCart } from "@/store/slices/cart/cart-slice";
import { LinearGradient } from "expo-linear-gradient";
import { CreditCard } from "lucide-react-native";
import { Alert, TouchableOpacity, useColorScheme, View } from "react-native";
import { Text } from "../ui/text";

export default function ButtonComplete() {
  const { carts } = useAppSelector((state) => state.cart);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const dispatch = useAppDispatch();

  const calculateSubtotal = () => {
    return carts.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    if (carts.length === 0) {
      Alert.alert("Empty Cart", "Please add items to cart before proceeding");
      return;
    }

    Alert.alert(
      "Complete Sale",
      `Total: $${calculateTotal().toFixed(2)}\n\nProceed with payment?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Complete",
          style: "default",
          onPress: () => {
            dispatch(setCart([]));
            Alert.alert("Sale Completed!", "Payment successful");
          },
        },
      ]
    );
  };

  if (carts.length === 0) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: isDark ? "#121212" : "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: isDark ? "rgba(255, 255, 255, 0.1)" : "#E5E7EB",
        paddingHorizontal: 24,
        paddingTop: 20,
      }}
    >
      <View style={{ marginBottom: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: isDark ? "rgba(255, 255, 255, 0.6)" : "#6B7280",
            }}
          >
            Subtotal
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: isDark ? "rgba(255, 255, 255, 0.9)" : "#1F2937",
            }}
          >
            Rp {calculateSubtotal().toFixed(2)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: isDark ? "rgba(255, 255, 255, 0.6)" : "#6B7280",
            }}
          >
            Tax (8%)
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: isDark ? "rgba(255, 255, 255, 0.9)" : "#1F2937",
            }}
          >
            Rp {calculateTax().toFixed(2)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: isDark ? "rgba(255, 255, 255, 0.1)" : "#E5E7EB",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: isDark ? "rgba(255, 255, 255, 0.9)" : "#1F2937",
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#45B7D1",
            }}
          >
            Rp {calculateTotal().toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleCheckout}>
        <LinearGradient
          colors={["#10B981", "#34D399"]}
          style={{
            paddingVertical: 16,
            borderRadius: 16,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CreditCard size={20} color="white" style={{ marginRight: 8 }} />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Complete Sale
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
