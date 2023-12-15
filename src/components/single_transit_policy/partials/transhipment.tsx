'use client';

import React, { useState } from 'react';
import { FormItem, FormLabel } from '@app/components/ui/form';
import { Input } from '@app/components/ui/input';
import { Textarea } from '@app/components/ui/textarea';
import Select from 'react-select';
import { Button } from '@app/components/ui/button';
import DataTable from '@app/components/datatable/datatable';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export type TranshipmentType = {
  originCountry: string;
  destinationCountry: string;
  rate: number;
  description: string;
};

const columns: ColumnDef<TranshipmentType>[] = [
  {
    accessorKey: 'originCountry',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Origin Country
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
          Destination Country
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
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg  p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Description
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className='max-w-[50ch] truncate'>{row.original.description}</p>
      );
    },
  },
];

interface TranshipmentProps {
  transhipments: TranshipmentType[];
  addTranshipments: (transhipment: TranshipmentType) => void;
}

const Transhipment = ({
  transhipments,
  addTranshipments,
}: TranshipmentProps) => {
  const [transhipment, setTranshipment] = useState({
    originCountry: '',
    destinationCountry: '',
    rate: 0,
    description: '',
  });

  const deleteTranshipment = (index: number) => {};
  return (
    <div className='p-3 2xl:px-10 box-border'>
      <div className='border-b-[1px] '>
        <div className='grid grid-cols-5 gap-10  '>
          <FormItem className='col-span-2'>
            <FormLabel>From:</FormLabel>
            <Select
              onChange={e => {
                if (e) {
                  setTranshipment(prev => {
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
          <FormItem className='col-span-2'>
            <FormLabel>To:</FormLabel>
            <Select
              options={[
                { label: 'Nigeria', value: 'nigeria' },
                { label: 'Ghana', value: 'ghana' },
              ]}
              onChange={e => {
                if (e) {
                  setTranshipment(prev => {
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
                setTranshipment(prev => {
                  return { ...prev, rate: +e.target.value };
                });
              }}
            />
          </FormItem>
          <FormItem className='col-span-5'>
            <FormLabel>Transhipment Description:</FormLabel>
            <Textarea
              onChange={e => {
                if (e) {
                  setTranshipment(prev => {
                    return { ...prev, description: e.target.value };
                  });
                }
              }}
            />
          </FormItem>
        </div>
        <div className='flex justify-end'>
          <Button
            variant='primary'
            className='my-10 font-semibold'
            type='button'
            onClick={() => addTranshipments(transhipment)}
          >
            Add Transhipment
          </Button>
        </div>
      </div>
      <div className='py-8'>
        <DataTable
          columns={columns}
          data={transhipments}
          showHeader={false}
          showActions
        />
      </div>
    </div>
  );
};

export default Transhipment;
