'use client';

import DataTable from '@app/components/datatable/datatable';
import React from 'react';
import { columns } from './columns';
import { data } from './data';
import DateHeader from '@app/components/reporting-headers/date-header';

const Page = () => {
  return (
    <div className='flex flex-col w-full box-border justify-center items-center   gap-5 '>
      <DateHeader title='Pending Policies' />
      <div className='w-full'>
        <DataTable columns={columns} data={data} showAddButton={false} />
      </div>
    </div>
  );
};

export default Page;
