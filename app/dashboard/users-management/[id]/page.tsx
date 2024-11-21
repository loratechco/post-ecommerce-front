import { string } from "zod";
import TabsListProfile from "./tab-profile/TabsList";

interface Props {
    params: {
        id: string
    }
}

async function EditePofile({ params }: Props) {
    const { id } = await params;
    return (
        <TabsListProfile userId={id} />
    );
}

export default EditePofile;