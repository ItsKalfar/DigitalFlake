import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Categories } from "../components/categories/Categories";
import { Products } from "../components/products/Products";
import { Home } from "../components/Home";
import { AddProduct } from "../components/products/AddProduct";
import { AddCategories } from "../components/categories/AddCategories";

import { useGlobalContext } from "../context/GlobalContext";

export const Dashboard = () => {
  const { activeComponent } = useGlobalContext();
  return (
    <>
      <Navbar />
      <div className="flex justify-between list-streach">
        <Sidebar />
        {activeComponent === "home" && <Home />}
        {activeComponent === "category" && <Categories />}
        {activeComponent === "product" && <Products />}
        {activeComponent === "addproduct" && <AddProduct />}
        {activeComponent === "addcategory" && <AddCategories />}
      </div>
    </>
  );
};
