"use client";

import React from "react";
import { Card } from "@app/components/ui/card";
import { ListTodo } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { show_policy } from "@app/server/services";
import { InterestType } from "@app/components/single_transit_policy/partials/interests_items";
import { TranshipmentType } from "@app/components/single_transit_policy/partials/transhipment";
import { TransitType } from "@app/components/single_transit_policy/partials/transits";
import { PolicyExtenxionsType } from "@app/components/single_transit_policy/partials/policy_extensions";
import FullPageLoader from "@app/components/layout/fullPageLoader";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policyId");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;
  //   const fetchPolicyId = parseInt(params.previewId);
  const { items, mutate, isLoading, isError } = show_policy(policyId);

  if (isLoading) {
    return <FullPageLoader />;
  }
  return (
    <Card className="container mx-auto pb-5 text-[#5D5A68] text-[0.938rem]">
      <button className="bg-blue-200 w-full rounded-md shadow-md text-blue-800 font-semibold text-base cursor-pointer font-light py-2 ">
        Print
      </button>

      <div className=" flex justify-between flex-wrap items-start border-b-[1px] p-8 ">
        <div>
          <h2 className="text-[#5D5A68] text-[1.375rem] font-bold">
            {items?.branch?.institution?.name}
          </h2>
          <div className="text-[15px] text-[#5D5A68] mt-2">
            <p>{items?.branch?.institution?.office_location}</p>
            <p>{items?.branch?.institution?.contact_phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-2  ">
          <label>Policy #</label>
          <p className="text-right">{items?.policy_number}</p>
          <label>Inception Date:</label>
          <p className="text-right">{items?.issue_date}</p>
          <label>Sailing Date:</label>
          <p className="text-right">{items?.sailing_date}</p>
          <label>Est. Arrival Date:</label>
          <p className="text-right">{items?.estimated_arrival_date}</p>
        </div>
      </div>
      <div className=" border-b-[1px] p-8 ">
        <label>Policy Holder:</label>
        <div className="space-y-2 mt-4">
          <p>{items?.customer?.name}</p>
          <p>{items?.customer?.phone}</p>
          <p>{items?.customer?.email}</p>
          <p>{items?.customer?.postal_address}</p>
        </div>
      </div>
      <div className=" flex gap-10 md:gap-36 flex-wrap items-start border-b-[1px] p-8">
        <div>
          <p className="mb-5">
            Currency: {items?.currency?.name} | Rate: {items?.exchange_rate}
          </p>
          <div className="space-y-2">
            <p>Commercial Invoice: {items.commercial_invoice_number}</p>
            <p>Letter Of Credit: {items?.bank?.name}</p>
            <p>Vessel/Flight Name: {items?.flight_vessel_name}</p>
            <p>Vessel Flag: {items?.vessel_flag}</p>
            <p>Country of Destination: {items?.country_of_destination}</p>
            <p>Port of Destination: {items?.port_of_destination}</p>
          </div>
        </div>
        <div>
          <p className="mb-5">Shipping Type: {items?.shipping_type?.name}</p>
          <div className="space-y-2">
            <p>Bill of Laden Number: {items?.bill_of_laden_number}</p>
            <p>Carrier: {items?.carrier?.name}</p>
            <p>Vessel/Flight Number: {items?.flight_vessel_number}</p>
            <p>
              Country of Importation/Exportation:{" "}
              {items?.country_of_importation}
            </p>
            <p>Port of Loading: {items?.port_of_loading}</p>
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
                  <th className="py-2 px-4 text-left font-semibold text-gray-600 col-span-5">
                    ITEM
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    DESCRIPTION
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    RATE
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600 col-span-2">
                    PACKAGE TYPE
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    COST
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.interests?.map((item: InterestType, index: number) => (
                  <tr
                    key={index}
                    className="w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 col-span-5 text-gray-700">
                      {item.interest}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {item.item_description}
                    </td>
                    <td className="py-2 px-4 text-gray-700">{item.rate}</td>
                    <td className="py-2 px-4 col-span-2 text-gray-700">
                      {item.package_type}
                    </td>
                    <td className="py-2 px-4 text-gray-700">{item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-8 space-y-3">
          <p className="text-lg font-semibold text-gray-700">TRANSHIPMENTS</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full border-b border-gray-300 bg-gray-100">
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    FROM
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    TO
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    RATE
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    DESCRIPTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.transhipments?.map(
                  (item: TranshipmentType, index: number) => (
                    <tr
                      key={index}
                      className="w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                    >
                      <td className="py-2 px-4 text-gray-700">
                        {item?.origin_country}
                      </td>
                      <td className="py-2 px-4 text-gray-700">
                        {item?.destination_country}
                      </td>
                      <td className="py-2 px-4 text-gray-700">{item?.rate}</td>
                      <td className="py-2 px-4 text-gray-700">
                        {item?.description}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-8 space-y-3">
          <p className="text-lg font-semibold text-gray-700">TRANSIT</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full border-b border-gray-300 bg-gray-100">
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    FROM
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    TO
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    RATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.transits?.map((item: TransitType, index: number) => (
                  <tr
                    key={index}
                    className="w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 text-gray-700">
                      {item.transit_from}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {item.transit_to}
                    </td>
                    <td className="py-2 px-4 text-gray-700">{item.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-8 space-y-3">
          <p className="text-lg font-semibold text-gray-700">
            POLICY EXTENSIONS
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full border-b border-gray-300 bg-gray-100">
                  <th className="py-2 px-4 text-left font-semibold text-gray-600 col-span-3">
                    EXTENSION
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    RATE
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-600">
                    DESCRIPTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.policy_extentions?.map(
                  (extension: PolicyExtenxionsType, index: number) => (
                    <tr
                      key={index}
                      className="w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                    >
                      <td className="py-2 px-4 col-span-3 text-gray-700">
                        {extension?.extension || "N/A"}
                      </td>
                      <td className="py-2 px-4 text-gray-700">
                        {extension?.rate || "N/A"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p>Policy Excess: {items.policy_excess}</p>
      </div>
      <div className="flex items-end w-full justify-end p-5 ">
        <div className="w-80 shadow-md rounded p-5 bg-[#F7F7F7]">
          <div className="flex items-center gap-2 pb-2">
            <ListTodo />
            <p>Policy Summary</p>
          </div>
          <div className="grid grid-cols-2 py-5 border-y-[1px] space-y-2 items-center">
            <label>Sum Insured:</label>
            <p className="text-right">CN¥3,060.00</p>
            <label>Basic Premuim:</label>
            <p className="text-right">CN¥6.00</p>
            <label>Loading(%):</label>
            <p className="text-right">1.1300%</p>
            <label>Total Loadings:</label>
            <p className="text-right">CN¥3,060.00</p>
          </div>
          <div className="grid grid-cols-2 py-5  space-y-2 items-center">
            <label>Maintenance fee:</label>
            <p className="text-right">CN¥64.00</p>
            <label>Premium Payable:</label>
            <p className="text-right">CN¥164.00</p>
          </div>
        </div>
      </div>

      <div className=" flex justify-between flex-wrap items-start  p-8 ">
        <p>
          Disclaimer: This summary is for general information purposes only and
          does not constitute the full terms of the Marine & Aviation Insurance
          Single Transit Policy. Refer to the complete policy document for
          specific details, coverage, exclusions and conditions.
        </p>
      </div>
    </Card>
  );
};

export default Page;
