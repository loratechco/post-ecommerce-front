import SearchComponent from "../ticketing/components/SearchComponent";


import TableCardsMobile, { ActionBtn, CardTable, ContentTable, WrapContent } from "@/components/table-responsive/TableCardsMobile";
import { PaginationComponent } from "@/components/pagination";
import { apiHandler, getData } from "@/app/actions/apiHandler";
import { cookieName } from "@/lib/auth/storage";
import TableDesc, { TbodyDesc, TdDesc, ThDesc, TheadDesc, TrDesc } from "@/components/table-responsive/TableDesc";
import { Link } from "lucide-react";
import ActionBtnGroup from "../groups/action-btn-group/ActionBtnGroup";
import { cookies } from "next/headers";
import getSession from "@/lib/auth/getSession";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


export default async function CouponsPage() {

    const session = await getSession();

    const { token } = JSON.parse(session as string)

    const groups = { data: [] }
    return (
        <div className='size-full'>
            <SearchComponent
                token={token}
            >
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="btn-outline">create coupon</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    defaultValue="Pedro Duarte"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    defaultValue="@peduarte"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
                        <Link href={`#`} key={id}>
                            <CardTable className="">
                                <WrapContent>
                                    <ContentTable
                                        content={String('calculateIndexListItems(index)')}
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
    )
}