import RegisterForm from "../components/Forms/RegisterForm";

const Register = () => {
  return (
    <div className="login-register-page container mx-auto max-w-[1200px] grid grid-cols-2 items-center p-8 py-16">
      <RegisterForm />
    </div>
  );
};

export default Register;
