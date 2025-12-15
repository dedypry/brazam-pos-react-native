import * as yup from "yup";

export const createProductSchema = yup.object({
  photos: yup.array().min(1).required("Photo Product Wajib diisi"),
  name: yup.string().required("Nama Product wajib diisi"),
  price: yup.string().required("Harga Product wajib diisi"),
  modal: yup.string().optional(),
  category: yup.string().optional(),
  uom: yup.string().optional(),
  description: yup.string().optional(),
  is_stock: yup.bool().default(false),
  is_product_show: yup.bool().default(true),
  stock: yup.string().when("is_stock", {
    is: true,
    then: (schema) => schema.required("Stok Product wajib diisi"),
    otherwise: (schema) => schema.optional(),
  }),
  sku: yup.string(),
  barcode: yup.string(),
});
