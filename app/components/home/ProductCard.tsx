"use client"

import textClip from "@/utils/TextClip";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: any }) => {
  const router = useRouter();
  let productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length;

  return (
    <div onClick={()=> router.push(`product/${product.id}`)} className="w-[240px] shadow-lg p-2 cursor-pointer flex flex-col">
      <div className="relative h-[150px] rounded-md">
        <Image
          src={product.image}
          fill
          alt=""
          className="object-contain"
        />
      </div>
      <div className="text-center mt-2">
        <div>{textClip(product.name)}</div>
        <Rating name="read-only" value={productRating} readOnly />
        <div className="text-orange-600 text-lg md:text-xl font-bold">
          {product.price} ₺
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
