import { getData } from "@/app/actions/apiHandler";
import { MyDatatTable } from "@/app/dashboard/components/my-data-table/my-data-table";
import ErrorToast from "@/components/ErrorToast";
import getToken, { GetSession } from "@/lib/auth/getSession";
import ActionTableGroupBtn from "../ActionTableGroupBtn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Params {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
}

async function GroupEditPge({ searchParams, params }: Params) {
  const { id: groupId = "" } = await params;
  const { page: currentPage = "1", search } = await searchParams;
  const { initData, token } = JSON.parse(
    (await getToken()) as string
  ) as GetSession;

  const {
    res: {
      users: { data = [], last_page = 1 },
    },
    errorMessage,
  } = await getData(
    `api/groups/${groupId}/users?page=${currentPage}&search=${search}`,
    token
  );

  const tableBodyData = data?.map((user: Record<string, string>) => ({
    name: user?.name,
    lastName: user?.last_name,
    phone: user?.phone,
    email: user?.email,
    id: user?.id,
    actions: (
      <ActionTableGroupBtn
        key={user?.id}
        groupId={groupId}
        userId={String(user?.id)}
        token={token}
      />
    ),
  }));

  console.log(data);
  return (
    <>
      <ErrorToast
        dependency={errorMessage}
        errorMessagesArray={[errorMessage]}
      />

      <MyDatatTable
        headerItems={[
          { key: "email", label: "Email" },
          { key: "name", label: "Name" },
          { key: "lastName", label: "Last Name" },
          { key: "phone", label: "Phone" },
          { key: "actions", label: "Actions" },
        ]}
        table={{ currentPage, tableBodyData }}
        lastPageForPagination={last_page}
      />
    </>
  );
}

export default GroupEditPge;
