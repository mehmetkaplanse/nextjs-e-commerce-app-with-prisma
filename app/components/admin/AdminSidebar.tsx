"use client";
import AdminSidebarItem from "./AdminSidebarItem";
import { MdDashboard } from "react-icons/md";
import { PiTextIndentBold } from "react-icons/pi";
import { IoCreate } from "react-icons/io5";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathName = usePathname();
  const adminPanel = [
    {
      name: "Özetler",
      icon: MdDashboard,
      url: "/admin",
    },
    {
      name: "Ürün Oluştur",
      icon: IoCreate,
      url: "/admin/create",
    },
    {
      name: "Ürünleri Yönet",
      icon: IoCreate,
      url: "/admin/manage",
    },
    {
      name: "Siparişlerim",
      icon: PiTextIndentBold,
      url: "/admin/order",
    },
  ];
  return (
    <div className="w-1/5 h-screen border-r border-t py-4 shadow-md">
      <div className="space-y-3">
        {adminPanel.map((admin, i) => (
          <AdminSidebarItem
            key={i}
            selected={admin.url == pathName}
            icon={admin.icon}
            name={admin.name}
            url={admin.url}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
