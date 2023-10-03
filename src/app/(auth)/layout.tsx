import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const session = await getAuthSession();

  if (session && session.user) {
    return redirect("/dashboard");
  }

  return <>{children}</>;
}
