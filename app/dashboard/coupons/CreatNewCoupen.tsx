"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

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
import TabsMethodCoupen from "./TabsChoosMethodsCrateCoupen";
import { TabsContent } from "@radix-ui/react-tabs";
import InputNumber from "../components/input-number";
import { toast } from "@/hooks/use-toast";
const CreactCoupenShema = z.object({
  coupenCode: z
    .string()
    .min(1, "It is mandatory to fill in the input")
    .min(5, "Minimum 5 characters")
    .max(10, "Maximum 10 characters"),

  nubmerCoupens: z.string().min(1, "Minimum 5 characters").optional(),
});

type CoupenSubmit = z.infer<typeof CreactCoupenShema>;
function CreateNewCoupen() {
  const [openDialog, setOpenDialog] = useState(false);
  const randomGeneratCode = randomCodeGenerator() || "";

  const initCurrentTabsStateValue = "tab-number";
  const [currentTabs, setCurrentTabs] = useState<string>(
    initCurrentTabsStateValue
  );
  const [dateValue, setDateValue] = useState({});

  useEffect(() => {
    console.info(currentTabs);
  }, [currentTabs]);

  const form = useForm<CoupenSubmit>({
    defaultValues: {
      coupenCode: randomGeneratCode,
      nubmerCoupens: "0",
    },
    resolver: zodResolver(CreactCoupenShema),
    shouldFocusError: true,
  });

  const submitCoupenData = async (data: CoupenSubmit) => {
    const conditionData = currentTabs.includes(initCurrentTabsStateValue);

    const finalyData = {
      codeCoupen: data?.coupenCode,
      coupenNumber: conditionData ? data?.nubmerCoupens : null,
      date: !conditionData ? dateValue||null : null,
    };
    if (finalyData.date === null && finalyData.coupenNumber === null) {
      toast({
        title:"Unsuccessful",
        description:"Creating a coupon with one of the available methods is mandatory",
        className:"toaster-errors"
      })
    }
    console.info(finalyData);
    // try {
    //     const res = await axios.post(`${API_Backend}`)
    // } catch (error) {

    // }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog} modal={false}>
        {/* background blur and dark  */}
        <div
          className={cn(openDialog && "fixed inset-0 bg-black/80 z-40 ")}
        ></div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Coupen</DialogTitle>
            <DialogDescription>
              Here you can create your coupon by choosing one of these methods
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...form}>
            <form className="" onSubmit={form.handleSubmit(submitCoupenData)}>
              <FormField
                control={form.control}
                name="coupenCode"
                render={({ field }) => (
                  <FormItem className="pb-3">
                    <FormControl>
                      <Input
                        maxLength={10}
                        {...field}
                        className="border-zinc-400"
                      ></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nubmerCoupens"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TabsMethodCoupen
                        defaultTab={initCurrentTabsStateValue}
                        currentTabs={(value) => {
                          setCurrentTabs(value);
                        }}
                        tabContentChild={
                          <div className="pt-3">
                            <TabsContent value="tab-number">
                              <InputNumber
                                minNumber={0}
                                maxNumber={3}
                                {...field}
                              />
                            </TabsContent>
                            <TabsContent value="tab-date">
                              <DatePickerInput
                                getDate={(value) => {
                                  setDateValue(value);
                                }}
                              />
                            </TabsContent>
                          </div>
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-7">
                <Button type="submit" onClick={()=>setOpenDialog(false)}>Save changes</Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      <div className="max-md:w-full max-md:flex items-start justify-start">
        <Button
          onClick={() => setOpenDialog(true)}
          variant={"outline"}
          className="btn-outline"
        >
          Create Coupen <Plus />
        </Button>
      </div>
    </>
  );
}

export default CreateNewCoupen;
