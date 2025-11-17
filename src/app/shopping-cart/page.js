import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CustomImage from "@/components/ui/CustomImage";
import DeleteIcon from '@mui/icons-material/Delete';

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { navBarHeight, currency } from "@/lib/constants";

const shoppinCart = {
  "status": "Success",
  "message": "Cart retrieved successfully.",
  "numOfCartItems": 4,
  "data": {
    "pricing": {
      "taxPrice": 1.5,
      "shippingPrice": 18.09,
      "totalPrice": 1437.69
    },
    "_id": "687f6d13e7edaf8590e0875b",
    "user": "687e7ae139f3a907748951d0",
    "cartItems": [
      {
        "product": {
          "_id": "66edd0436e8a94698691fca9",
          "title": "Vibrant Orange, Red & Green Sweatshirt - Bold & Stylish",
          "price": 80.55,
          "imageCover": "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-4e552e72-0966-45d6-b662-6ca229f045d0-1726931185644.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20251116%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20251116T141347Z&X-Amz-Expires=3600&X-Amz-Signature=079a6999f06f9fee566761075705e69de2b466f98a12b7e59fb38fbde4756560&X-Amz-SignedHeaders=host&x-id=GetObject",
          "quantity": 5,
          "sizes": [],
          "priceBeforeDiscount": 129,
          "discountPercent": 38,
          "id": "66edd0436e8a94698691fca9"
        },
        "quantity": 2,
        "price": 80.55,
        "totalPrice": 161.1,
        "_id": "6919dba58d258d96d555a53b",
        "createdAt": "2025-11-16T14:11:49.188Z",
        "updatedAt": "2025-11-16T14:12:06.143Z"
      },
      {
        "product": {
          "_id": "6725ea74d9b29f39c24dd7ef",
          "title": "People Print Men's Short Sleeve",
          "imageCover": "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-841bda43-7ed7-46f5-b8d5-47a2d135ba79-1730538097307.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20251116%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20251116T141347Z&X-Amz-Expires=3600&X-Amz-Signature=e116ef278bddc4da559e6773bac68e4baf9ffb012230441dd653cf63b7b22f88&X-Amz-SignedHeaders=host&x-id=GetObject",
          "sizes": [
            {
              "size": "s",
              "quantity": 27,
              "price": 179,
              "priceBeforeDiscount": 299,
              "discountPercent": 40,
              "_id": "6725ea74d9b29f39c24dd7f0"
            },
            {
              "size": "m",
              "quantity": 90,
              "price": 199,
              "priceBeforeDiscount": 299,
              "discountPercent": 33,
              "_id": "6725ea74d9b29f39c24dd7f1"
            },
            {
              "size": "l",
              "quantity": 28,
              "price": 189,
              "priceBeforeDiscount": 259,
              "discountPercent": 27,
              "_id": "6725ea74d9b29f39c24dd7f2"
            }
          ],
          "price": 179,
          "priceBeforeDiscount": 299,
          "discountPercent": 40,
          "quantity": 27,
          "id": "6725ea74d9b29f39c24dd7ef"
        },
        "quantity": 3,
        "size": "s",
        "price": 179,
        "totalPrice": 537,
        "_id": "6919db92352e41800e67ff14",
        "createdAt": "2025-11-16T14:11:30.325Z",
        "updatedAt": "2025-11-16T14:11:30.325Z"
      },
      {
        "product": {
          "_id": "66fea802a15f5cf6cca377c8",
          "title": "Men's Casual Hoodie with Creative Print – Comfy Pullover, Drawstring & Kangaroo Pocket",
          "price": 110,
          "priceBeforeDiscount": 150,
          "discountPercent": 27,
          "imageCover": "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a2ac70ba-66f8-4fc9-ab65-1db6883bbd01-1731780637100.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20251116%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20251116T141347Z&X-Amz-Expires=3600&X-Amz-Signature=59502acc85f5320dcfda53db6237d864bea0837936455270f34c1548a8f93a36&X-Amz-SignedHeaders=host&x-id=GetObject",
          "quantity": 11,
          "sizes": [
            {
              "size": "m",
              "quantity": 29,
              "price": 120,
              "priceBeforeDiscount": 150,
              "discountPercent": 20,
              "_id": "67264c8dc1cf4bce9c8f9890"
            },
            {
              "size": "xl",
              "quantity": 50,
              "price": 120,
              "priceBeforeDiscount": 180,
              "discountPercent": 33,
              "_id": "67264c8dc1cf4bce9c8f9891"
            },
            {
              "size": "xxl",
              "quantity": 11,
              "price": 110,
              "priceBeforeDiscount": 150,
              "discountPercent": 27,
              "_id": "67264c8dc1cf4bce9c8f9892"
            }
          ],
          "id": "66fea802a15f5cf6cca377c8"
        },
        "quantity": 2,
        "size": "xxl",
        "price": 110,
        "totalPrice": 220,
        "_id": "6919db884c06378b37fdeed8",
        "createdAt": "2025-11-16T14:11:20.650Z",
        "updatedAt": "2025-11-16T14:11:20.650Z"
      },
      {
        "product": {
          "_id": "66eefa2696ab35f23ac0f6c5",
          "title": "Men's Stylish Black Puffer Jacket with Contrast Gray Hood",
          "price": 500,
          "priceBeforeDiscount": 899,
          "imageCover": "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-33479e15-2e3e-4fb0-92d6-06b1627db302-1726937761401.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20251116%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20251116T141347Z&X-Amz-Expires=3600&X-Amz-Signature=a72e9ede64f5e770de9067c276cf09b87313dfeb069ab73e149858ddca6d0a13&X-Amz-SignedHeaders=host&x-id=GetObject",
          "quantity": 36,
          "sizes": [],
          "color": "black",
          "discountPercent": 44,
          "id": "66eefa2696ab35f23ac0f6c5"
        },
        "quantity": 1,
        "color": "black",
        "price": 500,
        "totalPrice": 500,
        "_id": "6919db7a80a563277a0417c5",
        "createdAt": "2025-11-16T14:11:06.135Z",
        "updatedAt": "2025-11-16T14:11:06.135Z"
      }
    ],
    "createdAt": "2025-07-22T10:50:59.377Z",
    "updatedAt": "2025-11-16T14:12:06.143Z",
    "__v": 46,
    "idOfRedisBullMqJob": "8"
  }
}

