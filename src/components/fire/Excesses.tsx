import { useState } from 'react';
import { InputField } from '@app/components/forms/ShadcnFields';
import { Button } from '@app/components/ui/button';
import DataTable from '@app/components/datatable/datatable';
import { ColumnDef } from '@tanstack/react-table';
import { HeaderWithSorting } from '@app/components/datatable/columnHeaders';
import { ExcessType } from '@app/types/policyTypes';
import { validateForm } from '@app/helpers/index';
import { nanoid } from 'nanoid';

const defaultValues = { policyExcesses: '', excessRate: 0, id: '' };

const columns: ColumnDef<ExcessType>[] = [
  {
    accessorKey: 'policyExcesses',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='EXCESS' />;
    },
  },
  {
    accessorKey: 'excessRate',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='RATE' />;
    },
  },
];

interface ExcessesProps {
  items: ExcessType[];
  addItem: (item: ExcessType) => void;
  updateItem: (item: ExcessType) => void;
  deleteItem: (item: string) => void;
}

const Excesses = ({
  addItem,
  deleteItem,
  items,
  updateItem,
}: ExcessesProps) => {
  const [excesses, setExcesses] = useState(defaultValues);
  const [updating, setUpdating] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case 'edit':
        setExcesses(row);
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
    setExcesses(defaultValues);
    setUpdating(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setExcesses(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className='flex w-full py-5 items-center gap-5'>
        <InputField
          label='Policy Excesses'
          onChange={e => handleInputChange('policyExcesses', e.target.value)}
          className='w-full'
        />
        <InputField
          label='Excess Rate'
          onChange={e => handleInputChange('excessRate', +e.target.value)}
          className='w-full'
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
                if (validateForm(setValidationErrors, excesses)) {
                  updateItem(excesses);
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
              if (validateForm(setValidationErrors, excesses)) {
                addItem({ ...excesses, id: nanoid() });
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
        onRowAction={onRowAction}
        showActions
        showHeader={false}
      />
    </div>
  );
};

export default Excesses;
