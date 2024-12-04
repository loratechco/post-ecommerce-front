import { userListFetch } from "@/app/actions/userListActions";
import ErrorToast from "@/components/ErrorToast";
import { PaginationComponent } from "@/components/pagination";
import TableCardsMobile, { CardTable, ContentTable, WrapContent } from "@/components/table-responsive/TableCardsMobile";
import TableDesc, { TbodyDesc, TdDesc, ThDesc, TheadDesc, TrDesc } from "@/components/table-responsive/TableDesc";
import { cookieName } from "@/lib/auth/storage";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import UserListDropDown from "./UserListDropDown";
import { Button } from "@/components/ui/button";
import SearchComponent from "../ticketing/components/SearchComponent";

interface Params {
    searchParams: {
        page: string,
        search: string
    }
}
export default async function UserListPage({ searchParams }: Params) {

    const { page = '1', search = '' } = await searchParams;
    const cookieStore = await cookies();
    const { token } = JSON.parse(cookieStore.get(cookieName)?.value as string);

    const { success, data, error } = await userListFetch({
        pageQuery: page,
        token,
        query: search

    });

    const userListData = {
        data: data?.data || [],
        totalPages: data?.last_page || 1
    };

    const validData = (userListData?.data && userListData?.data.length > 0);

    return (
        <section className="w-full space-y-5">
            {/* create new user */}

            <SearchComponent token={token}>
                <Link href={'/dashboard/users-management/create-user'} className="block max-md:w-full">
                    <Button className='btn-outline'>
                        Add User
                        <Plus />
                    </Button>
                </Link>
            </SearchComponent>

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
                                    <p className='font-semibold table-text p-1'>User not found</p>
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
                            <ContentTable
                                content={person?.phone}
                            />
                        </WrapContent>
                        <UserListDropDown person={person} page={page} token={token} />
                    </CardTable>
                )) || (
                        <CardTable >
                            <WrapContent>
                                <ContentTable
                                    content={'User not found'}
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