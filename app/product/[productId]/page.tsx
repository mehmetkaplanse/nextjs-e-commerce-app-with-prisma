import getProductById from "@/app/actions/getProduct";
import DetailClient from "@/app/components/detail/DetailClient";

type DetailProps = {
  productId: string
}

const Detail = async ({params}: {params: DetailProps}) => {

    const {productId} = params;
    const product = await getProductById({productId: productId})

  return (
    <div>
      <DetailClient product={product}/>
    </div>
  )
}

export default Detail