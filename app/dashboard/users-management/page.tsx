import { Plus } from "lucide-react";
import Link from "next/link";
import UserListDropDown from "./UserListDropDown";
import { Button } from "@/components/ui/button";
import { MyDatatTable } from "../components/my-data-table/my-data-table";
import getToken, { GetSession } from "@/lib/auth/getSession";
import { getData } from "@/app/actions/apiHandler";
import { UserData } from "@/app/types/api-data";

import { PropsNextPage } from "@/app/types/nextjs-types";

export default async function UserListPage({ searchParams }: PropsNextPage) {
  const { page = "1", search = "" } = await searchParams;
  const tokenStore: GetSession = JSON.parse((await getToken()) as string);

  const { res } = await getData(
    `api/users?search=${search}&page=${page}`,
    tokenStore?.token||''
  );

  return (
    <MyDatatTable
      headerItems={[
        { key: "email", label: "Email" },
        { key: "name", label: "Name" },
        { key: "lastName", label: "Last Name" },
        { key: "phone", label: "Phone" },
        { key: "actions", label: "Actions" },
      ]}
      table={{
        currentPage: page as string,
        tableBodyData: res?.data?.data?.map((item: UserData) => ({
          id: item?.id,
          name: item?.name,
          lastName: item?.last_name,
          phone: item?.phone,
          email: item?.email,
          actions: <UserListDropDown person={item} />,
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
