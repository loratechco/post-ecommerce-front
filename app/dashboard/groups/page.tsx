import TableDesc, { TbodyDesc, TdDesc, ThDesc, TheadDesc, TrDesc } from "@/components/table-responsive/TableDesc";
import AddTicketing from "../ticketing/addTicketing";
import SearchComponent from "../ticketing/components/SearchComponent";
import Link from "next/link";
import TableCardsMobile, { ActionBtn, CardTable, ContentTable, WrapContent } from "@/components/table-responsive/TableCardsMobile";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaginationComponent } from "@/components/pagination";
import { apiHandler, getData } from "@/app/actions/apiHandler";
import { cookieName } from "@/lib/auth/storage";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CreateNewGroup from "./CreateNewGroup";
import ActionBtnGroup from "./ActionBtnGroup";


const getGroupList = async (token: string, endpiont: string) => {
    const { res, errorMessage } = await getData(endpiont, token);

    if (errorMessage && !res) {
        return { res: [], errorMessage };
    }
    // else
    return { res, errorMessage }
}

interface Props {
    searchParams: {
        page: string,
        search: string,
    }
}

async function GroupsPage({ searchParams: { page = '1', search = '' }, }: Props) {

    console.log(page, search);
    const coockieStorage = await cookies()
    const { token } = JSON.parse(coockieStorage.get(cookieName)?.value as string)

    // get group List data 
    const { errorMessage, res: { groups } } = await getGroupList(
        token,
        `api/groups?page=${page}&search=${search}`
    )
    const calculateIndexListItems = (index: number) => {
        return ((+page - 1) * 10 + index + 1);
    };
    console.log(errorMessage, groups?.last_page, groups?.data)
    return (
        <>
            <div className='size-full'>
                <SearchComponent
                    token={token}
                >
                    <CreateNewGroup
                        token={token}
                    />
                </SearchComponent>

                <section className='pt-5 w-full'>
                    <TableDesc>
                        <TheadDesc>
                            <TrDesc>
                                <ThDesc title='#' />
                                <ThDesc title='Title' />
                                <ThDesc title='Actions' />
                            </TrDesc>
                        </TheadDesc>

                        <TbodyDesc>
                            {groups?.data.length > 0 ? groups?.data?.map(({
                                id,
                                description,
                                name,
                            }, index: number) => (
                                <TrDesc key={id}>
                                    <TdDesc>
                                        <p className='table-text'>{String(calculateIndexListItems(index))}</p>
                                    </TdDesc>
                                    <TdDesc>
                                        <Link href={`/dashboard/ticketing/${id}`} className='block'>
                                            <p className='table-text truncate overflow-hidden  hover:underline'>{name}</p>
                                        </Link>
                                    </TdDesc>

                                    <TdDesc>
                                        <ActionBtnGroup id={String(id)}
                                            token={token}
                                        />
                                    </TdDesc>
                                </TrDesc>
                            ))
                                : (
                                    <TrDesc>
                                        <TdDesc></TdDesc>
                                        <TdDesc>
                                            <p className='table-text'>There are no group</p>
                                        </TdDesc>
                                    </TrDesc>
                                )}
                        </TbodyDesc>
                    </TableDesc>

                    {/* card box for mobile size  */}
                    <TableCardsMobile >
                        {groups?.data.length > 0 ? groups?.data?.map(({
                            id,
                            description,
                            name,
                        }, index: number) => (
                            <Link href={`/dashboard/ticketing/${id}`} key={id}>
                                <CardTable className="">
                                    <WrapContent>
                                        <ContentTable
                                            content={String(calculateIndexListItems(index))}
                                        />
                                        <ContentTable
                                            className="max-w-[120px]"
                                            content={name}
                                        />
                                    </WrapContent>
                                </CardTable>
                                <ActionBtnGroup id={String(id)}
                                    token={token}
                                />
                            </Link>
                        ))
                            : (<CardTable className="bg-zinc-200">
                                <WrapContent>
                                    <div className="text-black font-semibold">
                                        There are no group
                                    </div>
                                </WrapContent>
                            </CardTable>
                            )
                        }
                    </TableCardsMobile>

                </section>

                <div className="py-7">
                    <PaginationComponent
                        pages={groups?.last_page || 1}
                    />
                </div>
            </div>
        </>
    );
}

export default GroupsPage;