import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // si tu utilises classnames helpers
import { Loader2 } from "lucide-react";

type CustomButtonPropsType = {
  children?: React.ReactNode;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
};

export default function CustomButton({
  children,
  loading = false,
  className,
  ...props
}: CustomButtonPropsType) {
  return (
    <Button
      className={cn("rounded-xl font-semibold", className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
