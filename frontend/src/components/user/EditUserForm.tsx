"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import users from "@/data/users";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password is required",
  }),
});

interface UserEditPageProps {
  userId: string;
}

const EditUserForm = ({ userId }: UserEditPageProps) => {
  // Get data for the current user by looking up the ID in the URL
  const user = users.find((user) => user.id === userId);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      confirmPassword: user?.password || "",
    },
  });

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    toast("User updated successfully", {
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <>
      <h3 className="text-2xl mb-4">Edit User</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-100 dark:bg-slate-500 border-0 
                    focus-visible:ring-0 text-black dark:text-white 
                    focus-visible:ring-offset-0"
                    placeholder="Enter the username"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-zinc-500 dark:text-white">
                  This is the public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-100 dark:bg-slate-500 border-0 
                    focus-visible:ring-0 text-black dark:text-white 
                    focus-visible:ring-offset-0"
                    placeholder="Enter the email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-zinc-500 dark:text-white">
                  This is the email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-100 dark:bg-slate-500 border-0 
                    focus-visible:ring-0 text-black dark:text-white 
                    focus-visible:ring-offset-0"
                    placeholder="Enter the password"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-zinc-500 dark:text-white">
                  This is the password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Re-enter the password
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-100 dark:bg-slate-500 border-0 
                    focus-visible:ring-0 text-black dark:text-white 
                    focus-visible:ring-offset-0"
                    placeholder="Re-enter the password"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-zinc-500 dark:text-white">
                  This is to double check the password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full dark:bg-slate-800 dark:text-white">
            Update User
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditUserForm;
