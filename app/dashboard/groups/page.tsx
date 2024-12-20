import TableDesc, {
  TbodyDesc,
  TdDesc,
  ThDesc,
  TheadDesc,
  TrDesc,
} from "@/components/table-responsive/TableDesc";
import SearchComponent from "../components/SearchComponent";
import Link from "next/link";
import TableCardsMobile, {
  CardTable,
  ContentTable,
  WrapContent,
} from "@/components/table-responsive/TableCardsMobile";
import { PaginationComponent } from "@/components/pagination";
import { getData } from "@/app/actions/apiHandler";
import { cookieName } from "@/lib/auth/storage";
import { cookies } from "next/headers";
import CreateNewGroup from "./CreateNewGroup";
import ActionBtnGroup from "./action-btn-group/ActionBtnGroup";
import { MyDatatTable } from "../components/my-data-table/my-data-table";

interface Props {
  searchParams: {
    page: string;
    search: string;
  };
}

async function GroupsPage({
  searchParams
}: Props) {
  const { page = "1", search = "" } = await searchParams;
  const coockieStorage = await cookies();
  const { token } = JSON.parse(coockieStorage.get(cookieName)?.value as string);

  const { res, errorMessage } = await getData(
    `api/groups?page=${page}&search=${search} `,
    token
  );

  return (
    <>
      <MyDatatTable
        headerItems={[
          { key: "name", label: "Name" },
          { key: "actions", label: "Actions" },
        ]}
        table={{
          currentPage: page,
          tableBodyData: res?.groups?.data?.map((item) => ({
            name: item?.name,
            actions: <ActionBtnGroup id={String(item?.id)} token={token} key={item?.id}/>,
            urlLink: `/dashboard/groups/edit-user-group/${item?.id || ""}`,
          })),
          customErrorMassage: "There are no groups",
        }}
        lastPageForPagination={res?.groups?.last_page || 1}
        OptionalComponentNextToInput={
        <CreateNewGroup token={token || ""} />
      }
      />
    </>
  );
}

export default GroupsPage;
