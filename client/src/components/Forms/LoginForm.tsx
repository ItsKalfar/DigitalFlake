import * as z from "zod";
import { useAuth } from "../../context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, PasswordInput } from "./Input";
import digitalFlake from "../../assets/images/digitalflakeLogo.png";

const LoginForm = () => {
  const { login } = useAuth();

  const formSchema = z.object({
    email: z
      .string()
      .email()
      .min(1, {
        message: "Please provide valid email address.",
      })
      .max(25, { message: "Name cannot be more than 25 characters" }),
    password: z
      .string()
      .min(8, { message: "Password should contain atleast 8 characters" }),
  });

  type ValidationSchema = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data: any) => {
    try {
      const { email, password } = data;
      const values = { email, password };
      login(values);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <img src={digitalFlake} />
      </div>

      <Input
        id="Email"
        label="Email"
        type="text"
        placeholder="Enter email"
        {...register("email")}
        error={errors.email && errors.email.message}
      />
      <PasswordInput
        label="Password"
        id="password"
        placeholder="Enter Password"
        {...register("password")}
        error={errors.password && errors.password.message}
      />
    </form>
  );
};

export default LoginForm;
