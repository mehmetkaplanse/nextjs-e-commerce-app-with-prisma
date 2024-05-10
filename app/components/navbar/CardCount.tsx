"use client"
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";

const CardCount = () => {
  const {cardProducts} = useCart();
  const cartItemLength = cardProducts ? cardProducts.length : 0

  return (
    <Link href={"/cart"} className='hidden md:flex relative'>
      <FaBasketShopping size={25}/>
      <div className="absolute -top-1 -right-2 bg-orange-900 flex items-center justify-center rounded-full text-xs w-5 h-5">{cartItemLength}</div>
    </Link>
  )
}

export default CardCount