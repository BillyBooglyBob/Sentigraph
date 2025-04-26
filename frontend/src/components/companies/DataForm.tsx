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
import { toast } from "sonner";

const formSchema = z.object({
  company: z.string().min(1, {
    message: "Company name is required",
  }),
});

/* Form to add company to user's list of companies*/
/* TODO - create the company */
const CompanyDataForm = () => {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
    },
  });

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    toast("Company added successfully", {
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                Company
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-slate-100 dark:bg-slate-500 border-0
                  focus-visible:ring-0 text-black dark:text-white
                  focus-visible:ring-offset-0"
                  placeholder="Enter the company name"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs text-zinc-500 dark:text-white">
                This is the company name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full dark:bg-slate-800 dark:text-white">
          Add Company
        </Button>
      </form>
    </Form>
  );
};

export default CompanyDataForm;
