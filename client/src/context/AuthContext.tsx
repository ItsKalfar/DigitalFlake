import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { loginUser, logoutUser, registerUser } from "../assets/api";
import {
  getFromLocalStorage,
  setToLocalStorage,
  clearLocalStorage,
} from "../utils/LocalStorage";
import { Loading } from "../components/Loading";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { requestHandler } from "../utils/RequestHandler";

type AuthContextType = {
  user: IUserResponse | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
};

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const login = async (loginCredentials: {
    email: string;
    password: string;
  }) => {
    await requestHandler(
      async () => await loginUser(loginCredentials),
      setIsLoading,
      (res) => {
        const { data } = res;
        setUser(data.user);
        setToken(data.accessToken);
        setToLocalStorage("user", data.user);
        setToLocalStorage("token", data.accessToken);
        navigate("/dashboard");
        toast.success("Logged in Successfully!");
      },
      toast
    );
  };

  const signup = async (registerCredentials: {
    email: string;
    password: string;
  }) => {
    await requestHandler(
      async () => await registerUser(registerCredentials),
      setIsLoading,
      (res) => {
        const { data } = res;
        if (data) {
          navigate("/login");
          toast.success("Signed Up in Successfully!");
        }
      },
      toast
    );
  };

  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      setIsLoading,
      () => {
        setUser(null);
        setToken(null);
        clearLocalStorage();
        navigate("/login");
      },
      toast
    );
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
