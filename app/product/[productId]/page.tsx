import DetailClient from "@/app/components/detail/DetailClient";
import { products } from "@/utils/Products";

type DetailProps = {
  productId: string
}

const Detail = ({params}: {params: DetailProps}) => {

    const {productId} = params;
    const product = products.find((item) => item.id === productId);    

  return (
    <div>
      <DetailClient product={product}/>
    </div>
  )
}

export default Detail