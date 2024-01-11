import { ReactNode } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { ChevronRight } from "lucide-react";

export const SidebarOption = ({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) => {
  const { activeComponent, setActiveComponent } = useGlobalContext();

  return (
    <div
      onClick={() => setActiveComponent(label.toLowerCase())}
      className={`py-4 font-medium px-2 rounded-md my-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${
        activeComponent === label.toLowerCase()
          ? "bg-yellow-100 hover:bg-yellow-200"
          : ""
      }`}
    >
      <div className="flex items-center justify-start">
        {icon}
        <p className="ml-2">{label}</p>
      </div>
      <ChevronRight />
    </div>
  );
};
