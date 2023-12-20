"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storageCreateFormSchema } from "@/lib/zodschema";
import z from "zod";
import { APIResponseError, api } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type Data = z.infer<typeof storageCreateFormSchema>;

const OnboardingPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<Data>({
    resolver: zodResolver(storageCreateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: Data) {
    try {
      setIsLoading(true);
      const response = await api.post<string>("/storage/create", data);

      if (response.status === "redirect")
      {
        router.replace(response.data);
        return;
      }

      if (response.status === "success") {
        toast({
          title: "Success!",
          description: "Storage created successfully.",
        });
        setIsLoading(false);
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
      }
    } catch (error) {
      const AxiosError = error as AxiosError;
      const { message } = AxiosError.response?.data as APIResponseError;

      toast({
        title: "Error!",
        description: message,
      });

      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto grid gap-6">
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Lets create your first storage.
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="storage">Storage</FormLabel>
                  <FormControl>
                    <Input
                      id="storage"
                      placeholder="name"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingPage;
