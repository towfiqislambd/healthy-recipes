import { Spinner } from "@/Components/Loader/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default loading;
