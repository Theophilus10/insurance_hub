'use client';

import React, { useState } from 'react';
import { FormItem, FormLabel } from '@app/components/ui/form';
import { Input } from '@app/components/ui/input';
import { Textarea } from '@app/components/ui/textarea';
import Select from 'react-select';
import { Button } from '@app/components/ui/button';
import DataTable from '@app/components/datatable/datatable';
import { ColumnDef } from '@tanstack/react-table';
import { HeaderWithSorting } from '@app/components/datatable/columnHeaders';
import { nanoid } from 'nanoid';

export type TranshipmentType = {
  originCountry: string;
  destinationCountry: string;
  rate: number;
  description: string;
  id: string;
};

const countries = [
  { label: 'Nigeria', value: 'nigeria' },
  { label: 'Ghana', value: 'ghana' },
];

const columns: ColumnDef<TranshipmentType>[] = [
  {
    accessorKey: 'originCountry',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Orgin Country' />;
    },
  },
  {
    accessorKey: 'destinationCountry',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Destination Country' />;
    },
  },
  {
    accessorKey: 'rate',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Rate' />;
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Description' />;
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
  updateTranshipment: (transhipment: TranshipmentType) => void;
  deleteTranshipment: (id: string) => void;
}

const Transhipment = ({
  transhipments,
  addTranshipments,
  updateTranshipment,
  deleteTranshipment,
}: TranshipmentProps) => {
  const [transhipment, setTranshipment] = useState({
    id: '',
    originCountry: '',
    destinationCountry: '',
    rate: 0,
    description: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    originCountry: '',
    destinationCountry: '',
    rate: '',
    description: '',
  });
  const [updating, setUpdating] = useState(false);

  const validateForm = () => {
    let errors = {
      originCountry: '',
      destinationCountry: '',
      rate: '',
      description: '',
    };

    // Add your validation logic here
    if (!transhipment.originCountry) {
      errors.originCountry = 'Origin Country is required';
    }

    if (!transhipment.destinationCountry) {
      errors.destinationCountry = 'Destination Country is required';
    }

    if (transhipment.rate <= 0) {
      errors.rate = 'Rate must be a positive number';
    }

    if (!transhipment.description) {
      errors.description = 'Description is required';
    }

    setValidationErrors(errors);

    // Return true if there are no validation errors, false otherwise
    return Object.values(errors).every(error => !error);
  };

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case 'edit':
        setTranshipment(row);
        setUpdating(true);
        break;
      case 'delete':
        deleteTranshipment(row.id);
        break;
      default:
        break;
    }
  };

  const reset = () =>
    setTranshipment({
      id: '',
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
                  setTranshipment(prev => {
                    return { ...prev, originCountry: e.value };
                  });
                }
              }}
              options={countries}
              value={countries.find(
                c => c.value === transhipment.originCountry
              )}
            />
          </FormItem>
          <FormItem className='lg:col-span-2'>
            <FormLabel>To:</FormLabel>
            <Select
              options={countries}
              onChange={e => {
                if (e) {
                  setTranshipment(prev => {
                    return { ...prev, destinationCountry: e.value };
                  });
                }
              }}
              value={countries.find(
                c => c.value === transhipment.destinationCountry
              )}
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
              value={transhipment.rate}
            />
          </FormItem>
          <FormItem className='lg:col-span-5'>
            <FormLabel>Transhipment Description:</FormLabel>
            <Textarea
              onChange={e => {
                if (e) {
                  setTranshipment(prev => {
                    return { ...prev, description: e.target.value };
                  });
                }
              }}
              value={transhipment.description}
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
                    updateTranshipment(transhipment);
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
                  addTranshipments({ ...transhipment, id: nanoid() });
                  reset();
                }
              }}
            >
              Add Transhipment
            </Button>
          )}
        </div>
      </div>
      <div className='py-8'>
        <DataTable
          columns={columns}
          data={transhipments}
          showHeader={false}
          showActions
          onRowAction={onRowAction}
        />
      </div>
    </div>
  );
};

export default Transhipment;
