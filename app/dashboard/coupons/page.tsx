
import { UserData } from "@/app/types/api-data";
import { MyDatatTable } from "../components/my-data-table/my-data-table";
import CreateNewCoupen from "./CreatNewCoupen";
export default async function CouponsPage() {
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
          tableBodyData: []?.map((item: UserData) => ({
            name: item?.name,
            lastName: item?.last_name,
            phone: item?.phone,
            email: item?.email,
          }) as any),
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
