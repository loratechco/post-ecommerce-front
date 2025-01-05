"use client";

import { useState, useCallback, useEffect, useMemo } from "react";

interface SwitchItem {
  id: string;
  name: string;
  can?: boolean;
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/auth/useSession";
import { useToast } from "@/hooks/use-toast";
import { getUserPermissions } from "@/app/actions/userListActions";
import { AccardionSkeleton } from "@/components/skeletons/AccardionSkeleton";
import { API_Backend } from "@/hooks/use-fetch";
import axios from "axios";

// The main component
export default function Permission({ userId }: { userId: string }) {
  const { toast } = useToast();
  const { token } = useSession();

  const [accordionData, setAccordionData] = useState<JSX.Element[] | null>(
    null
  );
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});
  const [initialStateSet, setInitialStateSet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle switch toggle
  const handleSwitchChange = useCallback((id: string, checked: boolean) => {
    setSwitchStates((prev) => {
      const newState = { ...prev, [id]: checked };
      return newState;
    });
  }, []);

  //get data
  useEffect(() => {
    getUserPermissions(userId, token)
      .then((data) => {
        if (Array.isArray(data)) {
          setAccordionData(data);
          console.log(data);
          setIsLoading(true);
        } else {
          console.error("Data received is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
      });
  }, [userId, token]);

  useEffect(() => {
    if (!initialStateSet && accordionData && Array.isArray(accordionData)) {
      const initialSwitchStates: Record<string, boolean> = {};

      accordionData?.forEach((item: any) => {
        if (!Array.isArray(item?.switches)) return;

        item?.switches?.forEach((switchItem: any) => {
          // تنظیم وضعیت اولیه بر اساس مقدار can
          initialSwitchStates[switchItem.id] = switchItem?.can || false;
        });
      });

      setSwitchStates(initialSwitchStates);
      setInitialStateSet(true);
    }
  }, [accordionData, initialStateSet]);

  const handleSend = useCallback(async () => {
    const activePermissions = Object.entries(switchStates)
      .filter(([, isActive]) => isActive)
      .map(([id]) => id);

    console.log(activePermissions);

    try {
      const res = await axios.post(
        `${API_Backend}/api/permissions/assign-to-user`,
        {
          user_id: userId,
          permissions: activePermissions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "Successful",
        description: res?.data?.message || "Send data is successful",
        duration: 3000,
        className: "bg-green-200 text-green-800",
      });
    } catch (error: any) {
      toast({
        description: error?.response?.data?.message,
        duration: 3000,
        className: "bg-red-200 text-red-800",
      });
      console.log(error);
    }
  }, [switchStates, userId, token, toast]);

  const dynamicAccordionItem = useMemo(() => {
    if (!accordionData || !Array.isArray(accordionData)) return null;

    return accordionData.map((item: any) => (
      <AccordionItem
        key={item.id}
        value={item.id}
        className="border-0 my-2 px-3 last:py-1 rounded-xl bg-[#e4e4e7] "
      >
        <AccordionTrigger className="font-bold [&[data-state=open]]:underline">
          {item.title || "Untitled"}
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div className="">
            {Array.isArray(item?.switches) &&
              item.switches.map((switchItem: SwitchItem) => {
                const isChecked = switchStates[switchItem.id] ?? false;
                return (
                  <div
                    key={switchItem.id}
                    className="flex items-center justify-between py-4 italic"
                  >
                    <Label
                      htmlFor={switchItem.id}
                      className="cursor-pointer select-none"
                    >
                      {switchItem.name}
                    </Label>
                    <Switch
                      className="data-[state=unchecked]:!bg-gray-400"
                      id={switchItem?.id}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleSwitchChange(switchItem?.id, checked)
                      }
                    />
                  </div>
                );
              })}
          </div>
        </AccordionContent>
      </AccordionItem>
    ));
  }, [accordionData, switchStates, handleSwitchChange]);

  return (
    <div className="w-full pt-3">
      <Accordion type="single" collapsible className="w-full">
        {!isLoading ? <AccardionSkeleton /> : dynamicAccordionItem}
      </Accordion>

      <Button onClick={handleSend} className="w-[6rem] mt-3">
        Send
      </Button>
    </div>
  );
}
