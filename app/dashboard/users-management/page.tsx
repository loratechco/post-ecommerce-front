import { Plus } from "lucide-react";
import Link from "next/link";
import UserListDropDown from "./UserListDropDown";
import { Button } from "@/components/ui/button";
import { MyDatatTable } from "../components/my-data-table/my-data-table";
import getToken, { GetSession } from "@/lib/auth/getSession";
import { getData } from "@/app/actions/apiHandler";

interface Params {
  searchParams: {
    page: string;
    search: string;
  };
}
export default async function UserListPage({ searchParams }: Params) {
  const { page = "1", search = "" } = await searchParams;
  const { token }: GetSession = JSON.parse((await getToken()) as string);

  const { res } = await getData(
    `api/users?search=${search}&page=${page}`,
    token
  );

  return (
    <MyDatatTable
      headerItems={[
        { key: "email", label: "Email" },
        { key: "name", label: "Name" },
        { key: "lastName", label: "Last Name" },
        { key: "phone", label: "Phone" },
      ]}
      table={{
        currentPage: page,
        tableBodyData: res?.data?.data?.map((item) => ({
          name: item?.name,
          urlLink:`/dashboard/users-management/${item?.id ||''}`,
          lastName: item?.last_name,
          phone: item?.phone,
          email: item?.email,
          actions: <UserListDropDown person={item} page={page} token={token} />,
        })),
        customErrorMassage: "There is no data",
      }}
      
      lastPageForPagination={res?.data?.last_page || 1}
      OptionalComponentNextToInput={
        <Link
          href={"/dashboard/users-management/create-user"}
          className="block max-md:w-full"
        >
          <Button className="btn-outline">
            Add User
            <Plus />
          </Button>
        </Link>
      }
    />
  );
}
