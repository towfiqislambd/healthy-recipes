import React from "react";
import Container from "@/Components/Common/Container";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="my-10 w-[360px] md:w-[500px] lg:w-[600px] mx-auto bg-[#F6F5F2] rounded-lg shadow p-5 lg:p-8">
          {children}
        </div>
      </Container>
    </main>
  );
};

export default AuthLayout;
