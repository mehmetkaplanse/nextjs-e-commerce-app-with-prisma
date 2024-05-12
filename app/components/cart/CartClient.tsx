import React from "react";
import PageContainer from "../containers/PageContainer";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Button from "../general/Button";
import { CardProductProps } from "../detail/DetailClient";
import Counter from "../general/Counter";

const CartClient = () => {
  const {
    cardProducts,
    removeFromBasket,
    removeCart,
    addToBasketIncrease,
    addToBasketDecrease,
  } = useCart();

  if (!cardProducts || cardProducts.length == 0) {
    return (
      <div className="flex items-center justify-center font-semibold text-lg mt-4">
        Sepetinizde ürün bulunmamaktadır.
      </div>
    );
  }

  let cardProductsTotal = cardProducts.reduce(
    (acc: any, item: CardProductProps) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="my-4">
      <PageContainer>
        <div className="flex items-center gap-3 text-center font-semibold border-b py-3">
          <div className="w-1/5">Ürün Resmi</div>
          <div className="w-1/5">Ürün Adı</div>
          <div className="w-1/5">Ürün Miktarı</div>
          <div className="w-1/5">Ürün Fiyatı</div>
          <div className="w-1/5">Kaldır</div>
        </div>
        <div className="py-3">
          {cardProducts.map((cart) => (
            <div
              key={cart.id}
              className="flex items-center justify-between text-center mb-2"
            >
              <div className="w-1/5 flex items-center justify-center max-h-[200px}">
                <Image
                  src={
                    cart?.image
                  }
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
              <div className="w-1/5">{cart.name}</div>
              <div className="w-1/5 flex items-center justify-center">
                <Counter
                  cardProduct={cart}
                  increaseFunc={() => {
                    addToBasketIncrease(cart);
                  }}
                  decreaseFunc={() => {addToBasketDecrease(cart)}}
                />
              </div>
              <div className="w-1/5">{cart.price} ₺</div>
              <div className="w-1/5">
                <Button
                  text="Ürünü Kaldır"
                  outline
                  onClick={() => removeFromBasket(cart)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between my-5 py-5 border-t">
          <button className="text-sm underline" onClick={removeCart}>
            Sepeti Sil
          </button>
          <div className="text-lg md:text-xl font-bold text-orange-600">
            {cardProductsTotal} ₺
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default CartClient;
