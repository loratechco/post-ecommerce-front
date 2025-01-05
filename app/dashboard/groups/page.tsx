import { getData } from "@/app/actions/apiHandler";
import { cookieName } from "@/lib/auth/storage";
import { cookies } from "next/headers";
import CreateNewGroup from "./CreateNewGroup";
import ActionBtnGroup from "./action-btn-group/ActionBtnGroup";
import { MyDatatTable } from "../components/my-data-table/my-data-table";
import { PropsNextPage } from "@/app/types/nextjs-types";

async function GroupsPage({ searchParams }: PropsNextPage) {
  const { page = "1", search = "" } = await searchParams;
  const coockieStorage = await cookies();
  const { token } = JSON.parse(coockieStorage.get(cookieName)?.value as string);

  const { res } = await getData(
    `api/groups?page=${page}&search=${search} `,
    token
  );

  console.info(res);

  return (
    <MyDatatTable
      headerItems={[
        { key: "name", label: "Name" },
        { key: "actions", label: "Actions" },
      ]}
      table={{
        currentPage: page as string,
        tableBodyData: res?.groups?.data?.map((item) => ({
          name: item?.name,
          id: item?.id,
          actions: (
            <ActionBtnGroup
              id={String(item?.id)}
              token={token}
              key={item?.id}
            />
          ),
          urlLink: `/dashboard/groups/edit-user-group/${item?.id || ""}`,
        })),
        customErrorMassage: "There are no groups",
      }}
      lastPageForPagination={res?.groups?.last_page || 1}
      OptionalComponentNextToInput={<CreateNewGroup token={token || ""} />}
    />
  );
}

export default GroupsPage;
