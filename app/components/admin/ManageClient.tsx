"use client";
import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback } from "react";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import toast from "react-hot-toast";
import axios from "axios";

interface ManageClientProps {
  products: Product[];
}

const ManageClient: React.FC<ManageClientProps> = ({ products }) => {
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        cateogry: product.category,
        brand: product.brand,
        inStock: product.inStock,
        image: product.image,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "cateogry", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "InStock",
      width: 100,
      renderCell: (params) => {
        return <div>{params.row.inStock ? "Mevcut" : "Mevcut değil"}</div>;
      },
    },
    { field: "image", headerName: "Image", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            onClick={() => handleDelete(params.row.id, params.row.image)}
            className="flex justify-center items-center text-red-500 mx-2 cursor-pointer font-bold"
          >
            Delete
          </button>
        );
      },
    },
  ];

  const handleDelete = useCallback(async (id: string, image: any) => {
    toast.success("Siliniyor...");
    const handleDeleteImage = async () => {
      try {
        const imageRef = ref(storage, image);
        await deleteObject(imageRef)
      } catch (error) {
        console.log(error);
      }
    };
    await handleDeleteImage();

    await axios
      .delete(`/api/product/${id}`)
      .then(() => {
        toast.success('Ürün başarıyla silindi.')
        handleDeleteImage()
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-4/5">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default ManageClient;
