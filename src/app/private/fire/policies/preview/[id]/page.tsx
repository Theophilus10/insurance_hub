"use client";

import React from "react";
import { Card } from "@app/components/ui/card";
import { ListTodo } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { show_fire_policy } from "@app/server/services/policies/fire-policies";
import FullPageLoader from "@app/components/layout/fullPageLoader";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policyId");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;
  const { items, mutate, isLoading, isError } = show_fire_policy(policyId);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <Card className="container mx-auto pb-5 text-[#5D5A68] text-[0.938rem]">
      <button className="bg-blue-200 w-full rounded-md shadow-md text-blue-800 font-semibold text-base cursor-pointer font-light py-2">
        Print
      </button>

      <div className="flex justify-between flex-wrap items-start border-b-[1px] p-8">
        <div>
          <h2 className="text-[#5D5A68] text-[1.375rem] font-bold">
            {items?.branch?.institution?.name}
          </h2>
          <div className="text-[15px] text-[#5D5A68] mt-2">
            <p>{items?.branch?.office_location}</p>
            <p>{items?.branch?.contact_phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <label>Policy #</label>
          <p className="text-right">{items?.policy_number}</p>
          <label>Inception Date:</label>
          <p className="text-right">{items?.inception_date}</p>
          <label>Expiry Date:</label>
          <p className="text-right">{items?.expiry_date}</p>
          <label>Currency:</label>
          <p className="text-right">{items?.currency?.name}</p>
          <label>Exchange Rate:</label>
          <p className="text-right">{items?.exchange_rate}</p>
          <label>Status:</label>
          <p className="text-right">{items?.status}</p>
        </div>
      </div>

      <div className="border-b-[1px] p-8">
        <label>Policy Holder:</label>
        <div className="space-y-2 mt-4">
          <p>{items?.customer?.name}</p>
          <p>{items?.customer?.phone}</p>
          <p>{items?.customer?.email}</p>
          <p>{items?.customer?.postal_address}</p>
        </div>
      </div>

      <div className="flex gap-10 md:gap-36 flex-wrap items-start border-b-[1px] p-8">
        <div>
          <p className="mb-5">
            Fire Risk Class: {items?.fire_risk_class?.description}
          </p>
          <div className="space-y-2">
            <p>Fire Rate: {items?.fire_risk_class?.fire_rate}</p>
            <p>Collapse Rate: {items?.fire_risk_class?.collapse_rate}</p>
            <p>
              Public Liability Rate:{" "}
              {items?.fire_risk_class?.public_liability_rate}
            </p>
          </div>
        </div>
        <div>
          <p className="mb-5">
            Distribution Channel: {items?.distribution_channel}
          </p>
          <div className="space-y-2">
            <p>Intermediary: {items?.intermediary?.name}</p>
            <p>Intermediary Branch: {items?.intermediary_branch?.name}</p>
            <p>Intermediary Type: {items?.intermediary_type?.name}</p>
          </div>
        </div>
      </div>

      <div className="border-b-[1px] px-12 pb-2">
        <div className="py-8 space-y-3">
          <p className="text-lg font-semibold text-gray-700">POLICY ITEMS</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full border-b border-gray-300 bg-gray-100">
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Region
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Fire Rate
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Collapse Rate
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Item Location
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Digital Address
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Description
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Public Liability Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.policy_items?.map((item: any, index: any) => (
                  <tr
                    key={index}
                    className="w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 text-gray-700">{item.region}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {item.fire_rate}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {item.collapse_rate}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {item.item_location}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {item.digital_address}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {item.item_description}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {item.public_liability_rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-8 space-y-3">
          <p className="text-lg font-semibold text-gray-700">POLICY EXCESSES</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full border-b border-gray-300 bg-gray-100">
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Excess
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Rate
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.policy_excesses?.map((excess: any, index: any) => (
                  <tr
                    key={index}
                    className="w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 text-gray-700">{excess.excess}</td>
                    <td className="py-2 px-4 text-gray-700">{excess.rate}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {excess.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-8 space-y-3">
          <p className="text-lg font-semibold text-gray-700">POLICY PERILS</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full border-b border-gray-300 bg-gray-100">
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Peril
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Rate
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.policy_perils?.map((peril: any, index: any) => (
                  <tr
                    key={index}
                    className="w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 text-gray-700">{peril.peril}</td>
                    <td className="py-2 px-4 text-gray-700">{peril.rate}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {peril.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Page;
