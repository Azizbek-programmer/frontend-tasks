import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Monitor } from "lucide-react";
import { useStatistic } from "../service/query/useStatistic";
import { TeacherStatistic } from "./components/teacher-statistic";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#d7eb25",
    icon: Monitor,
  },
  mobile: {
    label: "Mobile",
    color: "#9377f6",
  },
} as ChartConfig;

export const Statistic = () => {
  const { data, } = useStatistic();
  const customData = Object.keys(data?.data || {});

  return (
    <>
      <div className="grid mb-5 grid-cols-4 gap-3">
        {customData.map((item) => (
          <div className="p-3 rounded-[10px] border text-center">
            {/* @ts-ignore */}
            <p className="text-2xl">{data?.data[item]}</p>
            <h2 className="text-xl">{item.toUpperCase()}</h2>
          </div>
        ))}
      </div>
      <div className="flex gap-5">
        <div className="p-[30px] border rounded-3xl w-[700px]">
          <ChartContainer config={chartConfig} className="min-h-auto w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="grow p-[30px] border rounded-3xl">
          <TeacherStatistic />
        </div>
      </div>
    </>
  );
};
