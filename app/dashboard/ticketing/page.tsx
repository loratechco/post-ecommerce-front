import AddTicketing from "./addTicketing";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { MyDatatTable } from "../components/my-data-table/my-data-table";
import { getData } from "@/app/actions/apiHandler";
import getToken, { GetSession } from "@/lib/auth/getSession";
interface TicketList {
  id: number;
  user_id: number;
  title: string;
  status: string;
  updated_at: string;
}

const dateConvert = (date: string) => {
  return format(new Date(date), "yyyy/MM/dd HH:mm:ss");
};

type BadgeStatus = "open" | "pending" | "closed";

const badgeChecker = (badgeStatus: BadgeStatus) => {
  switch (badgeStatus) {
    case "open":
      return "bg-emerald-600 hover:bg-emerald-700";
    case "pending":
      return "bg-yellow-600 hover:bg-yellow-700";
    case "closed":
      return "bg-red-600 hover:bg-red-700";
    default:
      "bg-zinc-600 hover:bg-zinc-700";
      break;
  }
};

async function TicketListPage({
  searchParams,
}: {
  searchParams: { page: string; search: string };
}) {
  const { page = "1", search = "" } = await searchParams;

  const { token }: GetSession = JSON.parse((await getToken()) as string);

  const { res } = await getData(
    `api/tickets?page=${page}&search=${search}`,
    token
  );

  const resultData = res || res?.data?.data.length > 0 ? res?.data : [];

  const tableBodyData = resultData?.data?.map((item: TicketList) => ({
    title: item?.title,
    createdAt: dateConvert(item?.updated_at),
    urlLink: `/dashboard/ticketing/${item?.id}` || "",
    statusTickets: item?.status || "",
    badge: {
      badgeValue: item?.status,
      badgeClassname: cn(
        "px-2 pt-0.5 pb-1 shadow-none ",
        badgeChecker((item?.status || "") as BadgeStatus)
      ),
    },
  }));

  return (
    <MyDatatTable
      headerItems={[
        { key: "title", label: "Title" },
        { key: "createdAt", label: "created at" },
        { key: "statusTickets", label: "Status" },
      ]}
      table={{
        currentPage: page,
        tableBodyData,
        customErrorMassage: "There is no data",
      }}
      lastPageForPagination={resultData?.last_page || 1}
      OptionalComponentNextToInput={
        <div className="max-md:w-full max-md:flex justify-start">
          <AddTicketing token={token} />
        </div>
      }
    />
  );
}

export default TicketListPage;
