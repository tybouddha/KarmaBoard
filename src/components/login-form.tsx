"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/shared/CustomButton";
import { Flower } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Email invalide" })
    .min(1, { message: "Email requis" }),
  password: z
    .string()
    .min(6, { message: "Mot de passe doit avoir au moins 6 caractères" }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
        {...props}
      >
        {error && <p className="text-red-600 text-center">{error}</p>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-lora text-gray-800">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Entrez votre email"
                  className="font-lora border-amber-200 focus:ring-green-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-lora text-gray-800">
                Mot de passe
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  className="font-lora border-amber-200 focus:ring-green-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton
          variant="primary"
          loading={loading}
          onClick={() => {}}
          className="w-full flex items-center justify-center gap-2"
        >
          <Flower className="h-4 w-4 animate-pulse-slow" />
          Se connecter
        </CustomButton>
      </form>
    </Form>
  );
}
