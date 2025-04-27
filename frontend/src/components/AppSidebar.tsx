"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  LayoutDashboard,
  Newspaper,
  ChartArea,
  Settings,
  User,
  Folder,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = {
  main: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Companies",
      url: "/companies",
      icon: Newspaper,
    },
    {
      title: "Compare",
      url: "/companies-comparison",
      icon: ChartArea,
    },
  ],
  admin: [
    {
      title: "Admin",
      url: "/admin",
      icon: Folder,
    },
  ],
  user: [
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ],
};
const groups = [
  { label: "Main", items: items.main },
  { label: "Admin", items: items.admin },
  { label: "Profile", items: items.user },
];

import Link from "next/link";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    return pathname === url
  };

  return (
    <Sidebar className="mt-20" variant="inset">
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
