'use client';

import React, { useState } from 'react';
import { FormItem, FormLabel } from '@app/components/ui/form';
import { Input } from '@app/components/ui/input';
import Select from 'react-select';
import { Button } from '@app/components/ui/button';
import DataTable from '@app/components/datatable/datatable';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export type TransitType = {
  originCountry: string;
  destinationCountry: string;
  rate: number;
};

const columns: ColumnDef<TransitType>[] = [
  {
    accessorKey: 'originCountry',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          From
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'destinationCountry',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          To
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'rate',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rate
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
];

interface TransitProps {
  transits: TransitType[];
  addTransit: (transit: TransitType) => void;
}

const Transits = ({ transits, addTransit }: TransitProps) => {
  const [transit, setTransit] = useState({
    originCountry: '',
    destinationCountry: '',
    rate: 0,
    description: '',
  });

  return (
    <div className='p-3 2xl:px-10 box-border'>
      <div>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10  '>
          <FormItem className='lg:col-span-2'>
            <FormLabel>From:</FormLabel>
            <Select
              onChange={e => {
                if (e) {
                  setTransit(prev => {
                    return { ...prev, originCountry: e.value };
                  });
                }
              }}
              options={[
                { label: 'Ghana', value: 'ghana' },
                { label: 'Nigeria', value: 'nigeria' },
              ]}
            />
          </FormItem>
          <FormItem className='lg:col-span-2'>
            <FormLabel>To:</FormLabel>
            <Select
              options={[
                { label: 'Nigeria', value: 'nigeria' },
                { label: 'Ghana', value: 'ghana' },
              ]}
              onChange={e => {
                if (e) {
                  setTransit(prev => {
                    return { ...prev, destinationCountry: e.value };
                  });
                }
              }}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Transhipment Rate(%):</FormLabel>
            <Input
              type='number'
              onChange={e => {
                setTransit(prev => {
                  return { ...prev, rate: +e.target.value };
                });
              }}
            />
          </FormItem>
        </div>
        <div className='flex justify-end'>
          <Button
            variant='primary'
            className='my-10 font-semibold'
            type='button'
            onClick={() => addTransit(transit)}
          >
            Add Transit
          </Button>
        </div>
      </div>
      <div className='py-8'>
        <DataTable
          columns={columns}
          data={transits}
          showHeader={false}
          showActions
        />
      </div>
    </div>
  );
};

export default Transits;
