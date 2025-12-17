import FormNumberInput from "@/components/form/number-input";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { db } from "@/db";
import { productsSchema, salesSchema } from "@/db/schema";
import { formatNumber } from "@/utils/helpers/formater";
import { and, eq, InferSelectModel } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { MinusIcon, PlusIcon } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  product: InferSelectModel<typeof productsSchema>;
}
export default function ProductCard({ product }: Props) {
  // const [qty, setQty] = useState(0);
  const { data } = useLiveQuery(
    db.query.salesSchema.findFirst({
      where: (trx, { eq }) =>
        and(eq(trx.productId, product.id), eq(trx.status, "pending")),
    })
  );

  const qty = data?.quantity || 0;
  const stock = product?.stock || 0;
  const totalStock = stock - qty;

  async function handleSetQty(val: number) {
    if (val < 0) return;
    if (val === 0) {
      await db
        .delete(salesSchema)
        .where(
          and(
            eq(salesSchema.productId, product.id),
            eq(salesSchema.status, "pending")
          )
        );
      return;
    }

    // setQty(val);
    const payload: InferSelectModel<typeof salesSchema> = {
      productId: product.id,
      quantity: val,
      price: product.price,
      totalPrice: val * product.price,
      status: "pending",
    } as any;

    if (data) {
      await db
        .update(salesSchema)
        .set(payload as any)
        .where(eq(salesSchema.productId, product.id));
    } else {
      await db.insert(salesSchema).values(payload as any);
    }
  }

  return (
    <Card className="p-0">
      <HStack>
        <Image
          source={{
            uri: product.photos?.[0],
          }}
          className="rounded-md object-cover aspect-square"
        />
        <HStack className="flex-1 items-center gap-2">
          <VStack className="flex-1 ml-3 justify-between">
            <Heading
              className="font-semibold"
              size="sm"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {product.name}
            </Heading>
            <Heading className="font-semibold text-primary-300" size="sm">
              Rp {formatNumber(product.price)}
            </Heading>

            {product.isStock && (
              <Text
                size="xs"
                italic
                className={`${
                  totalStock < 1 ? "text-error-500" : "text-success-500"
                } `}
              >
                Stok : {totalStock}
              </Text>
            )}
          </VStack>
          <View
            style={{
              width: 130,
            }}
          >
            <FormNumberInput
              value={qty.toString()}
              onInput={handleSetQty}
              variant="paded"
              className="rounded-full"
              textAlign="center"
              size="sm"
              prefix={
                <InputSlot>
                  <Button
                    size="xs"
                    className="rounded-full bg-error-300"
                    onPress={() => {
                      handleSetQty(qty - 1);
                    }}
                  >
                    <ButtonIcon as={MinusIcon} />
                  </Button>
                </InputSlot>
              }
              suppix={
                <InputSlot>
                  <Button
                    size="xs"
                    className="rounded-full bg-success-300"
                    onPress={() => {
                      console.log(qty + 1);
                      handleSetQty(qty + 1);
                    }}
                  >
                    <ButtonIcon as={PlusIcon} />
                  </Button>
                </InputSlot>
              }
            />
          </View>
        </HStack>
      </HStack>
    </Card>
  );
}
