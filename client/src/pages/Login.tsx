import { LoginForm } from "../components/Forms/LoginForm";

export const Login = () => {
  return (
    <div className="login-register-page container mx-auto w-11/12 max-w-[1100px] grid grid-cols-2 items-center py-16">
      <LoginForm />
    </div>
  );
};
