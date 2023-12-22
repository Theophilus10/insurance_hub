'use client';

import React, { useState } from 'react';
import DataTable from '@app/components/datatable/datatable';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@app/components/ui/button';
import { HeaderWithSorting } from '@app/components/datatable/columnHeaders';
import { InputField, SelectField } from '@app/components/forms/ShadcnFields';

export type PolicyExtenxionsType = {
  extension: string;
  exchangeRate: number;
};

const columns: ColumnDef<PolicyExtenxionsType>[] = [
  {
    accessorKey: 'extension',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Extension' />;
    },
  },
  {
    accessorKey: 'destinationCountry',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Rate' />;
    },
  },
];

interface PolicyExtenxionProps {
  policyExtensions: PolicyExtenxionsType[];
  addPolicyExtension: (policyExtension: PolicyExtenxionsType) => void;
}

const PolicyExtenxions = ({
  addPolicyExtension,
  policyExtensions,
}: PolicyExtenxionProps) => {
  const [policyExtension, setPolicyExtension] = useState<PolicyExtenxionsType>({
    exchangeRate: 0,
    extension: '',
  });

  return (
    <div className='p-3 2xl:px-10 box-border'>
      <div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10 items-end '>
          <SelectField
            label='Policy Extension'
            className='lg:col-span-2'
            onChange={e => {
              if (e) {
                setPolicyExtension(prev => {
                  return { ...prev, extension: e.value };
                });
              }
            }}
            options={[]}
          />
          <InputField
            label='Extension Rate (%)'
            onChange={e => {
              if (e) {
                setPolicyExtension(prev => {
                  return { ...prev, exchangeRate: e.value };
                });
              }
            }}
          />

          <Button
            variant='primary'
            className='font-semibold '
            type='button'
            onClick={() => addPolicyExtension(policyExtension)}
          >
            Add Policy Extension
          </Button>
        </div>
        <div className='flex justify-end'></div>
      </div>
      <div className='py-8'>
        <DataTable
          columns={columns}
          data={policyExtensions}
          showHeader={false}
          showActions
        />
      </div>
    </div>
  );
};

export default PolicyExtenxions;
