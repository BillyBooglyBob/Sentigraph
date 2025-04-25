import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/AppSidebar";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SidebarProvider>
        <div className="flex flex-1">
          <div className="w-1/6 hidden md:block">
            <AppSidebar />
          </div>
          <div className="grow p-5 md:w-[1140px] pt-24">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
