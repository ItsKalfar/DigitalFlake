import { forwardRef, InputHTMLAttributes, FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, type, error, ...props }, ref) => {
    return (
      <div className="my-1 w-full relative">
        <label
          htmlFor={id}
          className="block text-md font-medium mb-1 absolute top-[-10px] left-3 bg-white px-3"
        >
          {label}
        </label>
        <input
          type={type}
          className={`w-full border-gray-400 border-[1px] rounded px-6 py-4 bg-transparent disabled:opacity-[0.4] focus:bg-transparent focus:outline-none focus:border-gray-300 ${className}`}
          ref={ref}
          {...props}
        />
        <p className="text-xs font-medium text-red-500 mt-1 mb-2">{error}</p>
      </div>
    );
  }
);

export const PasswordInput: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, label, id, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="my-1 w-full relative">
      <label
        htmlFor={id}
        className="block text-md font-medium mb-1 absolute top-[-10px] left-3 bg-white px-3"
      >
        {label}
      </label>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full border-gray-400 border-[1px] rounded px-6 py-4 bg-transparent disabled:opacity-[0.5] focus:outline-none focus:border-gray-300 focus:bg-transparent ${className}`}
          ref={ref}
          {...props}
        />
        <p className="text-xs font-medium text-red-500 mt-1 mb-2">{error}</p>
        <button
          type="button"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <Eye className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeOff className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
});
