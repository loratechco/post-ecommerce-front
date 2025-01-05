import Wallet from "@/components/Wallet";

// import { LineChartCard } from '@/components/LineChartCard'
// import { ChartConfig } from "@/components/ui/chart";

// const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//     desktop: {
//         label: "Desktop",
//         color: "hsl(var(--chart-1))",
//     },
//     mobile: {
//         label: "Mobile",
//         color: "hsl(var(--chart-2))",
//     },
// } satisfies ChartConfig

export default function WalletPage() {
  // const samplePurchaseTime = new Date()
  const sampleDeliveryTime = new Date();
  sampleDeliveryTime.setDate(sampleDeliveryTime.getDate() + 7);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between max-lg:flex-col">
        <div className="w-1/2 max-lg:w-full">
          <Wallet />
        </div>
      </div>
    </div>
  );
}
