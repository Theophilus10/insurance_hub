'use client';

import React from 'react';
import { Card } from '@app/components/ui/card';
import { ListTodo } from 'lucide-react';

const policyItems = [
  {
    item: 'None',
    description: 'yes',
    rate: 2.27,
    packageType: 'NON-CONTAINERIZED',
    location: '',
  },
  {
    item: 'None',
    description: 'yes',
    rate: 2.27,
    packageType: 'NON-CONTAINERIZED',
    location: '',
  },
  {
    item: 'None',
    description: 'yes',
    rate: 2.27,
    packageType: 'NON-CONTAINERIZED',
    location: '',
  },
  {
    item: 'None',
    description: 'yes',
    rate: 2.27,
    packageType: 'NON-CONTAINERIZED',
    location: '',
  },
  {
    item: 'None',
    description: 'yes',
    rate: 2.27,
    packageType: 'NON-CONTAINERIZED',
    location: '',
  },
];

const policyTranshipments = [
  {
    from: 'FE001',
    to: 'tt',
    rate: 0.13,
    description: 'none',
  },
  {
    from: 'FE001',
    to: 'tt',
    rate: 0.13,
    description: 'none',
  },
  {
    from: 'FE001',
    to: 'tt',
    rate: 0.13,
    description: 'none',
  },
  {
    from: 'FE001',
    to: 'tt',
    rate: 0.13,
    description: 'none',
  },
  {
    from: 'FE001',
    to: 'tt',
    rate: 0.13,
    description: 'none',
  },
];

const policyExtension = [
  {
    extension: 'Nicaragua',
    rate: 1,
    description: 'none',
  },
  {
    extension: 'Nicaragua',
    rate: 1,
    description: 'none',
  },
  {
    extension: 'Nicaragua',
    rate: 1,
    description: 'none',
  },
  {
    extension: 'Nicaragua',
    rate: 1,
    description: 'none',
  },
  {
    extension: 'Nicaragua',
    rate: 1,
    description: 'none',
  },
];

const Page = () => {
  return (
    <Card className='w-full pb-5 text-[#5D5A68] text-[0.938rem]'>
      <button className='bg-blue-200 w-full rounded-md shadow-md text-blue-800 font-semibold text-base cursor-pointer font-light py-2 '>
        Print
      </button>

      <div className=' flex justify-between flex-wrap items-start border-b-[1px] p-8 '>
        <div>
          <h2 className='text-[#5D5A68] text-[1.375rem] font-bold'>
            Activa International Insurance Company Limited
          </h2>
          <div className='text-[15px] text-[#5D5A68] mt-2'>
            <p>No. 11 Patrice Lumumba Road, Airport Residential Area, Accra</p>
            <p>
              030 222 0966/222 7439/224 1322/224 2554/222 5296/222 5289/120
              070/1
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2  '>
          <label>Policy #</label>
          <p className='text-right'>POLIT014001001</p>
          <label>Inception Date:</label>
          <p className='text-right'>October 4, 2023</p>
          <label>Sailing Date:</label>
          <p className='text-right'>October 4, 2023</p>
          <label>Est. Arrival Date:</label>
          <p className='text-right'>October 4, 2023</p>
        </div>
      </div>
      <div className=' border-b-[1px] p-8 '>
        <label>Policy Holder:</label>
        <div className='space-y-2 mt-4'>
          <p>Bel</p>
          <p>233501234573</p>
          <p>bel@gmail.com</p>
          <p>P.O.BOX 33487</p>
        </div>
      </div>

      <div className='border-b-[1px] px-12 pb-2'>
        <p>RISK CLASS</p>
        <p>high</p>
        <div className='px-5 border-b-[1px]'>
          <div className='  py-8  space-y-3 '>
            <p>POLICY ITEMS</p>
            <div className='grid grid-cols-5 gap-2 py-2 border-b-[1px] '>
              <p>ITEM</p>
              <p>DIGITAL ADDRESS</p>
              <p>RISK RATE</p>
              <p>PACKAGE TYPE</p>
              <p>LOCATION</p>
            </div>
            {/* Component to map through policy items  */}
            {policyItems?.map(item => (
              <div
                className='grid grid-cols-5 gap-2 py-2 border-b-[1px] '
                key={item.item}
              >
                <p>{item.item}</p>
                <p>{item.description}</p>
                <p>{item.rate}</p>
                <p>{item.packageType}</p>
                <p>{item.location}</p>
              </div>
            ))}
          </div>
          <div className='  py-8  space-y-3 '>
            <p>POLICY EXCESSES</p>
            <div className='grid grid-cols-4 gap-2 py-2 border-b-[1px] '>
              <p>EXCESS CODE</p>
              <p>EXCESS NAME</p>
              <p>RATE</p>
              <p>DESCRIPTION</p>
            </div>
            {/* Component to map through transhipments  */}
            {policyTranshipments?.map(item => (
              <div
                className='grid grid-cols-4 gap-2 py-2  border-b-[1px] '
                key={item.description}
              >
                <p>{item.from}</p>
                <p>{item.to}</p>
                <p>{item.rate}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <p>Policy Excess: null</p>
        </div>
        <div className='flex items-end w-full justify-end p-5 '>
          <div className='w-80 shadow-md rounded p-5 bg-[#F7F7F7]'>
            <div className='flex items-center gap-2 pb-2'>
              <ListTodo />
              <p>Policy Summary</p>
            </div>
            <div className='grid grid-cols-2 py-5 border-y-[1px] space-y-2 items-center'>
              <label>Sum Insured:</label>
              <p className='text-right'>CN¥3,060.00</p>
              <label>Basic Premuim:</label>
              <p className='text-right'>CN¥6.00</p>
              <label>Loading(%):</label>
              <p className='text-right'>1.1300%</p>
              <label>Total Loadings:</label>
              <p className='text-right'>CN¥3,060.00</p>
            </div>
            <div className='grid grid-cols-2 py-5  space-y-2 items-center'>
              <label>Maintenance fee:</label>
              <p className='text-right'>CN¥64.00</p>
              <label>Premium Payable:</label>
              <p className='text-right'>CN¥164.00</p>
            </div>
          </div>
        </div>
      </div>

      <div className=' flex justify-between flex-wrap items-start  p-8 '>
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
