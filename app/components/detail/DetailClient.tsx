"use client";
import Image from "next/image";
import PageContainer from "../containers/PageContainer";
import Counter from "../general/Counter";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import Button from "../general/Button";
import Comment from "./Comment";
import Heading from "../general/Heading";
import { useCart } from "@/hooks/useCart";

export type CardProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
};

const DetailClient = ({ product }: { product: any }) => {
  const { productCardQty, addToBasket, cardProducts } = useCart();
  const [displayButton, setDisplayButton] = useState(false);

  const [cardProduct, setCardProduct] = useState<CardProductProps>({
    id: product?.id,
    name: product?.name,
    description: product?.description,
    price: product?.price,
    quantity: 1,
    image: product?.image,
    inStock: product?.inStock,
  });

  useEffect(() => {
    setDisplayButton(false);
    let controlDisplay: any = cardProducts?.findIndex(
      (cart) => cart.id == product.id
    );
    if (controlDisplay > -1) {
      setDisplayButton(true);
    }
  }, [cardProducts]);
  
  const increaseFunc = () => {
    if (cardProduct.quantity == 10) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };
  const decreaseFunc = () => {
    if (cardProduct.quantity == 1) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  };

  let productRating =
    product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) /
    product?.reviews?.length;

  return (
    <div className="my-10">
      <PageContainer>
        <div className="block md:flex gap-10 justify-center">
          <div className="relative h-[400px] w-[400px]">
            <Image
              src={product?.image}
              fill
              alt=""
            />
          </div>
          <div className="w-full md:w-1/2 space-y-3">
            <div className="text-xl md:text-2xl">{product?.name}</div>
            <Rating name="read-only" value={productRating} readOnly />
            <div className="text-slate-500">{product?.description}</div>
            <div className="flex gap-2">
              <div>STOK DURUMU:</div>
              {product && product.inStock ? (
                <div className="text-green-500">Ürün Stokta Mevcut</div>
              ) : (
                <div className="text-red-500">Ürün Stokta Bulunmamaktadır.</div>
              )}
            </div>
            <div className="text-lg md:text-2xl text-orange-600 font-bold my-3">
              {product?.price} ₺
            </div>
            {displayButton ? (
              <>
                <Counter
                  cardProduct={cardProduct}
                  increaseFunc={increaseFunc}
                  decreaseFunc={decreaseFunc}
                />
                <Button
                  text="Ürün Sepete Ekli"
                  small
                  outline
                  onClick={() => {}}
                />
              </>
            ) : (
              <>
                <Counter
                  cardProduct={cardProduct}
                  increaseFunc={increaseFunc}
                  decreaseFunc={decreaseFunc}
                />
                <Button
                  text="Sepete Ekle"
                  small
                  onClick={() => addToBasket(cardProduct)}
                />
              </>
            )}
          </div>
        </div>
        <Heading text="Yorumlar" />
        <div className="my-4">
          {product?.reviews?.map((prd: any) => (
            <Comment key={prd.id} prd={prd} />
          ))}
        </div>
      </PageContainer>
    </div>
  );
};

export default DetailClient;
