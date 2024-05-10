import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3">
      <AdminSidebar />
      <div className="py-4 w-full">
        {children}
        </div>
    </div>
  );
};

export default AdminLayout;
