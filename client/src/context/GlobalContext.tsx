import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Loading } from "../components/Loading";
import { toast } from "sonner";
import {
  getCategories,
  getProducts,
  addProduct,
  addCategory,
  deleteCategory,
  deleteProduct,
} from "../assets/api";
import { getFromLocalStorage } from "../utils/LocalStorage";
import { requestHandler } from "../utils/RequestHandler";

type GlobalContextType = {
  categories: ICategories[];
  products: IProducts[];
  createProduct: (data: IProducts) => Promise<void>;
  createCategory: (data: ICategories) => Promise<void>;
  removeCategory: (data: string) => Promise<void>;
  removeProduct: (data: string) => Promise<void>;
  activeComponent: string;
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalContext = createContext({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [activeComponent, setActiveComponent] = useState<string>("home");

  const getAllCategories = () => {
    requestHandler(
      async () => await getCategories(),
      setIsLoading,
      (res) => {
        const { data } = res;
        setCategories(data.categories);
      },
      toast
    );
  };
  const getAllProducts = async () => {
    requestHandler(
      async () => await getProducts(),
      setIsLoading,
      (res) => {
        const { data } = res;
        setProducts(data.products);
      },
      toast
    );
  };

  const createProduct = async (productDetails: IProducts) => {
    requestHandler(
      async () => await addProduct(productDetails),
      setIsLoading,
      (res) => {
        const { data } = res;
        console.log(data);
        toast.success("Product added successfully");
      },
      toast
    );
  };

  const createCategory = async (categoryDetails: ICategories) => {
    requestHandler(
      async () => await addCategory(categoryDetails),
      setIsLoading,
      () => {
        toast("Category added successfully");
      },
      toast
    );
  };

  const removeProduct = async (productId: string) => {
    requestHandler(
      async () => await deleteProduct(productId),
      setIsLoading,
      (res) => {
        const { data } = res;
        console.log(data);
        toast.success("Product deleted successfully");
      },
      toast
    );
  };

  const removeCategory = async (categoryId: string) => {
    requestHandler(
      async () => await deleteCategory(categoryId),
      setIsLoading,
      (res) => {
        const { data } = res;
        console.log(data);
        toast.success("Category deleted successfully");
      },
      toast
    );
  };

  useEffect(() => {
    setIsLoading(true);
    const _user = getFromLocalStorage("user");
    const _token = getFromLocalStorage("token");
    if (_user?._id && _token) {
      getAllCategories();
      getAllProducts();
    }
    setIsLoading(false);
  }, [isLoading]);

  return (
    <GlobalContext.Provider
      value={{
        categories,
        products,
        createCategory,
        removeCategory,
        createProduct,
        removeProduct,
        activeComponent,
        setActiveComponent,
      }}
    >
      {isLoading ? <Loading /> : children}
    </GlobalContext.Provider>
  );
};
