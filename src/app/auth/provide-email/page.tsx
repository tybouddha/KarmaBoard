"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Lotus } from "@/components/icons/lotus";

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

type EmailFormValues = z.infer<typeof formSchema>;

export default function ProvideEmailPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: EmailFormValues) => {
    if (!token) {
      setError("Token manquant");
      return;
    }
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        token
      )
    ) {
      setError("Token invalide");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/provide-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, token }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la soumission");
      }

      // Optionnel : Toast si désiré
      toast("Email soumis", {
        className: "bg-amber-500 text-white font-lora flex items-center gap-2",
        icon: <Flower className="h-4 w-4 animate-pulse-slow" />,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Délai
      router.push(data.redirect);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 relative">
      <div
        className="absolute inset-0 opacity-10 animate-spin-slow"
        style={{ backgroundImage: "url('/img/mandala.png')" }}
      />
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full font-lora">
        <h1 className="text-2xl text-amber-700 mb-6 flex items-center gap-2">
          {/* <Flower className="h-6 w-6 animate-pulse-slow" /> */}
          <a
            href="/"
            className="absolute top-4 left-4 text-amber-700 hover:text-amber-500"
          >
            <Lotus className="h-6 w-6 animate-pulse-slow" />
          </a>
          Fournir un email
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-amber-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="votre@email.com"
                      className="border-amber-200 focus:ring-amber-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-red-600 bg-red-100 p-2 rounded font-lora">
                {error}
              </p>
            )}
            <CustomButton
              type="submit"
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {loading ? (
                "Chargement..."
              ) : (
                <span className="flex items-center gap-2">
                  <Flower className="h-4 w-4 animate-pulse-slow" />
                  Continuer
                </span>
              )}
            </CustomButton>
          </form>
        </Form>
        <Toaster />
      </div>
    </div>
  );
}
