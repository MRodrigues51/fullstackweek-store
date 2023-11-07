import { computeProductTotalPrice } from "@/helpers/products";
import { OrderProduct, Prisma, Product } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const ProductWithTotalPrice = computeProductTotalPrice(orderProduct.product);
  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
          alt={orderProduct.product.name}
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <div className="flex bg-accent px-3 py-1 w-fit rounded-md">
          <p className="text-[10px]">
            Vendido e entregue por<span className="font-bold">FSW Store</span>
          </p>
        </div>
        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex items-center w-full gap-1 justify-between">
            <div className="flex items-center gap-1">
            <p className="text-sm font-bold">
            R$ {ProductWithTotalPrice.totalPrice.toFixed(2)}
          </p>

          {ProductWithTotalPrice.discountPercentage > 0 && (
            <p className="text-xs line-through opacity-60">
              R$ {Number(ProductWithTotalPrice.basePrice).toFixed(2)}
            </p>
          )}
            </div>
          <p className="text-xs opacity-60">Qntd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
