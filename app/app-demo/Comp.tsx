"use client";
import { useEffect } from "react";

const Comp = () => {
  const fet = async () => {
    const here = await (await fetch("http://localhost:3000/api/users")).json();
    console.log(here);
  };

  useEffect(() => {
    fet();
  }, []);

  return <div>hi</div>;
};
export default Comp;
