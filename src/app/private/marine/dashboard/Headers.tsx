"use client";
import React from "react";

// components

import CardStats from "@app/components/card/cardStats";
import {
  BarChart,
  ArrowUp,
  ArrowDown,
  Currency,
  Group,
  Users,
  UserPlus,
  Car,
  LucideCurrency,
} from "lucide-react";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative  md:pt-10 pb-3 pt-4">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Policies"
                  statTitle="350,897"
                  //   statArrow="up"
                  //   statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Total Policies Created"
                  statIcon={LucideCurrency}
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Pending"
                  statTitle="924"
                  //   statArrow="down"
                  //   statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Total Pending Policies"
                  statIcon={Car}
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Rejected"
                  statTitle="2,356"
                  //   statArrow="down"
                  //   statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Total Rejected Policies"
                  statIcon={UserPlus}
                  statIconColor="bg-orange-500"
                />
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Approved"
                  statTitle="2,356"
                  //   statArrow="down"
                  //   statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Total Approved Policies"
                  statIcon={UserPlus}
                  statIconColor="bg-orange-500"
                />
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 py-3">
                <CardStats
                  statSubtitle="Customers"
                  statTitle="49,65%"
                  //   statArrow="up"
                  //   statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="All Registered Customers"
                  statIcon={Users}
                  statIconColor="bg-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
