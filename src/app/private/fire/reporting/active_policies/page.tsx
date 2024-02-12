'use client';

import DataTable from '@app/components/datatable/datatable';
import React from 'react';
import { columns } from './columns';
import { data } from '../../../marine/reporting/pending_policies/data';
import { getFirePolicies } from '@app/server/services/policies/fire';
import DateWithCompanySelectors from '@app/components/reporting-headers/date-with-company-selectors';

const Page = () => {
  const { items } = getFirePolicies();
  console.log(items);
  return (
    <div className='flex flex-col w-full box-border justify-center items-center   gap-5 '>
      <DateWithCompanySelectors title='Active Policies' />
      <div className='w-full'>
        <DataTable columns={columns} data={items} showAddButton={false} />
      </div>
    </div>
  );
};

export default Page;
