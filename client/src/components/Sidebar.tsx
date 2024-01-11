import { useGlobalContext } from "../context/GlobalContext";
import { Home, Package, List } from "lucide-react";

const sidebarComponentList = [
  { id: "1", label: "Home", icon: <Home /> },
  {
    id: "2",
    label: "Category",
    icon: <List />,
  },
  {
    id: "3",
    label: "Product",
    icon: <Package />,
  },
];

export const Sidebar = () => {
  const { activeComponent, setActiveComponent } = useGlobalContext();
  return (
    <div className=" w-1/4 relative overflow-y-auto bg-gray-200 h-[calc(100vh-70px)] items-start px-4 py-8">
      {sidebarComponentList.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => setActiveComponent(item.label.toLowerCase())}
            className={`py-4 text-sm font-medium px-4 rounded-md my-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${
              activeComponent === item.label.toLowerCase()
                ? "bg-yellow-100"
                : ""
            }`}
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        );
      })}
    </div>
  );
};
