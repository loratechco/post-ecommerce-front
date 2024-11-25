import Link from 'next/link'
import { MoreHorizontal, Plus } from 'lucide-react'
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

import { getUserListTickets } from '@/app/actions/adminTicketingActions'
import { cookies } from 'next/headers'
import { cookieName } from '@/lib/auth/storage'
import { Button } from '@/components/ui/button'
import AddTicketing from './addTicketing'
// import { useSession } from '@/lib/auth/useSession'


async function TicketListPage() {
    // const token = useSession() as string;
    const cookie = await cookies();
    const token = cookie.get(cookieName)?.value as string;

    const fetchTickets = async () => {
        const res = await getUserListTickets({ token });
        console.log('res======>>:)', res);
    }
    const data: any = await fetchTickets() as any || [];


    return (
        <div className='relative size-full'>

            <section className='pt-16'>
                <AddTicketing />
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
                        {data.length > 0 ? data?.map((person: any) => (
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
                        ))
                            : (<CardTable className="bg-transparent">
                                <WrapContent>
                                    <div className="text-black font-semibold ps-5">
                                        There are no tickets yet
                                    </div>
                                </WrapContent>
                            </CardTable>
                            )}
                    </TbodyDesc>
                </TableDesc>


                {/* card box for mobile size  */}
                <TableCardsMobile >
                    {data.length > 0 ? data?.map((person: any) => (
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
                    ))
                        : (<CardTable className="bg-zinc-100">
                            <WrapContent>
                                <div className="text-black font-semibold">
                                    There are no tickets yet
                                </div>
                            </WrapContent>
                        </CardTable>)
                    }
                </TableCardsMobile>

            </section>

        </div>
    );
}

export default TicketListPage;