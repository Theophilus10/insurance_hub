'use client';

import React, { useState } from 'react';
import { Button } from '@app/components/ui/button';
import DataTable from '@app/components/datatable/datatable';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import {
  InputField,
  SelectField,
  TextAreaField,
} from '@app/components/forms/ShadcnFields';

export type InterestType = {
  coverType: string;
  interest: string;
  packageType: string;
  rate: number;
  itemCost: number;
  freightAmount: number;
  markupRate: number;
  dutyRate: number;
  sumInsured: number;
  markupAmount: number;
  dutyAmount: number;
  basicPremium: number;
  description: string;
};

const columns: ColumnDef<InterestType>[] = [
  {
    accessorKey: 'coverType',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cover Type
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'interest',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Interest
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
          Rate (%)
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'sumInsured',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Sum Insured
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'dutyAmount',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg  p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Duty Amount
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'basicPremium',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='text-lg  p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Basic Premium
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
];

interface InteresProps {
  interests: InterestType[];
  addInterests: (interest: InterestType) => void;
}

const InterestItems = ({ interests, addInterests }: InteresProps) => {
  const [interest, setInterests] = useState<InterestType>({
    coverType: '',
    interest: '',
    packageType: '',
    rate: 0,
    itemCost: 0,
    freightAmount: 0,
    markupRate: 0,
    dutyRate: 0,
    sumInsured: 0,
    markupAmount: 0,
    dutyAmount: 0,
    basicPremium: 0,
    description: '',
  });

  return (
    <div className='p-3 2xl:px-10 box-border'>
      <div>
        <div className='grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-10  '>
          <SelectField
            label='Cover Type'
            className=' lg:col-span-2'
            onChange={e => {
              if (e) {
                setInterests(prev => {
                  return { ...prev, coverType: e.value };
                });
              }
            }}
            options={[{ label: 'ICC(A)', value: 'ICC(A)' }]}
          />
          <SelectField
            label='Interest/Item:'
            className='lg:col-span-2 '
            options={[
              {
                label:
                  'Machinery & Spares Parts, construction equipment, generators, Farm Machinery',
                value:
                  'Machinery & Spares Parts, construction equipment, generators, Farm Machinery',
              },
            ]}
            onChange={e => {
              if (e) {
                setInterests(prev => {
                  return { ...prev, interest: e.value };
                });
              }
            }}
          />
          <SelectField
            label='Package Type:'
            options={[
              {
                label:
                  'Machinery & Spares Parts, construction equipment, generators, Farm Machinery',
                value:
                  'Machinery & Spares Parts, construction equipment, generators, Farm Machinery',
              },
            ]}
            onChange={e => {
              if (e) {
                setInterests(prev => {
                  return { ...prev, packageType: e.value };
                });
              }
            }}
          />
          <InputField
            label='Rate(%):'
            type='number'
            onChange={e => {
              setInterests(prev => {
                return { ...prev, rate: +e.target.value };
              });
            }}
          />
          <InputField
            label='Item Cost:'
            type='number'
            className='lg:col-span-2'
            onChange={e => {
              setInterests(prev => {
                return { ...prev, itemCost: +e.target.value };
              });
            }}
          />
          <InputField
            label='Fraight Amount:'
            className='lg:col-span-2'
            type='number'
            onChange={e => {
              setInterests(prev => {
                return { ...prev, freightAmount: +e.target.value };
              });
            }}
          />
          <InputField
            label='Markup Rate(%):'
            type='number'
            onChange={e => {
              setInterests(prev => {
                return { ...prev, markupRate: +e.target.value };
              });
            }}
          />
          <InputField
            label='Duty Rate(%):'
            type='number'
            onChange={e => {
              setInterests(prev => {
                return { ...prev, dutyRate: +e.target.value };
              });
            }}
          />
          <TextAreaField
            label='Item Description:'
            className='lg:col-span-6'
            onChange={e => {
              if (e) {
                setInterests(prev => {
                  return { ...prev, description: e.target.value };
                });
              }
            }}
          />
        </div>
        <div className='flex justify-end'>
          <Button
            variant='primary'
            className='my-10 font-semibold'
            type='button'
            onClick={() => addInterests(interest)}
          >
            Add Item
          </Button>
        </div>
      </div>
      <div className='py-8'>
        <DataTable
          columns={columns}
          data={interests}
          showHeader={false}
          showActions
        />
      </div>
    </div>
  );
};

export default InterestItems;
