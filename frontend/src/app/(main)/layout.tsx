import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-1/5 hidden md:block">
          <Sidebar />
        </div>
        <div className="grow p-5 md:w-[1140px]">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
