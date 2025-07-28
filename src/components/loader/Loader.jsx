import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export function Loader() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <RotatingLines
      visible={true}
      height={isMobile ? "50" : "70"}
      width={isMobile ? "50" : "70"}
      color="grey"
      strokeWidth="5"
      strokeColor="orange"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
