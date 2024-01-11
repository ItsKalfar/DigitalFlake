import { useGlobalContext } from "../../context/GlobalContext";
import { SquarePen, Trash2, ChevronsUpDown } from "lucide-react";
export const CategoryTable = () => {
  const { categories, removeCategory } = useGlobalContext();
  return (
    <div className="w-full h-3/4 mt-16 flex flex-col overflow-y-scroll">
      <div className="w-full px-4 py-3 bg-yellow-100 flex text-center">
        <div className="w-1/5 flex items-center justify-center">
          ID <ChevronsUpDown className="w-4 ml-1 mt-0.5" />
        </div>
        <div className="w-2/5 flex items-center justify-center">
          Name <ChevronsUpDown className="w-4 ml-1 mt-0.5" />
        </div>
        <div className="w-3/5 flex items-center justify-center">
          Description <ChevronsUpDown className="w-4 ml-1 mt-0.5" />
        </div>
        <div className="w-1/5 flex items-center justify-center">
          Status <ChevronsUpDown className="w-4 ml-1 mt-0.5" />
        </div>
        <div className="w-2/5 flex items-center justify-center"></div>
      </div>
      <div>
        {categories.map((category) => {
          const { _id, name, description, status } = category;
          return (
            <div
              key={_id}
              className="w-full px-4 py-3 bg-gray-100 my-2 flex text-center"
            >
              <div className="w-1/5">{_id.slice(0, 3) + "..."}</div>
              <div className="w-2/5">{name}</div>
              <div className="w-3/5">{description.slice(0, 20)}</div>
              <div
                className={`w-1/5 ${
                  status === "Active" ? "text-green-500" : "text-red-700"
                }`}
              >
                {status}
              </div>
              <div className="w-2/5  flex items-center justify-center">
                <SquarePen
                  className={`w-5 ${
                    status === "Active" ? "text-gray-500" : "text-gray-300"
                  }  mr-2`}
                />
                <Trash2
                  onClick={() => removeCategory(_id)}
                  className={`w-5  ml-2 text-gray-500 cursor-pointer hover:text-gray-700`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
