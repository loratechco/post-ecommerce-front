import { string } from "zod";
import TabsListProfile from "./tab-profile/TabsList";


interface Params {
    id: string
}

function EditePofile(
    { id }: Params
) {
    return (
        <TabsListProfile userId={id} />
    );
}

export default EditePofile;