"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { createTicket } from "@/app/actions/adminTicketingActions";

import { useRouter } from "next/navigation";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(60, { message: "Title must be less than 60 characters" }),
});

function AddTicketing({ token }: { token: string }) {
  const router = useRouter();

  const [formError, setFormError] = useState<object>({
    title: "",
  });

  // submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      title: { value },
    } = e.target as HTMLFormElement;

    console.log("title=>>>", value);
    const { success, error } = schema.safeParse({
      title: value,
    });
    // error handling fornt side
    if (!success) {
      const zodError = error?.flatten().fieldErrors;
      setFormError({
        title: zodError?.title?.[0] || "",
      });
      return;
    }

    setFormError({ title: "" });
    // create ticket handler
    const { createTicketError, data } = await createTicket({
      token: token,
      title: value,
    });

    console.log("data=>>>", data);
    // redirect to ticket chat
    router.push(`/dashboard/ticketing/${data?.id}`);
    // check error backend side
    if (createTicketError) {
      toast({
        title: "Error",
        className: "bg-red-300 text-950",
        duration: 3000,
      });
      return;
    }
  };

  // toast error
  useEffect(() => {
    if (!formError?.title) return;
    toast({
      title: "Unsuccessful",
      className: "bg-red-300 text-950 font-semibold",
      duration: 3000,
      description: formError?.title || "Something went wrong",
    });
  }, [formError]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="btn-outline">
            <p>Add ticket</p>
            <Plus className="text-black stroke-black" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-sm:max-w-xs rounded-xl overflow-hidden">
          <DialogHeader>
            <DialogTitle>Add Ticket</DialogTitle>
            <DialogDescription>
              Here you can write your ticket and then press the submit button
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4 space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="title" className="block font-semibold">
                Title
              </Label>
              <Input
                maxLength={60}
                name="title"
                id="title"
                placeholder="Write your title"
                className="ring-0 focus-visible:ring-0 col-span-3 outline-none outline-1 outline-zinc-400 focus-visible:outline-zinc-500 rounded-sm border-none"
              />
            </div>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddTicketing;
