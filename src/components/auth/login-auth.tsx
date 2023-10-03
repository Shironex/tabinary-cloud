"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { absoluteUrl } from "@/lib/utils";
import { Github, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

const LoginAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    // await signIn("credentials", {
    //   email: EmailRef.current?.value,
    //   password: PasswordRef.current?.value,
    //   redirect: false,
    // })
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  const SocialLogin = async (type: string) => {
    setIsLoading(true);
    await signIn(type, { callbackUrl: absoluteUrl("/dashboard") });
    setIsLoading(false);
  };

  return (
    <div className="mx-auto grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only lg:not-sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log in
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t-2" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or login with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Google />
        )}
        Google
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={async () => await SocialLogin("github")}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
    </div>
  );
};

const Google = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
    viewBox="0 0 48 48"
    width="16px"
    height="16px"
  >
    <path
      fill="#fbc02d"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#e53935"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4caf50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1565c0"
      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

export default LoginAuth;
