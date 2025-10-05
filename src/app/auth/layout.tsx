import Container from "@/Components/Common/Container";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen max-h-screen flex items-center justify-center">
      <Container>
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="bg-[#FCFCFC] w-[600px] mx-auto">{children}</div>
        </div>
      </Container>
    </main>
  );
};

export default AuthLayout;
