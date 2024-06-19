'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@app/components/ui/button';
import DataTable from '@app/components/datatable/datatable';
import { ColumnDef } from '@tanstack/react-table';
import { HeaderWithSorting } from '@app/components/datatable/columnHeaders';
import {
  InputField,
  SelectField,
  TextAreaField,
} from '@app/components/forms/ShadcnFields';
import { nanoid } from 'nanoid';
import { read_cover_types, read_interests } from '@app/server/services';
import { convertDataToSelectObject } from '@app/helpers/index';

export type InterestType = {
  coverType: number | null;
  interest: number | null;
  packageType: string | null;
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
  id: string;
};

type SelectType = {
  label: string;
  value: number | string;
};

const columns: ColumnDef<InterestType>[] = [
  {
    accessorKey: 'coverType',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Cover Type' />;
    },
  },
  {
    accessorKey: 'interest',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Interest' />;
    },
  },
  {
    accessorKey: 'rate',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Rate (%)' />;
    },
  },
  {
    accessorKey: 'sumInsured',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Sum insured' />;
    },
  },
  {
    accessorKey: 'dutyAmount',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Duty amount' />;
    },
  },
  {
    accessorKey: 'basicPremium',
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label='Basic Premium' />;
    },
  },
];

interface InteresProps {
  interests: InterestType[];
  addInterests: (interest: InterestType) => void;
  updateInterets: (interest: InterestType) => void;
  deleteInterest: (id: string) => void;
}

const packageTypes = [
  { label: 'containerized', value: 'CONTAINERIZED' },
  { label: 'non-containerized', value: 'NON-CONTAINERIZED' },
];

