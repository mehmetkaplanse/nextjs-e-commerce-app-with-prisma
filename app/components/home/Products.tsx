import { products } from "@/utils/Products"
import Heading from "../general/Heading"
import ProductCard from "./ProductCard"

const Products = () => {
  return (
    <div className="">
        <Heading text="Tüm Ürünler"/>
        <div className="flex items-center flex-wrap gap-3 md:gap-10 px-3 md:px-10">
            {
                products.map((prd,i) => (
                    <ProductCard key={prd.id} product={prd}/>
                ))
            }
        </div>
    </div>
  )
}

export default Products

