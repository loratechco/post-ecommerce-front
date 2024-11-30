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
import { format } from 'date-fns'
import { PaginationComponent } from '@/components/pagination'

interface TicketList {
    data: {
        id: number;
        user_id: number;
        title: string;
        status: string;
        updated_at: string;
    };
}
async function TicketListPage({ searchParams }: { searchParams: { page: string } }) {
    const cookie = await cookies();
    const { token } = JSON.parse(
        cookie.get(cookieName)?.value as string
    );

    console.log('token=>>>', token);

    // get user list tickets
    const { data, last_page } = await getUserListTickets({ token, currentPage: searchParams.page });
    console.log('last_page=>>>', last_page);
    const dateConvert = (date: string) => {
        return format(new Date(date), 'yyyy/MM/dd HH:mm:ss')
    }
    console.log('data=>>>', data);
    const validData = (data && data.length > 0);

    return (
        <div className='relative size-full'>

            <section className='pt-16'>
                <AddTicketing
                    token={token}
                />
                <TableDesc>
                    <TheadDesc>
                        <TrDesc>
                            <ThDesc title='User Id' />
                            <ThDesc title='Title' />
                            <ThDesc title='created at' />
                            <ThDesc title='status' />
                            <ThDesc title='show ticket' />
                        </TrDesc>
                    </TheadDesc>

                    <TbodyDesc>
                        {validData ? data?.map(({
                            id,
                            user_id,
                            title,
                            status,
                            updated_at
                        }: TicketList['data']) => (
                            <TrDesc key={id}>
                                <TdDesc>
                                    <p className='text-[14px] font-medium'>{id}</p>
                                </TdDesc>
                                <TdDesc>
                                    <p className='text-[14px] font-medium truncate overflow-hidden max-w-[200px]'>{title}</p>
                                </TdDesc>
                                <TdDesc>
                                    <p className='text-[14px] font-medium'>{dateConvert(updated_at)}</p>
                                </TdDesc>
                                <TdDesc>
                                    <p className='text-[14px] font-medium'>{status}</p>
                                </TdDesc>
                                <TdDesc>
                                    <Link href={`/dashboard/ticketing/${id}`} className='text-[14px] font-medium hover:underline'>
                                        Show
                                    </Link>
                                </TdDesc>
                            </TrDesc>
                        ))
                            : (
                                <TrDesc>
                                    <TdDesc >
                                    </TdDesc>
                                    <TdDesc >
                                        There are no tickets yet
                                    </TdDesc>
                                </TrDesc>
                            )}
                    </TbodyDesc>
                </TableDesc>

                {/* card box for mobile size  */}
                <TableCardsMobile >
                    {validData ? data?.map(({
                        id,
                        user_id,
                        title,
                        status,
                        updated_at
                    }: TicketList['data']) => (
                        <CardTable key={id}>
                            <WrapContent>
                                <ContentTable
                                    content={String(user_id)}
                                />
                                <ContentTable
                                    content={title}
                                    className='truncate overflow-hidden max-w-[200px]'
                                />
                                <ContentTable
                                    content={status}
                                />
                                <ContentTable
                                    content={dateConvert(updated_at)}
                                />
                            </WrapContent>
                        </CardTable>
                    ))
                        : (<CardTable className="bg-zinc-200">
                            <WrapContent>
                                <div className="text-black font-semibold">
                                    There are no tickets yet
                                </div>
                            </WrapContent>
                        </CardTable>
                        )
                    }
                </TableCardsMobile>

            </section>

            <div className="pt-7">
                <PaginationComponent
                    pages={last_page}
                />
            </div>
        </div>
    );
}

export default TicketListPage;