const InterestItems = ({
  interests,
  addInterests,
  updateInterets,
  deleteInterest,
}: InteresProps) => {
  const { items: coverTypes, isLoading: coverTypesIsLoading } =
    read_cover_types();
  const { items: interestItems, isLoading: interestsLoading } =
    read_interests();
  const [interest, setInterests] = useState<InterestType>({
    coverType: 0,
    interest: 0,
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
    id: '',
  });
  const [updating, setUpdating] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const reset = () => {
    setInterests({
      coverType: null,
      interest: null,
      packageType: null,
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
      id: '',
    });
  };

  const coverType = useMemo(
    () => convertDataToSelectObject(coverTypes),
    [coverTypes]
  );
  const interestValues = useMemo(
    () => convertDataToSelectObject(interestItems),
    [interestItems]
  );

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case 'edit':
        setInterests(row);
        setUpdating(true);
        break;
      case 'delete':
        deleteInterest(row.id);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Calculate markup amount
    interest.markupAmount =
      (interest.markupRate / 100) *
      (interest.itemCost + interest.freightAmount);

    // Calculate duty amount
    interest.dutyAmount =
      (interest.dutyRate / 100) * (interest.itemCost + interest.freightAmount);

    // Calculate sum insured
    const { itemCost, freightAmount, markupAmount, dutyAmount } = interest;
    interest.sumInsured = itemCost + freightAmount + markupAmount + dutyAmount;
  }, [
    interest.markupRate,
    interest.dutyRate,
    interest.itemCost,
    interest.freightAmount,
    interest.dutyAmount,
  ]);

  useEffect(() => {
    // Calculate basic premium
    const { sumInsured, rate } = interest;
    interest.basicPremium = sumInsured * (rate / 100);
  }, [interest.rate, interest.sumInsured]);

  const validateInterests = () => {
    const errors = {
      coverType: '',
      interest: '',
      packageType: '',
      rate: '',
      itemCost: '',
      freightAmount: '',
      markupRate: '',
      dutyRate: '',
      sumInsured: '',
      markupAmount: '',
      dutyAmount: '',
      basicPremium: '',
      description: '',
      id: '',
    };

    // Validate coverType
    if (typeof interest.coverType !== 'number') {
      errors.coverType = 'Cover type must be a number.';
    }

    // Validate interest
    if (typeof interest.interest !== 'number') {
      errors.interest = 'Interest must be a number.';
    }

    // Validate packageType
    if (
      typeof interest.packageType !== 'string' ||
      interest.packageType.trim() === ''
    ) {
      errors.packageType = 'Package type must be a non-empty string.';
    }

    // Validate rate
    if (typeof interest.rate !== 'number') {
      errors.rate = 'Rate must be a number.';
    }

    // Validate itemCost
    if (typeof interest.itemCost !== 'number') {
      errors.itemCost = 'Item cost must be a number.';
    }

    // Validate freightAmount
    if (typeof interest.freightAmount !== 'number') {
      errors.freightAmount = 'Freight amount must be a number.';
    }

    // Validate markupRate
    if (typeof interest.markupRate !== 'number') {
      errors.markupRate = 'Markup rate must be a number.';
    }

    // Validate dutyRate
    if (typeof interest.dutyRate !== 'number') {
      errors.dutyRate = 'Duty rate must be a number.';
    }

    // Validate sumInsured
    if (typeof interest.sumInsured !== 'number') {
      errors.sumInsured = 'Sum insured must be a number.';
    }

    // Validate markupAmount
    if (typeof interest.markupAmount !== 'number') {
      errors.markupAmount = 'Markup amount must be a number.';
    }

    // Validate dutyAmount
    if (typeof interest.dutyAmount !== 'number') {
      errors.dutyAmount = 'Duty amount must be a number.';
    }

    // Validate basicPremium
    if (typeof interest.basicPremium !== 'number') {
      errors.basicPremium = 'Basic premium must be a number.';
    }

    // Validate description
    if (typeof interest.description !== 'string') {
      errors.description = 'Description must be a string.';
    }

    // Validate id
    if (typeof interest.id !== 'string') {
      errors.id = 'ID must be a string.';
    }
    setValidationErrors(errors);
    return Object.values(errors).every(error => !error);
  };

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
            options={coverType}
            value={
              coverType.find(
                (c: SelectType) => c.value === interest.coverType
              ) || null
            }
            isLoading={coverTypesIsLoading}
          />
          <SelectField
            label='Interest/Item:'
            className='lg:col-span-2 '
            options={interestValues}
            onChange={e => {
              if (e) {
                setInterests(prev => {
                  return { ...prev, interest: e.value };
                });
              }
            }}
            value={
              interestValues.find(
                (c: SelectType) => c.value === interest.interest
              ) || null
            }
            isLoading={interestsLoading}
          />
          <SelectField
            label='Package Type:'
            options={packageTypes}
            onChange={e => {
              if (e) {
                setInterests(prev => {
                  return { ...prev, packageType: e.value };
                });
              }
            }}
            value={
              packageTypes.find(
                (c: SelectType) => c.value === interest.packageType
              ) || null
            }
            isLoading={interestsLoading}
          />
          <InputField
            label='Rate(%):'
            type='number'
            onChange={e => {
              setInterests(prev => {
                return { ...prev, rate: +e.target.value };
              });
            }}
            value={interest.rate}
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
            value={interest.itemCost}
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
            value={interest.freightAmount}
          />
          <InputField
            label='Markup Rate(%):'
            type='number'
            onChange={e => {
              setInterests(prev => {
                return { ...prev, markupRate: +e.target.value };
              });
            }}
            value={interest.markupRate}
          />
          <InputField
            label='Duty Rate(%):'
            type='number'
            onChange={e => {
              setInterests(prev => {
                return { ...prev, dutyRate: +e.target.value };
              });
            }}
            value={interest.dutyRate}
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
            value={interest.description}
          />
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
                  if (validateInterests()) {
                    updateInterets(interest);
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
                if (validateInterests()) {
                  addInterests({ ...interest, id: nanoid() });
                }
              }}
            >
              Add Item
            </Button>
          )}
        </div>
      </div>
      <div className='py-8'>
        <DataTable
          columns={columns}
          data={interests}
          showHeader={false}
          showActions
          onRowAction={onRowAction}
        />
      </div>
    </div>
  );
};

export default InterestItems;
