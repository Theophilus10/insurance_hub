'use client';

import { Button } from '@app/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Award, XCircle } from 'lucide-react';
import { Checkbox } from '@app/components/ui/checkbox';

// This type is used to define the shape of our data.

export type Policies = {
  policy_number: string;
  customer: { email: string; name: string };
  openCoverNumber: string | undefined;
  createdAt: string | undefined;
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
    accessorKey: 'policy_number',
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
    accessorKey: 'customer',
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
            <p>{row.original.customer.name.split('')[0]}</p>
          </div>
          <div>
            <p>{row.original.customer.name}</p>
            <p className='text-sm text-gray-500 '>
              {row.original.customer.email}
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
    accessorKey: 'created_at',
    header: 'Created Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original;

      return (
        <div className='flex items-center gap-3 text-gray-400'>
          <Award />
          <XCircle />
        </div>
      );
    },
  },
];
