"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

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
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import axios from "axios";
import { API_Backend } from "@/hooks/use-fetch";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { randomCodeGenerator } from "@/lib/randomGeneratCode";
import { DatePickerInput } from "./DateInput";
import { cn } from "@/lib/utils";
import TabDemo from "./TabsChoosMethodsCrateCoupen";
const CreactCoupenShema = z.object({
  coupenCode: z
    .string()
    .min(1, "It is mandatory to fill in the input")
    .min(5, "Minimum 5 characters")
    .max(10, "Maximum 10 characters"),
  dateCheckbox: z.boolean(),
  numberCheckbox: z.boolean(),
});

type CoupenSubmit = z.infer<typeof CreactCoupenShema>;
function CreateNewCoupen() {
  const [openDialog, setOpenDialog] = useState(false);
  const randomGeneratCode = randomCodeGenerator() || "";

  const form = useForm<CoupenSubmit>({
    defaultValues: {
      dateCheckbox: false,
      numberCheckbox: false,
      coupenCode: randomGeneratCode,
    },
    resolver: zodResolver(CreactCoupenShema),
    shouldFocusError: true,
  });

  const submitCoupenData = async (data: CoupenSubmit) => {
    console.info(data);
    // try {
    //     const res = await axios.post(`${API_Backend}`)
    // } catch (error) {

    // }
  };

  return (
    <>
      <Button
        onClick={() => setOpenDialog(true)}
        variant={"outline"}
        className="btn-outline"
      >
        Create Coupen <Plus />
      </Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog} modal={false}>
        {/* background blur and dark  */}
      <div className={cn(openDialog&&'fixed inset-0 bg-black/80 z-40 ')}></div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...form}>
            <form className="" onSubmit={form.handleSubmit(submitCoupenData)}>
              <FormField
                control={form.control}
                name="coupenCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="">
                        <Input maxLength={10} {...field}></Input>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {[
                { key: "dateCheckbox", label: "date" },
                {
                  key: "Valid time of coupon",
                  label: "Number of users allowed to use",
                },
              ].map((checkBox, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={checkBox.key as "dateCheckbox" | "numberCheckbox"}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="">
                        <Checkbox
                          value={field.value as boolean}
                          onCheckedChange={field.onChange}
                          id={checkBox.key}
                        />
                        <Label htmlFor={checkBox.key}>{checkBox.label}</Label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <DialogFooter>
              
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
            
          </FormProvider>

          <div className="">
          <TabDemo 
            currontTabs={(value)=>{
              console.info(value);
            }}
          />
            
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateNewCoupen;
