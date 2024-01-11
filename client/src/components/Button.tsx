import { forwardRef, ButtonHTMLAttributes, FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "rounded inline-flex flex-shrink-0 justify-center items-center text-center shadow-sm font-md",
  {
    variants: {
      variant: {
        default: "bg-[#5C218B] text-white",
        outline: "bg-transparent border border-[#5C218B] text-[#5C218B]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded px-3",
        lg: "h-11 rounded px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonGroupVariants = cva("flex space-x-4");

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, size, variant, ...props }, ref) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
      ref={ref}
    />
  );
});

interface ButtonGroupProps extends VariantProps<typeof buttonGroupVariants> {
  confirmProps: ButtonProps;
  cancelProps: ButtonProps;
  className?: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
  confirmProps,
  cancelProps,
  className,
}) => {
  return (
    <div className={buttonGroupVariants({ className })}>
      <Button {...cancelProps} className="rounded-3xl" />
      <Button {...confirmProps} className="rounded-3xl" type="submit" />
    </div>
  );
};
