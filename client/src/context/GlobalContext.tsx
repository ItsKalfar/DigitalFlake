import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import Loading from "../components/Loading";
import { toast } from "sonner";
import { getCategories, getProducts } from "../assets/api";

type GlobalContextType = {
  categories: ICategories[];
  products: IProducts[];
};

export const GlobalContext = createContext({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [products, setIsProduct] = useState<IProducts[]>([]);

  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getCategories();
      const { data } = res;
      setCategories((prev) => [...prev, data]);
    } catch (err: any) {
      toast(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const res = await getProducts();
      const { data } = res;
      setIsProduct((prev) => [...prev, data]);
    } catch (err: any) {
      toast(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  return (
    <GlobalContext.Provider value={{ categories, products }}>
      {isLoading ? <Loading /> : children}
    </GlobalContext.Provider>
  );
};
