import { PropsNextPage } from "@/app/types/nextjs-types";
import TabsListProfile from "./tab-profile/TabsList";

async function EditePofile({ params }: PropsNextPage) {
    const { id } = await params;
    return (
        <TabsListProfile userId={id} />
    );
}

export default EditePofile;