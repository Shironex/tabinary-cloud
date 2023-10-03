"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "../max-width-wrapper";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserAccountNav from "../user-account-nav";
import ThemeSwitcher from "../theme-switcher";

const Navbar = () => {
  const pathName = usePathname();
  const session = useSession();

  if (pathName === "/sign-in" || pathName === "/sign-up") {
    return null;
  }

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-border bg-white/75 dark:bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-border">
          <Link href="/" className="flex z-40 font-semibold">
            <span>Tabinary Cloud.</span>
          </Link>

          {/* <MobileNav isAuth={!!user} /> */}

          <div className="hidden items-center space-x-4 sm:flex">
            {!session.data ? (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Summary
                </Link>
                <Link
                  href="/dashboard/storage"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Storage
                </Link>

                <ThemeSwitcher />

                <UserAccountNav
                  name={
                    !session.data.user.name
                      ? "Your Account"
                      : session.data.user.name
                  }
                  email={session.data.user.email ?? ""}
                  imageUrl={session.data.user.image ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
