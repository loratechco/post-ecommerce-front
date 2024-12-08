'use client'
import { ActionBtn } from "@/components/table-responsive/TableCardsMobile";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    id: string;
    token: string
}

function ActionBtnGroup(props: Props) {

    const roter = useRouter()

    const deletGroupHandler = async () => {
        try {

            await axios.delete(`http://app.api/api/groups/${props?.id || ''}`, {
                headers: {
                    Authorization: `Bearer ${props?.token || ''}`
                }
            })

            // To show new items after successful deletion
            roter?.refresh();
            toast({
                title: 'Successful',
                description: 'The group was successfully deleted',
                className: 'toaser-successfuls',
            })

        } catch (error) {

            toast({
                title: 'Unsuccessful',
                description: 'The group could not be deleted, something went wrong.',
                className: 'toaser-errors',
            })
        }
    }
    const currentPath = usePathname();
    return (
        <ActionBtn
            handleDelete={deletGroupHandler}
            hrefEdit={currentPath}
            userId={props?.id || ''}
        />
    );
}

export default ActionBtnGroup;