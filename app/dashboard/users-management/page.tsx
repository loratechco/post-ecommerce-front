import { userListFetch } from "@/app/actions/userListActions";
import ErrorToast from "@/components/ErrorToast";
import { PaginationComponent } from "@/components/pagination";
import TableCardsMobile, { ActionBtn, CardTable, ContentTable, WrapContent } from "@/components/table-responsive/TableCardsMobile";
import TableDesc, { TbodyDesc, TdDesc, ThDesc, TheadDesc, TrDesc } from "@/components/table-responsive/TableDesc";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cookieName } from "@/lib/auth/storage";
import { MoreHorizontal, Plus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import UserListDropDown from "./UserListDropDown";
import { Button } from "@/components/ui/button";

interface Params {
    searchParams: {
        page: string,
        search: string
    }
}
export default async function UserListPage({ searchParams }: Params) {

    const { page = '1' } = await searchParams;
    const cookieStore = await cookies();
    const { token } = JSON.parse(cookieStore.get(cookieName)?.value as string);

    const { success, data, error } = await userListFetch({ pageQuery: page, token });

    const userListData = {
        data: data?.data || [],
        totalPages: data?.last_page || 1
    };

    const validData = (userListData?.data && userListData?.data.length > 0);

    const deleteUser = async (person: any) => {
        console.log(person);
    }

    return (
        <section className="w-full">
            {/* create new user */}
            <Link href={'/dashboard/users-management/create-user'}>
                <Button className='btn-outline'>Add User <Plus /></Button>
            </Link>
            {error &&
                <ErrorToast
                    errorMessagesArray={[error]}
                    dependency={error}
                />
            }

            <TableDesc>
                <TheadDesc>
                    <TrDesc>
                        <ThDesc title='Name' />
                        <ThDesc title='Email' />
                        <ThDesc title='Phone' />
                        <ThDesc title='actions' />
                    </TrDesc>
                </TheadDesc>

                <TbodyDesc>
                    {
                        validData ?
                            userListData?.data?.map((person) => (
                                <TrDesc key={person?.id}>
                                    <TdDesc>
                                        <p className='table-text'>{person?.name}</p>
                                    </TdDesc>
                                    <TdDesc>
                                        <p className='table-text'>{person?.email}</p>
                                    </TdDesc>
                                    <TdDesc>
                                        <p className='table-text'>{person?.phone}</p>
                                    </TdDesc>
                                    <TdDesc>
                                        <UserListDropDown person={person} page={page} token={token} />
                                    </TdDesc>
                                </TrDesc>
                            )) :

                            (<TrDesc>
                                <TdDesc></TdDesc>
                                <TdDesc>
                                    <p className='font-semibold table-text p-3'></p>
                                </TdDesc>
                            </TrDesc>
                            )
                    }
                </TbodyDesc>
            </TableDesc>

            <TableCardsMobile >
                {validData && userListData?.data?.map((person) => (
                    <CardTable key={person?.id}>
                        <WrapContent>
                            <ContentTable
                                content={person?.name}
                            />
                            <ContentTable
                                content={person?.email}
                            />
                        </WrapContent>
                        <UserListDropDown person={person} page={page} token={token} />

                    </CardTable>
                )) || (
                        <CardTable >
                            <WrapContent>
                                <ContentTable
                                    content={''}
                                />
                            </WrapContent>
                        </CardTable>
                    )
                }
            </TableCardsMobile>

            <div className="pt-7">
                <PaginationComponent
                    pages={userListData?.totalPages || 1}
                />
            </div>
        </section >
    )
}