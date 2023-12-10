'use client';

import { Button } from '@app/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import { Checkbox } from '@app/components/ui/checkbox';

// This type is used to define the shape of our data.

export type Policies = {
  policyNumber: string;
  customerName: string;
  customerEmail: string;
  openCoverNumber: string;
  createdAt: string;
};

export const columns: ColumnDef<Policies>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'policyNumber',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Policy #
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'customerName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Customer
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <div className='bg-[#D6D1F7] text-[#2406F5] rounded-full w-8 h-8 flex items-center justify-center'>
            <p>{row.original.customerName.split('')[0]}</p>
          </div>
          <div>
            <p>{row.original.customerName}</p>
            <p className='text-sm text-gray-500 '>
              {row.original.customerEmail}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'openCoverNumber',
    header: 'Open Cover Number',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className='flex items-center gap-3 text-gray-400'>
          <Eye />
        </div>
      );
    },
  },
];
