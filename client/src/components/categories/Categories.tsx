import { PageHeader } from "../PageHeader";
import { CategoryTable } from "../table/CategoryTable";

export const Categories = () => {
  return (
    <div className="w-3/4 h-[calc(100vh-70px)] items-start py-4 px-4">
      <div className="h-full py-6 shadow-xl rounded-md">
        <PageHeader />
        <CategoryTable />
      </div>
    </div>
  );
};
