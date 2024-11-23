import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import TableDesc from '@/components/table-responsive/TableDesc'
import {
    TheadDesc,
    TbodyDesc,
    TrDesc,
    ThDesc,
    TdDesc,
} from '@/components/table-responsive/TableDesc'

import TableCardsMobile from '@/components/table-responsive/TableCardsMobile'
import {
    CardTable,
    WrapContent,
    ContentTable,
    ActionBtn,
} from '@/components/table-responsive/TableCardsMobile';

function TicketListPage() {
    return (
        <>
            <TableDesc>
                <TheadDesc>
                    <TrDesc>
                        <ThDesc title='User' />
                        <ThDesc title='Title' />
                        <ThDesc title='actions' />
                        <ThDesc title='status' />
                        <ThDesc title='created at' />
                    </TrDesc>
                </TheadDesc>

                <TbodyDesc>
                    {[""]?.map((person) => (
                        <Link href={`/dashboard/ticketing/${person}`}>
                            <TrDesc key={person?.id}>
                                <TdDesc>
                                    <p>{person?.name}</p>
                                </TdDesc>
                                <TdDesc>
                                    <p>{person?.email}</p>
                                </TdDesc>
                                <TdDesc>
                                    <p>{person?.phone}</p>
                                </TdDesc>
                            </TrDesc>
                        </Link>
                    ))}
                </TbodyDesc>
            </TableDesc>

            {/* card box for mobile size  */}
            <TableCardsMobile >
                {['']?.map((person) => (
                    <CardTable key={person?.id}>
                        <WrapContent>
                            <ContentTable
                                content={person?.name}
                            />
                            <ContentTable
                                content={person?.email}
                            />
                        </WrapContent>
                    </CardTable>
                ))}
            </TableCardsMobile>
        </>
    );
}

export default TicketListPage;