function ItemCard({ item }) {
  const { _id, title, imageCover } = item.product;

  const des = [
    item.quantity !== undefined && `Quantity: ${item.quantity}`,
    item.price !== undefined && `Price: ${item.price}`,
    item.size !== undefined && `Size: ${String(item.size).toUpperCase()}`,
    item.color !== undefined && `Color: ${item.color}`,
  ].filter(Boolean).join(" / ");

  const totalPrice = item.totalPrice.toFixed(2).replace(".", ",");

  const quantity = item.quantity;

  return (
    <div className="relative grid grid-cols-[auto_1fr] bg-background shadow-md rounded-md overflow-hidden group">
      <Link href={`/product/${_id}`}>
        <CustomImage
          src={imageCover}
          fallback="/images/product-placeholder.png"
          width={500}
          height={690}
          alt={""}
          priority
          className="w-28 md:w-32 p-1.5 bg-background cursor-pointer"
        />
      </Link>

      <div className="p-1.5 flex flex-col gap-1.5">
        <Link href={`/product/${_id}`}>
          <h1 className="w-[calc(100%-24px)] font-semibold line-clamp-1 group-hover:text-primary group-hover:underline cursor-pointer">
            {title}
          </h1>
        </Link>

        <p className="text-sm line-clamp-1">
          {des}
        </p>

        <p className="text-lg font-semibold text-primary">
          {totalPrice} {currency}
        </p>

        <div className="mt-auto self-end flex items-center gap-0.5 w-fit p-0.5 border border-border rounded-sm">
          <button className="p-1 flex items-center rounded-sm cursor-pointer hover:bg-background-secondary active:bg-background-tertiary">
            <RemoveIcon fontSize="small" />
          </button>

          <div className="text-sm py-1 px-3 flex items-center border border-border rounded-sm select-none">
            {quantity}
          </div>

          <button className="p-1 flex items-center rounded-sm cursor-pointer hover:bg-background-secondary active:bg-background-tertiary">
            <AddIcon fontSize="small" />
          </button>
        </div>

        <div className="absolute top-1.5 right-1.5 bg-background cursor-pointer hover-scale">
          <DeleteIcon className="text-red-500" />
        </div>
      </div>
    </div>
  )
}

function OrderSummary() {
  return (
    <div className="grid gap-3 p-1.5 bg-background rounded-md shadow-md">
      <h1 className="font-semibold text-lg">
        ORDER SUMMARY
      </h1>

      <div className="grid grid-cols-[1fr_auto] gap-1.5">
        <Input placeholder="Coupon code" size="small" />
        <Button size="small" className="px-2" >
          Apply
        </Button>
      </div>

      <div className="grid gap-1.5">
        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Tax Price:
          </span>
          <span className="font-semibold text-primary">
            1,50 {currency}
          </span>
        </div>

        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Shipping Price:
          </span>
          <span className="font-semibold text-primary">
            18,09 {currency}
          </span>
        </div>

        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Total Price:
          </span>
          <span className="font-semibold text-primary">
            3519,59 {currency}
          </span>
        </div>

        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Price After Discount:
          </span>
          <span className="font-semibold text-primary">
            3519,59 {currency}
          </span>
        </div>

        <div className="w-full h-0.5 my-1.5 bg-primary" />

        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Coupon Code:
          </span>
          <span className="font-semibold text-primary">
            0000,00 {currency}
          </span>
        </div>

        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Coupon Discount:
          </span>
          <span className="font-semibold text-primary">
            0000,00 {currency}
          </span>
        </div>

        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Discounted Amount:
          </span>
          <span className="font-semibold text-primary">
            0000,00 {currency}
          </span>
        </div>

        <Button>
          Checkout {`(${4})`}
        </Button>
      </div>
    </div>
  )
}

export default function ShoppingCCartPage() {
  return (
    <div className="min-h-screen-minus-header bg-background-secondary">
      <div className="container">
        <div className="py-3 lg:py-6">
          <h1 className="text-2xl pb-3 font-medium capitalize">
            Shopping cart
          </h1>

          <div className="grid lg:grid-cols-[65%_35%] xl:grid-cols-[70%_30%] gap-3">
            <div className="flex flex-col gap-3">
              {
                shoppinCart.data.cartItems.map((item) => {
                  return (
                    <ItemCard key={item._id} item={item} />
                  )
                })
              }
            </div>

            <div className={`hidden lg:block sticky top-0 lg:top-[calc(${navBarHeight}+12px)] h-fit`}>
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
