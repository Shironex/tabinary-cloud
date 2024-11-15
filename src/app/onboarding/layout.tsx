import React from "react";

type Props = {
  children: React.ReactNode;
};

const OnboardingLayout = ({ children }: Props) => {
  return (
    <main className="h-screen flex justify-center items-center">
      {children}
    </main>
  );
};

export default OnboardingLayout;
