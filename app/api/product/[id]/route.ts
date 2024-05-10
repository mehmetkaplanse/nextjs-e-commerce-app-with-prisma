import prisma  from '@/libs/prismadb';
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const product = await prisma.product.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(product)

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}
