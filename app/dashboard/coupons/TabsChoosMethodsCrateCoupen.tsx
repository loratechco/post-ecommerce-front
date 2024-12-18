import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerInput } from "./DateInput";
import { useState } from "react";

export default function TabDemo({
  currontTabs,
}: {
  currontTabs: (value: string) => void;
}) {

    const TABS_DATA=["tab-date, tab-number"];
  return (
    <Tabs defaultValue="tab-1">
      <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
        {TABS_DATA.map((tabValue, index) => (
          <TabsTrigger
            onClick={() => currontTabs(tabValue)}
            value={tabValue}
            className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            Tab 1
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="tab-1">
        <DatePickerInput />
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 text-center text-xs text-muted-foreground">
          Content for Tab 2
        </p>
      </TabsContent>
    </Tabs>
  );
}
