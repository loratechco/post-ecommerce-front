import { Link, MoreHorizontal } from 'lucide-react'
import Wallet from '@/components/Wallet'
import TableCardsMobile, { ActionBtn, ContentTable, WrapContent, CardTable } from '@/components/table-responsive/TableCardsMobile'
import { TdDesc } from '@/components/table-responsive/TableDesc'
import { TbodyDesc } from '@/components/table-responsive/TableDesc'
import { TrDesc } from '@/components/table-responsive/TableDesc'
import { TheadDesc } from '@/components/table-responsive/TableDesc'
import { ThDesc } from '@/components/table-responsive/TableDesc'
import TableDesc from '@/components/table-responsive/TableDesc'
import { DropdownMenu, DropdownMenuLabel, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { LineChartCard } from '@/components/LineChartCard'
import { ChartConfig } from '@/components/ui/chart'

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


export default function WalletPage() {
    const samplePurchaseTime = new Date()
    const sampleDeliveryTime = new Date()
    sampleDeliveryTime.setDate(sampleDeliveryTime.getDate() + 7)

    const validData = null
    return (
        <div className="w-full">
            <div className="flex items-center justify-between max-lg:flex-col">
                <div className='w-1/2 max-lg:w-full'>
                    <Wallet />
                </div>

                <div className='w-1/2 max-lg:w-full'>
                    {/* <LineChartCard
                        title="Line Chart - Dots"
                        description="January - June 2024"
                        data={chartData}
                        config={chartConfig}
                    /> */}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold ">Invoices </h2>
                {/* table for desctop  */}
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
                            validData
                            && userListData?.data?.map((person) => (
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
                                    <TdDesc>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild >
                                                <button type='button' className="h-8 w-8 p-0 ">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4 bg-transparent" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <Link href={`/dashboard/users-management/${person?.id}`}>
                                                    <DropdownMenuItem >Edit</DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem onClick={() => deleteUser(person)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TdDesc>
                                </TrDesc>
                            )) ||
                            (<TrDesc>
                                <TdDesc></TdDesc>
                                <TdDesc>
                                    <p className='font-semibold text- px-3'>user not found</p>
                                </TdDesc>
                            </TrDesc>)
                        }
                    </TbodyDesc>
                </TableDesc>

                {/* card box for mobile size  */}
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
                            <ActionBtn
                                handleDelete={() => deleteUser(person)}
                                hrefEdit={'/dashboard/users-management'}
                                userId={person?.id}
                            />
                        </CardTable>
                    )) || (
                            <CardTable >
                                <WrapContent>
                                    <ContentTable
                                        content={'user not found'}
                                    />
                                </WrapContent>
                            </CardTable>
                        )
                    }
                </TableCardsMobile>

                {/* Pagination */}
            </div>
        </div>
    )
}