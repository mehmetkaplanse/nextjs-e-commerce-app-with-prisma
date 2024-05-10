"use client"
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartContextProps {
    productCardQty: number
    cardProducts: CardProductProps[] | null
    addToBasket: (product: CardProductProps) => void;
    removeFromBasket: (product: CardProductProps) => void;
    removeCart: () => void;
    addToBasketIncrease: (product: CardProductProps) => void;
    addToBasketDecrease: (product: CardProductProps) => void;
}

const CartContext = createContext<CartContextProps | null>(null)

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [productCardQty, setProductCardQty] = useState(0)
    const [cardProducts, setCardProducts] = useState<CardProductProps[] | null>(null)

    useEffect(() => {
        let getItem: any = localStorage.getItem('cart')
        let getItemParse: CardProductProps[] | null = JSON.parse(getItem)
        setCardProducts(getItemParse)
    },[])

    const addToBasketDecrease = useCallback((product: CardProductProps) => {
        let updatedCart;
        if(product.quantity == 1) return
        if(cardProducts) {
            updatedCart = [...cardProducts]
            const existingItem = cardProducts.findIndex(item => item.id === product.id)
            // really exist item
            if(existingItem > -1) {
                updatedCart[existingItem].quantity = --updatedCart[existingItem].quantity
            }
            setCardProducts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        }
    },[cardProducts])

    const addToBasketIncrease = useCallback((product: CardProductProps) => {
        let updatedCart;
        if(product.quantity == 10) {
            return toast.error("Daha fazla ekleyemezsin!")
        }
        if(cardProducts) {
            updatedCart = [...cardProducts]
            const existingItem = cardProducts.findIndex(item => item.id === product.id)
            // really exist item
            if(existingItem > -1) {
                updatedCart[existingItem].quantity = ++updatedCart[existingItem].quantity
            }
            setCardProducts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        }
    },[cardProducts])

    const removeCart = useCallback(() => {
        if(cardProducts) {
            setCardProducts(null);
            localStorage.setItem('cart',JSON.stringify(null))
            toast.success('Sepet tamamen kaldırıldı.');
        }
    },[cardProducts])

    const addToBasket = useCallback((product: CardProductProps) => {
        setCardProducts(prev => {
            let updatedCart;
            if(prev) {
                updatedCart = [...prev,product]
            }
            else {
                updatedCart = [product]
            }
            localStorage.setItem('cart',JSON.stringify(updatedCart))
            toast.success('Ürün sepete eklendi.');
            return updatedCart
        })
    },[])

    const removeFromBasket = useCallback((product: CardProductProps) => {
        if(cardProducts) {
            const filteredProducts = cardProducts?.filter((cart) => cart.id !== product.id);
            setCardProducts(filteredProducts);
            localStorage.setItem('cart',JSON.stringify(filteredProducts))
            toast.success('Ürün sepetten kaldırıldı.');
        }
    },[cardProducts])

    let value = {
        productCardQty,
        addToBasket,
        cardProducts,
        removeFromBasket,
        removeCart,
        addToBasketIncrease,
        addToBasketDecrease
    }
    return (
        <CartContext.Provider value={value} {...props} />
    )
}



export const useCart = () => {
    const context = useContext(CartContext)
    if(context == null) {
        throw new Error('Bir hata durumu mevcut!')
    }
  return context
}
