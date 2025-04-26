"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  aspect: z.string().min(1, {
    message: "Aspect name is required",
  }),
});

interface AspectSelectorProps {
  aspects: string[];
  handleAspectsChange: (
    selectedOrUpdater: string[] | ((prev: string[]) => string[])
  ) => void;
}

const AspectSelector = ({
  aspects,
  handleAspectsChange,
}: AspectSelectorProps) => {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aspect: "",
    },
  });

  // Handle delete aspect
  const handleDeleteAspect = (aspect: string) => {
    // Update the aspects state
    handleAspectsChange((prev: string[]) =>
      prev.filter((item) => item !== aspect)
    );

    toast(`Aspect deleted successfully`, {
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });
  };

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // If aspect already exists, show error
    if (aspects.includes(data.aspect)) {
      toast.error("Aspect already exists");
    } else {
      // Add the new aspect to the list
      handleAspectsChange((prev: string[]) => [...prev, data.aspect]);

      toast(`Aspect added successfully`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    }

    // Reset the form
    form.reset();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Aspects</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Manage aspects</SheetTitle>
          <SheetDescription>
            Make changes to the aspect settings here. Click save when you are
            done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="px-5 flex gap-3 items-center justify-between"
          >
            <FormField
              control={form.control}
              name="aspect"
              render={({ field }) => (
                <FormItem className="w-3/4">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Company
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0
                  focus-visible:ring-0 text-black dark:text-white
                  focus-visible:ring-offset-0"
                      placeholder="Enter the aspect name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-zinc-500 dark:text-white">
                    This is the aspect you're adding.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="flex dark:bg-slate-800 dark:text-white">
              Add aspect
            </Button>
          </form>
        </Form>
        <ScrollArea className="mx-4 rounded-md border dark:border-slate-700 h-[70%]">
          {aspects.map((aspect, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 py-2"
            >
              <div className="w-full flex items-center justify-between gap-2">
                <Label className="text-sm font-bold text-zinc-500 dark:text-white">
                  {aspect}
                </Label>
                <Button onClick={() => handleDeleteAspect(aspect)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

export default AspectSelector;
