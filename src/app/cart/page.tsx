"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { handleCheckout } from "@/services/handleCheckout.service";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-gray-800 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div
            className="flex items-center justify-between mb-4 shadow-lg px-4 py-2 rounded-lg"
            key={item.id}
          >
            {item.img && (
              <Image src={item.img} alt="" width={100} height={100} />
            )}
            <div className="">
              <h1 className="uppercase text-xl font-bold">
                {item.title} x{item.quantity}
              </h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">${item.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(item)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-amber-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-30 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">${totalPrice}</span>
        </div>
        <button
          className="bg-amber-700 text-white p-3 rounded-md w-1/2 self-end"
          onClick={()=>handleCheckout({session, totalPrice, products})}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
