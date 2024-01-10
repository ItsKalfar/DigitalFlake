import * as z from "zod";
import { useAuth } from "../../context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, PasswordInput } from "./Input";
import { Button } from "../Button";
import digitalFlake from "../../assets/images/digitalflakeLogo.png";

export const RegisterForm = () => {
  const { signup } = useAuth();

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

  const onSubmit: SubmitHandler<ValidationSchema> = async (data: any) => {
    try {
      await signup(data);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full bg-white rounded shadow-md items-center px-6 flex flex-col py-4"
    >
      <img src={digitalFlake} className="scale-50 mb-0" />
      <p className="text-gray-400 mb-10 mt-[-40px]">
        Welcome to Digitalflake Admin
      </p>

      <Input
        id="Email"
        label="Email"
        type="text"
        placeholder="Enter email"
        {...register("email")}
        error={errors.email && errors.email.message}
        className="mb-6"
      />
      <PasswordInput
        label="Password"
        id="password"
        placeholder="Enter Password"
        {...register("password")}
        error={errors.password && errors.password.message}
      />

      <Button type="submit" className="w-full mt-8">
        Register
      </Button>
    </form>
  );
};
