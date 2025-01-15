import React from "react";
import { ArrowUp, ArrowDown, BarChart, LucideIcon } from "lucide-react";

// Define types for the component props
interface CardStatsProps {
  statSubtitle?: string;
  statTitle?: string;
  statArrow?: "up" | "down";
  statPercent?: string;
  statPercentColor?: string;
  statDescripiron?: string;
  statIcon: LucideIcon;
  statIconColor?: string;
}

const CardStats: React.FC<CardStatsProps> = ({
  statSubtitle = "Traffic",
  statTitle = "350,897",
  statArrow = "",
  statPercent = "",
  statPercentColor = "text-emerald-500",
  statDescripiron = "",
  statIcon: StatIcon,
  statIconColor = "bg-red-500",
}) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-[#4169E1] uppercase font-bold text-xs">
              {statSubtitle}
            </h5>
            <span className="font-semibold text-xl text-[#4169E1]">
              {statTitle}
            </span>
          </div>
          <div className="relative w-auto pl-4 flex-initial">
            <div
              className={
                "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                statIconColor
              }
            >
              <StatIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
        <p className="text-sm text-blueGray-400 mt-4">
          <span className={statPercentColor + ""}>
            {statArrow === "up" && <ArrowUp />}
            {statArrow === "down" && <ArrowDown />}
            {statPercent}
          </span>
          <span className="whitespace-nowrap text-[#4169E1]">
            {statDescripiron}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CardStats;
