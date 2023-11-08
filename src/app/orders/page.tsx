import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Badge } from "@/components/ui/badge";
import { PackageSearchIcon } from "lucide-react";
import { prismaClient } from "@/lib/prisma";
import OrderItem from "./components/order-item";

export const dynamic = "force-dynamic";

async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="mt-8">Acesso negado.</p>
        <p>Faça o login para ter acesso!</p>
      </div>
    );
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return (
    <div className="p-5">
      <Badge
        className=" w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PackageSearchIcon size={16} />
        Meus Pedidos
      </Badge>
      {orders.length === 0 ? (
        <p className="mt-5 flex flex-col gap-5">Você ainda não fez nenhuma compra, vamos às compras?</p>
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderPage;
