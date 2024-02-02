import React, { useState } from 'react';
import DataTable from '@app/components/datatable/datatable';
import { InputField } from '@app/components/forms/ShadcnFields';
import { Button } from '@app/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { HeaderWithSorting } from '@app/components/datatable/columnHeaders';
import { PerilsType } from '@app/types/policyTypes';
import { validateForm } from '@app/helpers/index';
import { nanoid } from 'nanoid';

const perilDefaultValues = {
  id: '',
  perilRate: 0,
  additionalPeril: '',
};

const columns: ColumnDef<PerilsType>[] = [
  {
    accessorKey: 'additionalPeril',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='ADDITIONAL PERIL' />;
    },
  },
  {
    accessorKey: 'perilRate',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='LOCATION' />;
    },
  },
];
interface PerilsProps {
  items: PerilsType[];
  addItem: (item: PerilsType) => void;
  updateItem: (item: PerilsType) => void;
  deleteItem: (item: string) => void;
}
const Perils = ({ addItem, deleteItem, items, updateItem }: PerilsProps) => {
  const [perils, setPerils] = useState(perilDefaultValues);
  const [updating, setUpdating] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case 'edit':
        setPerils(row);
        setUpdating(true);
        break;
      case 'delete':
        deleteItem(row.id);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setPerils(perilDefaultValues);
    setUpdating(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setPerils(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className='flex w-full py-5 items-center gap-5'>
        <InputField
          label='Additional Perils'
          onChange={e => handleInputChange('additionalPeril', e.target.value)}
          className='w-full'
          value={perils.additionalPeril}
        />
        <InputField
          label='Peril Rate'
          onChange={e => handleInputChange('perilRate', +e.target.value)}
          className='w-full'
          value={perils.perilRate}
          type='number'
        />
      </div>
      <div>
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
                if (validateForm(setValidationErrors, perils)) {
                  updateItem(perils);
                  reset();
                }
              }}
            >
              Update Item
            </Button>
          </div>
        ) : (
          <Button
            className='my-3'
            type='button'
            onClick={() => {
              if (validateForm(setValidationErrors, perils)) {
                addItem({ ...perils, id: nanoid() });
                reset();
              }
            }}
          >
            Add Peril
          </Button>
        )}
      </div>
      <DataTable
        columns={columns}
        data={items}
        showActions
        onRowAction={onRowAction}
        showHeader={false}
      />
    </div>
  );
};

export default Perils;
