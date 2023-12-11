'use client';

import { Button } from '@app/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, ThumbsUp } from 'lucide-react';
import { Checkbox } from '@app/components/ui/checkbox';

// This type is used to define the shape of our data.

export type Policies = {
  policyNumber: string;
  customerName: string;
  coverType: string;
  schedule: string;
  make: string;
  company: string;
  inception: string;
  expiry: string;
  sumInsured: number;
  premium: number;
  status: string;
  vehicleRegistration: string;
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
  },
  {
    accessorKey: 'coverType',
    header: 'Cover Type',
  },
  {
    accessorKey: 'schedule',
    header: 'Schedule',
  },
  {
    accessorKey: 'make',
    header: 'Make',
  },
  {
    accessorKey: 'vehicleRegistration',
    header: 'Vehicle Registration ',
  },
  {
    accessorKey: 'inception',
    header: 'Inception',
  },
  {
    accessorKey: 'expiry',
    header: 'Expiry',
  },
  {
    accessorKey: 'sumInsured',
    header: 'Sum Insured',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-3 text-gray-500'>
          <Eye />
          <ThumbsUp />
        </div>
      );
    },
  },
];
