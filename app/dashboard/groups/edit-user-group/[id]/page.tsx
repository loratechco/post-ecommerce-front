import { getData } from "@/app/actions/apiHandler";
import { MyDatatTable } from "@/app/dashboard/components/my-data-table/my-data-table";
// import ErrorToast from "@/components/ErrorToast";
import getToken, { GetSession } from "@/lib/auth/getSession";
import ActionTableGroupBtn from "../ActionTableGroupBtn";
import { Params } from "@/app/types/nextjs-types";

async function GroupEditPge({
  searchParams,
  params,
}: {
  params: Params;
  searchParams: Promise<Record<string, string>>;
}) {
  const { id: groupId = "" } = await params;
  const { page: currentPage = "1", search } = await searchParams;
  const { token } = JSON.parse((await getToken()) as string) as GetSession;

  const { res } = await getData(
    `api/groups/${groupId}/users?page=${currentPage}&search=${search}`,
    token
  );
  const tableBodyData = res?.users?.data?.map(
    (user: Record<string, string>) => ({
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
    })
  );

  return (
    <>
      {/* <ErrorToast
        dependency={errorMessage}
        errorMessagesArray={[errorMessage]}
      /> */}

      <MyDatatTable
        headerItems={[
          { key: "email", label: "Email" },
          { key: "name", label: "Name" },
          { key: "lastName", label: "Last Name" },
          { key: "phone", label: "Phone" },
          { key: "actions", label: "Actions" },
        ]}
        table={{ currentPage, tableBodyData }}
        lastPageForPagination={res?.users?.last_page || 1}
      />
    </>
  );
}

export default GroupEditPge;
