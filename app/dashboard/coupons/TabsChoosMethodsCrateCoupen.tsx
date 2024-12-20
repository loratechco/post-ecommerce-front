"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerInput } from "./DateInput";
import { memo, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import InputNumber from "../components/input-number";

function TabDemo({
  currentTabs,
  tabContentChild,
  defaultTab
}: {
  tabContentChild?: ReactNode,
  defaultTab: string,
  currentTabs:(value:string)=>void
}) {
 
  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
        <TabsTrigger
          onClick={() => currentTabs("tab-number")}
          value={"tab-number"}
          onChangeCapture={() => console.info("chagne")}
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          Number
        </TabsTrigger>

        <TabsTrigger
          onClick={() => currentTabs("tab-date")}
          value={"tab-date"}
          onChangeCapture={() => console.info("chagne")}
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          Date
        </TabsTrigger>
      </TabsList>

      {tabContentChild}
      
    </Tabs>
  );
}
export default TabDemo;
