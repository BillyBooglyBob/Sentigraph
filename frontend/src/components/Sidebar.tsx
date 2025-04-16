"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Newspaper,
  ChartArea,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();

  useEffect(() => {
    const shortcuts: Record<string, string> = {
      p: "/profile",
      b: "/settings",
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isShortcut = e.metaKey || e.ctrlKey;

      if (isShortcut && shortcuts[key]) {
        e.preventDefault();
        router.push(shortcuts[key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <Command className="bg-secondary rounded-none">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-2 w-4" />
            <Link href="/dashboard">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-2 w-4" />
            <Link href="/companies">Companies</Link>
          </CommandItem>
          <CommandItem>
            <ChartArea className="mr-2 h-2 w-4" />
            <Link href="/compare">Compare</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-2 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-2 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
