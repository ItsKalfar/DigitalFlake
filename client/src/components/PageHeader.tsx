import { useGlobalContext } from "../context/GlobalContext";
import { Button } from "./Button";

function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export const PageHeader = () => {
  const { activeComponent } = useGlobalContext();
  return (
    <div className="w-full flex items-center justify-between ">
      <div>
        <h1>{capitalizeFirstLetter(activeComponent)}</h1>
      </div>
      <input
        className="w-2/4 border border-gray-400 rounded-md p-2"
        placeholder="search box"
      />

      <div>
        <Button>{`Add ${capitalizeFirstLetter(activeComponent)}`}</Button>
      </div>
    </div>
  );
};
