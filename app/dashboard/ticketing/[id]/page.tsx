import TicketChat from "@/components/chat/TicketChat";
import { cookies } from "next/headers";
import { cookieName } from "@/lib/auth/storage";
// import { getTicket } from "@/app/actions/chatTicketing";
import { Params } from "@/app/types/nextjs-types";
import { getData } from "@/app/actions/apiHandler";

interface Props {
  params: Params;
}

export default async function TicketChatPage({ params }: Props) {
  const cookie = await cookies();
  const sessionData = JSON.parse(cookie.get(cookieName)?.value as string);
  const { id } = await params;
  const { res } = await getData(
    `api/tickets/${id}/messages`,
    sessionData?.token
  );

  console.info(res);
  return (
    <div className="h-[calc(100vh-6.2rem)] p-1  relative w-full">
      <div
        style={{ wordWrap: "break-word", wordBreak: "break-word" }}
        className="w-full"
      >
        <h1 className="text-2xl font-bold mb-7 w-full">
          {res?.title || `Ticket Support Chat`}
        </h1>
      </div>

      <div className="h-[calc(100%-3rem)] border-t border-zinc-300">
        <TicketChat
          id={id}
          sessionData={sessionData}
          ticketData={res?.messages || []}
          errorMessage={""}
        />
      </div>
    </div>
  );
}
