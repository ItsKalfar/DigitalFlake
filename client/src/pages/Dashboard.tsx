import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Categories } from "../components/Categories";
import { Products } from "../components/Products";
import { Home } from "../components/Home";

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
      </div>
    </>
  );
};
