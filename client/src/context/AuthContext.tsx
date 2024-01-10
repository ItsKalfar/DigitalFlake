import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { loginUser, logoutUser, registerUser } from "../assets/api";
import { getFromLocalStorage, setToLocalStorage } from "../utils/LocalStorage";
import { Loading } from "../components/Loading";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: IUser | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
};

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const login = async (loginCredentials: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const res = await loginUser(loginCredentials);
      const { data } = res;
      setUser(data.user);
      setToken(data.accessToken);
      setToLocalStorage("user", data.user);
      setToLocalStorage("token", data.accessToken);
      navigate("/dashboard");
      toast.success("Logged in Successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const signup = async (registerCredentials: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const res = await registerUser(registerCredentials);
      const { data } = res;
      console.log(data);
      if (data) {
        // navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      setIsLoading(false);
      const res = await logoutUser();
      const { data } = res;
      if (data) {
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const _user = getFromLocalStorage("user");
    const _token = getFromLocalStorage("token");

    if (_user?._id && _token) {
      setUser(_user);
      setToken(_token);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, token }}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
