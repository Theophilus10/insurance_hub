'use client';

import React, { useState } from 'react';
import DataTable from '@app/components/datatable/datatable';
import { FormItem, FormLabel } from '@app/components/ui/form';
import { Input } from '@app/components/ui/input';
import { Button } from '@app/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { HeaderWithSorting } from '@app/components/datatable/columnHeaders';
import { nanoid } from 'nanoid';

export type TransitType = {
  originCountry: string;
  destinationCountry: string;
  rate: number;
  id: string;
};

const columns: ColumnDef<TransitType>[] = [
  {
    accessorKey: 'originCountry',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='From' />;
    },
  },
  {
    accessorKey: 'destinationCountry',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='To' />;
    },
  },
  {
    accessorKey: 'rate',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Transit Rate(%)' />;
    },
  },
];

interface TransitProps {
  transits: TransitType[];
  addTransit: (transit: TransitType) => void;
  updateTransit: (transit: TransitType) => void;
  deleteTransit: (id: string) => void;
}

const Transits = ({
  transits,
  addTransit,
  deleteTransit,
  updateTransit,
}: TransitProps) => {
  const [transit, setTransit] = useState({
    originCountry: '',
    destinationCountry: '',
    rate: 0,
    id: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    originCountry: '',
    destinationCountry: '',
    rate: '',
  });

  const [updating, setUpdating] = useState(false);

  const reset = () => {
    setTransit({ originCountry: '', destinationCountry: '', rate: 0, id: '' });
  };

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case 'edit':
        setTransit(row);
        setUpdating(true);
        break;
      case 'delete':
        deleteTransit(row.id);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    let errors = {
      originCountry: '',
      destinationCountry: '',
      rate: '',
    };

    // Add your validation logic here
    if (!transit.originCountry) {
      errors.originCountry = 'Origin Country is required';
    }

    if (!transit.destinationCountry) {
      errors.destinationCountry = 'Destination Country is required';
    }

    if (transit.rate <= 0) {
      errors.rate = 'Rate must be a positive number';
    }

    setValidationErrors(errors);

    // Return true if there are no validation errors, false otherwise
    return Object.values(errors).every(error => !error);
  };

  return (
    <div className='p-3 2xl:px-10 box-border'>
      <div>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10  '>
          <FormItem className='lg:col-span-2'>
            <FormLabel>From:</FormLabel>
            <Input
              onChange={e => {
                setTransit(prev => {
                  return { ...prev, originCountry: e.target.value };
                });
              }}
              value={transit.originCountry}
            />
          </FormItem>
          <FormItem className='lg:col-span-2'>
            <FormLabel>To:</FormLabel>
            <Input
              onChange={e => {
                setTransit(prev => {
                  return { ...prev, destinationCountry: e.target.value };
                });
              }}
              value={transit.destinationCountry}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Transit Rate(%):</FormLabel>
            <Input
              type='number'
              onChange={e => {
                setTransit(prev => {
                  return { ...prev, rate: +e.target.value };
                });
              }}
              value={transit.rate}
            />
          </FormItem>
        </div>
        <div className='flex justify-end'>
          {updating ? (
            <div>
              <Button
                variant='link'
                className='text-red-500'
                onClick={() => {
                  reset();
                  setUpdating(false);
                }}
              >
                Clear
              </Button>
              <Button
                variant='secondary'
                className='my-10 font-semibold'
                type='button'
                onClick={() => {
                  if (validateForm()) {
                    updateTransit(transit);
                    setUpdating(false);
                    reset();
                  }
                }}
              >
                Update Transhipment
              </Button>
            </div>
          ) : (
            <Button
              variant='primary'
              className='my-10 font-semibold'
              type='button'
              onClick={() => {
                if (validateForm()) {
                  addTransit({ ...transit, id: nanoid() });
                }
              }}
            >
              Add Transit
            </Button>
          )}
        </div>
      </div>
      <div className='py-8'>
        <DataTable
          columns={columns}
          data={transits}
          showHeader={false}
          showActions
          onRowAction={onRowAction}
        />
      </div>
    </div>
  );
};

export default Transits;
