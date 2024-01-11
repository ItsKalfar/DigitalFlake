import { useGlobalContext } from "../context/GlobalContext";
import { Button } from "./Button";
import { capitalizeFirstLetter } from "../utils/utils";
import { Package, LayoutGrid } from "lucide-react";

export const PageHeader = () => {
  const { activeComponent, setActiveComponent } = useGlobalContext();
  return (
    <div className="w-full flex items-center justify-between px-6">
      <div className="flex items-center justify-start">
        {activeComponent === "product" && (
          <Package className="scale-80 mt-0.5" />
        )}
        {activeComponent === "category" && (
          <LayoutGrid className="scale-80 mt-0.5" />
        )}
        <h1 className="font-semibold ml-2">
          {capitalizeFirstLetter(activeComponent)}
        </h1>
      </div>
      <input
        className="w-2/4 border border-gray-400 rounded-md p-2"
        placeholder="Search box"
      />

      <div>
        <Button
          className="px-6"
          size={"sm"}
          onClick={() => setActiveComponent(`add${activeComponent}`)}
        >{`Add ${capitalizeFirstLetter(activeComponent)}`}</Button>
      </div>
    </div>
  );
};
