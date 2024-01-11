import { Home, Package, LayoutGrid } from "lucide-react";
import { SidebarOption } from "./SidebarOption";

const sidebarComponentList = [
  { id: "1", label: "Home", icon: <Home /> },
  {
    id: "2",
    label: "Category",
    icon: <LayoutGrid />,
  },
  {
    id: "3",
    label: "Product",
    icon: <Package />,
  },
];

export const Sidebar = () => {
  return (
    <div className=" w-1/4 relative overflow-y-auto bg-gray-200 h-[calc(100vh-70px)] items-start px-2 py-8 m-0">
      {sidebarComponentList.map((item) => {
        const { label, icon, id } = item;
        return <SidebarOption key={id} label={label} icon={icon} />;
      })}
    </div>
  );
};
