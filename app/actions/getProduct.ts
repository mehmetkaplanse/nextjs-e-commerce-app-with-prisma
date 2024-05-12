import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export interface IParams {
  productId: string;
}

export default async function getProductById(params: IParams) {
  try {
    const { productId } = params;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    if (!product) {
      return null;
    }
    return product
  } catch (error) {
    NextResponse.error()
    console.log("error is :",error);
    
  }
}
