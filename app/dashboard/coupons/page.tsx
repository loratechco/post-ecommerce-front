import getSession from "@/lib/auth/getSession";

import { MyDatatTable } from "../components/my-data-table/my-data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateNewCoupen from "./CreatNewCoupen";

export default async function CouponsPage() {
  const session = await getSession();

  const { token } = JSON.parse(session as string);

  const groups = { data: [] };
  return (
     <>
     {/* <ErrorToast 
     
     /> */}
         <MyDatatTable
        headerItems={[
          { key: "email", label: "Email" },
          { key: "name", label: "Name" },
          { key: "lastName", label: "Last Name" },
          { key: "phone", label: "Phone" },
        ]}
        table={{
          currentPage: "1",
          tableBodyData: []?.map((item) => ({
            name: item?.name,
            lastName: item?.last_name,
            phone: item?.phone,
            email: item?.email,
          })),
          customErrorMassage: "There is no data",
        }}
        lastPageForPagination={1}
        OptionalComponentNextToInput={
            <CreateNewCoupen />
        }
      />
     </>

  );
}
