import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type CustomButtonPropsType = {
  children?: React.ReactNode;
  label?: string;
  variant?: "primary" | "secondary";
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
};

export default function CustomButton({
  children,
  label,
  variant = "primary",
  loading = false,
  className,
  disabled,
  onClick,
}: CustomButtonPropsType) {
  const variantStyles = {
    primary: "bg-amber-500 text-white hover:bg-amber-600 shadow-sm",
    secondary:
      "bg-white text-amber-800 border border-amber-200 hover:bg-amber-50",
  };

  return (
    <Button
      className={cn(
        "rounded-xl font-semibold transition-all duration-300 hover:scale-105",
        variantStyles[variant],
        className
      )}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || label}
    </Button>
  );
}
