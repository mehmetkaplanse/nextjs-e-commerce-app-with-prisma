import { getCurrentUser } from "@/app/actions/getCurrentUser";
import AdminContainer from "../AdminContainer";
import ManageClient from "@/app/components/admin/ManageClient";
import getProducts from "@/app/actions/getProducts";
import WarningText from "@/app/components/WarningText";

const Manage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Buraya izniniz yoktur!" />;
  }

  const products = await getProducts({ category: null });

  return (
    <AdminContainer>
      <ManageClient products={products} />
    </AdminContainer>
  );
};

export default Manage;
