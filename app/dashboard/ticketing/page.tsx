import Link from 'next/link'
import { ArrowRight, MoreHorizontal, Plus, Search } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import SearchComponent from './components/SearchComponent'

interface TicketList {
    data: {
        id: number;
        user_id: number;
        title: string;
        status: string;
        updated_at: string;
    };
}
async function TicketListPage({ searchParams }: { searchParams: { page: string, search: string } }) {
    const { page, search } = await searchParams;
    const cookie = await cookies();
    const { token } = JSON.parse(
        cookie.get(cookieName)?.value as string
    );

    console.log('token=>>>', token);

    // get user list tickets
    const { data: { data, last_page }, } = await getUserListTickets({
        token,
        currentPage: searchParams.page,
        search: searchParams.search
    });
    const dateConvert = (date: string) => {
        return format(new Date(date), 'yyyy/MM/dd HH:mm:ss')
    }
    console.log('data=>>>', data?.data);
    const validData = (data && data.length > 0);

    return (
        <div className='size-full'>
            <SearchComponent
                token={token}
            >
                <div className="max-md:w-full">
                    <AddTicketing
                        token={token}
                    />
                </div>
            </SearchComponent>

            <section className='pt-7 w-full'>
                <TableDesc>
                    <TheadDesc>
                        <TrDesc>
                            <ThDesc title='#' />
                            <ThDesc title='Title' />
                            <ThDesc title='created at' />
                            <ThDesc title='status' />
                        </TrDesc>
                    </TheadDesc>

                    <TbodyDesc>
                        {validData ? data?.map(({
                            id,
                            title,
                            status,
                            updated_at
                        }: TicketList['data'], index: number) => (
                            <TrDesc key={id}>
                                <TdDesc>
                                    <p className='table-text'>{index + 1}</p>
                                </TdDesc>
                                <TdDesc>
                                    <Link href={`/dashboard/ticketing/${id}`} className='block'>
                                        <p className='table-text  truncate overflow-hidden  hover:underline'>{title}</p>
                                    </Link>
                                </TdDesc>
                                <TdDesc>
                                    <p className='table-text text-center'>{dateConvert(updated_at)}</p>
                                </TdDesc>
                                <TdDesc>
                                    <p className='table-text text-center'>{status}</p>
                                </TdDesc>

                            </TrDesc>
                        ))
                            : (
                                <TrDesc>
                                    <TdDesc ></TdDesc>
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
                        title,
                        status,
                        updated_at
                    }: TicketList['data'], index: number) => (
                        <CardTable key={id}>
                            <WrapContent>
                                <ContentTable
                                    content={String(index + 1)}
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