import { getData } from "@/app/actions/apiHandler";
import CreateNewGroup from "./CreateNewGroup";
// import ActionBtnGroup from "./action-btn-group/ActionBtnGroup";
import { MyDatatTable } from "../components/my-data-table/my-data-table";
import { PropsNextPage } from "@/app/types/nextjs-types";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Skeleton from "../components/Skeleton";
import getToken, { GetSession } from "@/lib/auth/getSession";
const LazyComponentActionBtnGroup = dynamic(() => import("./action-btn-group/ActionBtnGroup"));

async function GroupsPage({ searchParams }: PropsNextPage) {
  const { page = "1", search = "" } = await searchParams;
  const tokenStore: GetSession = JSON.parse((await getToken()) as string);

  const { res } = await getData(
    `api/groups?page=${page}&search=${search} `,
    tokenStore?.token || ''
  );

  return (
    <Suspense fallback={<Skeleton/>}>
      <MyDatatTable
        headerItems={[
          { key: "name", label: "Name" },
          { key: "actions", label: "Actions" },
        ]}
        table={{
          currentPage: page as string,
          tableBodyData: res?.groups?.data?.map((item, index) => ({
            name: item?.name,
            id: item?.id || index,
            actions: (
              <LazyComponentActionBtnGroup
                id={String(item?.id)}
                token={tokenStore?.token || ''}
                key={item?.id}
              />
            ),
          })),
          customErrorMassage: "There are no groups",
        }}
        lastPageForPagination={res?.groups?.last_page || 1}
        OptionalComponentNextToInput={<CreateNewGroup token={tokenStore?.token || ''} />}
      />
    </Suspense>
  );
}

export default GroupsPage;
