"use client";
import { ProductWithTotalPrice } from "@/helpers/products";
import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total: number;
  subtotal: number;
  totalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: String) => void;
  increaseProductQuantity: (productId: String) => void;
  removeProductFromCart: (productId: String) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity:  () => {},
  increaseProductQuantity:  () => {},
  removeProductFromCart:  () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);3

  // Total sem desconto
  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice);
    }, 0);
  }, [products])

  //Total com desconto
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice;
    }, 0);
  }, [products])

  // Valor dos descontos
  const totalDiscount = subtotal - total;

  const addProductToCart = (product: CartProduct) => {
    // se o produto já estiver no carrinho, apenas aumente a sua quantidade
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );

      return;
    }

    // se não, adicione o produto à lista
    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductQuantity = (productId: String) => {
    // se a quantidade for 1, remova o produto do carrinho

    // se não diminua a quantidade em 1

    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  };

  const increaseProductQuantity = (productId: String) => {
    // aumenta em 1 a quantidadedo carrinho

    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
            };
          }
          return cartProduct;
        })
    );
  };

  const removeProductFromCart = (productId: String) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id!== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        subtotal,
        total,
        totalDiscount,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
