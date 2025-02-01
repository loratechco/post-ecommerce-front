import { TrendingUp } from "lucide-react";
import ChartDashboard from "./components/chart/big-chart-dashboard";
import LineChart from "./components/chart/line-chart";
import CircleChart from "./components/chart/circle_chart";
// lucide-trending-up

const listData = [
  {
    title: "Views",
    value: "721K",
    percentage: "+11.01%",
    icon: <TrendingUp />,
  },
  {
    title: "Visits",
    value: "721K",
    percentage: "+11.01%",
    icon: <TrendingUp />,
  },
  {
    title: "New User",
    value: "128K",
    percentage: "+8.75%",
    icon: <TrendingUp />,
  },
  {
    title: "Active Users",
    value: "450K",
    percentage: "+5.63%",
    icon: <TrendingUp />,
  },
];

export default async function Page() {
  return (
    <section className="space-y-3">
      <ul className="grid grid-cols-4 gap-[1%] w-full *:w-full *:bg-sky-200 max-lg:grid-cols-3 max-md:grid-cols-1 gap-y-2">
        {listData?.map((item, index) => (
          <li className=" rounded-xl p-5 space-y-2" key={index}>
            <p className="">{item?.title}</p>
            <div className="flex items-center justify-between w-full">
              <span className="text-xl">{item?.value}</span>
              <span className="flex items-center justify-center gap-2">
                {item?.percentage}
                <div className="">{item?.icon}</div>
              </span>
            </div>
          </li>
        ))}
      </ul>
        <ChartDashboard />
        <div className="flex items-center justify-center w-full *:basis-1/2 gap-5 pt-2 max-lg:*:w-full max-lg:flex-col">
        <LineChart />
        <CircleChart />
        </div>
    </section>
  );
}
