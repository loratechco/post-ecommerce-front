import { getData } from "@/app/actions/apiHandler";
import { MyDatatTable, calculateIndexListItems } from "@/app/dashboard/components/my-data-table/my-data-table";
import ErrorToast from "@/components/ErrorToast";
import { CardTable, ContentTable, WrapContent } from "@/components/table-responsive/TableCardsMobile";
import { TdDesc, TrDesc } from "@/components/table-responsive/TableDesc";
import getToken, { GetSession } from "@/lib/auth/getSession";
import { number, object } from "zod";

interface Params {
    params: {
        id: string;
    }
    searchParams: Record<string, string>;
}

async function GroupEditPge({
    searchParams,
    params
}: Params) {
    const { id } = await params;
    const { page = '1', search } = await searchParams;
    const { initData, token } = JSON.parse((await getToken()) as string) as GetSession

    const { res: { users: { data = [], last_page = 1 } }, errorMessage } = await getData(
        `api/groups/${id}/users?page=${page}&search=${search}`,
        token,
    )

    return (
        <>
            <ErrorToast
                dependency={errorMessage}
                errorMessagesArray={[errorMessage]}
            />
            <MyDatatTable
                headerItems={
                    [
                        '#',
                        'Email',
                        'Name',
                        'Last Name',
                        'Phone'
                    ]
                }

                tablebodyChildren=
                {
                    data?.length > 1
                        ? data?.map((items: object, index) => (
                            <TrDesc key={items?.id}>
                                <TdDesc>{calculateIndexListItems(index, page)}</TdDesc>
                                <TdDesc>{items?.email}</TdDesc>
                                <TdDesc>{items?.name}</TdDesc>
                                <TdDesc>{items?.last_name}</TdDesc>
                                <TdDesc>{items?.phone}</TdDesc>
                            </TrDesc>
                        ))
                        : <TdDesc>There is no user</TdDesc>
                }
                cardBodyChildren=
                {
                    data?.length > 1
                        ? data?.map((items: object) => (

                            <CardTable key={items?.id}>
                                <WrapContent>
                                    <ContentTable content={items.name as string} />
                                </WrapContent>
                            </CardTable>
                        ))
                        : (<CardTable>
                            <WrapContent>
                                <ContentTable content="There is no user" />
                            </WrapContent>
                        </CardTable>)

                }
                lastPageForPagination={last_page}
            />
        </>
    );
}

export default GroupEditPge;