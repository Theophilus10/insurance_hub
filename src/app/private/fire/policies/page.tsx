'use client';

import * as z from 'zod';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@app/components/ui/card';
import { ListTodo } from 'lucide-react';
import { Form, FormItem, FormLabel } from '@app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  InputFormField,
  SelectFormField,
} from '@app/components/forms/ShadcnFormFields';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { convertDataToSelectObject } from '@app/helpers/index';
import {
  read_institutions,
  read_branches,
  read_institution_types,
  read_currencies,
  IBranch,
  IInstitution,
  read_customer,
  read_banks,
  read_financial_interests,
} from '@app/server/services';
import {
  BuildingItemDetailsType,
  ExcessType,
  PerilsType,
} from '@app/types/policyTypes';
import { createFirePolicy } from '@app/server/services/policies/fire';
import BuildingItemDetails from '@app/components/fire/BuildingItemDetails';
import Perils from '@app/components/fire/Perils';
import Excesses from '@app/components/fire/Excesses';

const tabsList = [
  'Building/Item Details',
  'Perils',
  'Excesses',
  'Document uploads',
];

const addToTable = (value: any, watchValue: string, form: any) =>
  form.setValue(watchValue, [value, ...form.watch(watchValue)]);

const updateTableValue = (value: any, watchValue: string, form: any) => {
  const withoutValue = form
    .watch(watchValue)
    .filter((t: any) => t.id !== value.id);

  form.setValue(watchValue, [value, ...withoutValue]);
};

const deleteTableValue = (id: string, watchValue: any, form: any) => {
  const filteredValues = form.watch(watchValue).filter((t: any) => t.id !== id);
  form.setValue(watchValue, filteredValues);
};

const distributionChannel = [
  { value: 'indirect', label: 'INDIRECT' },
  { value: 'direct', label: 'DIRECT' },
];

const insuranceCompanies = [
  { value: 'Hollard', label: 'Hollard' },
  { value: 'GLICO', label: 'GLICO' },
  { value: 'Providence', label: 'Providence' },
  { value: 'New One', label: 'New One' },
  { value: 'Another One', label: 'Another One' },
  { value: 'We the best Insurance', label: 'We the best Insurance' },
];

const formSchema = z.object({
  insuranceCompany: z.number().min(1, { message: 'Select an institution' }),
  branchOffice: z.number().min(1, { message: 'Select a branch' }),
  distributionChannel: z.string().min(1, { message: 'Select a channel' }),
  intermediaryType: z.number(),
  intermediaryName: z.number(),
  intermediaryBranchOffice: z.number(),
  customerDetails: z.object({
    id: z.number().min(1, { message: 'Select a customer' }),
    fullName: z.string(),
    ghanaCardNumber: z.number(),
    phoneNumber: z.string(),
    address: z.string(),
    email: z.string(),
  }),
  inceptionDate: z.string().min(1, { message: 'Select a date' }),
  expiryDate: z.string().min(1, { message: 'Select a date' }),
  currency: z.number().min(1, { message: 'Select a currency' }),
  exchangeRate: z.string().min(1, { message: 'Enter a valid rate' }),
  riskClass: z.number().min(1, { message: 'Select a risk class' }),
  insuredInterest: z.number().min(1, { message: 'Select insured interest' }),
  letterOfCredit: z.number().min(1, { message: 'Select a bank' }),
  propertyType: z.number().min(1, { message: 'Select a property type' }),
  buildingItemsDetails: z
    .array(
      z.object({
        id: z.string(),
        itemDescription: z.string(),
        value: z.number(),
        region: z.string(),
        collapseRate: z.number(),
        fireRate: z.number(),
        publicLiabilityRate: z.number(),
        digitalAddress: z.string(),
        itemLocation: z.string(),
      })
    )
    .optional(),
  perils: z
    .array(
      z.object({
        id: z.string(),
        perilRate: z.number(),
        additionalPeril: z.string(),
      })
    )
    .optional(),
  excesses: z
    .array(
      z.object({
        id: z.string(),
        policyExcesses: z.string(),
        excessRate: z.number(),
      })
    )
    .optional(),
});

const findCustomer = async (fullName: string, id: number) => {
  const fullNameToLowerCase = fullName.toLowerCase();
  const customer = await read_customer(id);
  if (!customer.success) return false;
  if (customer?.data.name.toLowerCase() == fullNameToLowerCase)
    return customer.data;
};

const Page = () => {
  const [selectedTab, setSelectedTab] = useState('building/item details');
  const [branches, setBranches] = useState([]);
  const [intermediaryNames, setIntermediaryNames] = useState([]);
  const [intermediaryBranches, setIntermediaryBranches] = useState([]);
  const [customerError, setCustomerError] = useState('');
  const [intermediaryErrors, setIntermediaryErrors] = useState({});
  const { items, isLoading } = read_institutions();
  const { items: institutionTypes } = read_institution_types();
  const { items: branchesItems, isLoading: branchesLoading } = read_branches();
  const { items: currencies } = read_currencies();
  const { items: financialInterests } = read_financial_interests();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      insuranceCompany: 0,
      branchOffice: 0,
      distributionChannel: '',
      intermediaryName: 0,
      intermediaryType: 0,
      intermediaryBranchOffice: 0,
      customerDetails: {
        fullName: '',
        address: '',
        email: '',
        ghanaCardNumber: 0,
        phoneNumber: '',
        id: 0,
      },
      inceptionDate: '',
      expiryDate: '',
      currency: 0,
      exchangeRate: '',
      letterOfCredit: 0,
      buildingItemsDetails: [],
      perils: [],
      excesses: [],
    },
  });

  const setCustomerValues = async () => {
    const customer = await findCustomer(
      form.watch('customerDetails.fullName'),
      form.watch('customerDetails.ghanaCardNumber')
    );

    if (customer) {
      form.setValue('customerDetails.id', customer?.id);
      form.setValue('customerDetails.fullName', customer?.name);
      form.setValue('customerDetails.phoneNumber', customer?.phone);
      form.setValue('customerDetails.address', customer['postal_address']);
      form.setValue('customerDetails.email', customer?.email);
      form.setValue('customerDetails.ghanaCardNumber', customer?.id);
    } else {
      form.resetField('customerDetails');
      setCustomerError('Customer not found');
    }
  };

  useEffect(() => {
    if (branchesItems && !branchesLoading) {
      const newBranches = branchesItems.filter(
        (x: IBranch) => x.institution.id === form.watch('insuranceCompany')
      );
      setBranches(newBranches);
    }
  }, [form.watch('insuranceCompany')]);

  useEffect(() => {
    if (branchesItems && !branchesLoading) {
      const newBranches = branchesItems.filter(
        (x: IBranch) => x.institution.id === form.watch('intermediaryName')
      );
      setIntermediaryBranches(newBranches);
    }
  }, [form.watch('intermediaryName')]);

  useEffect(() => {
    if (items && !isLoading) {
      const intermediaryNameValues = items.filter(
        (x: IInstitution) =>
          x['institution_type']?.id === form.watch('intermediaryType')
      );
      setIntermediaryNames(intermediaryNameValues);
    }
  }, [form.watch('intermediaryType')]);

  useEffect(() => {
    if (form.watch('distributionChannel') === 'direct') {
      form.resetField('intermediaryType');
      form.resetField('intermediaryName');
      form.resetField('intermediaryBranchOffice');
    }
  }, [form.watch('distributionChannel')]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIntermediaryErrors({});
    if (values.distributionChannel !== 'direct') {
      if (values.intermediaryType === 0) {
        setIntermediaryErrors(prev => {
          return {
            ...prev,
            intermediaryType: 'Select an intermediary type',
          };
        });
      }
      if (values.intermediaryName === 0) {
        setIntermediaryErrors(prev => {
          return {
            ...prev,
            intermediaryName: 'Select an intermediary name',
          };
        });
      }
      if (values.intermediaryBranchOffice === 0) {
        setIntermediaryErrors(prev => {
          return {
            ...prev,
            intermediaryBranchOffice: 'Select an intermediary branch',
          };
        });
      }
    }
    if (
      values.distributionChannel !== 'direct' &&
      (values.intermediaryType === 0 ||
        values.intermediaryName === 0 ||
        values.intermediaryBranchOffice === 0)
    ) {
      return intermediaryErrors;
    }

    console.log(values);
    const formData = {
      policy: {
        ['exchange_rate']: parseInt(values.exchangeRate),
        ['customer_id']: values.customerDetails.id,
        ['insurer_id']: values.insuranceCompany,
        ['distribution_channel']: values.distributionChannel,
        ['intermediary_id']: values.intermediaryName,
        ['currency_id']: values.currency,
        ['letter_of_credit_id']: values.letterOfCredit,
      },
      ['inception_date']: values.inceptionDate,
      ['expiry_date']: values.expiryDate,
      ['risk_class_id']: values.riskClass,
      ['policy_items']: [],
      ['policy_perils']: [],
      ['policy_excesses']: [],
    };
    await createFirePolicy(formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Card>
        <CardTitle className='flex  items-center gap-2 font-thin border-b-[1px] p-5'>
          <ListTodo />
          Fire Policy
        </CardTitle>
        <CardContent className='px-0'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='border-b-[5px]'>
                <div className='p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8   '>
                  <SelectFormField
                    form={form}
                    name='insuranceCompany'
                    label='Insurance Company'
                    options={convertDataToSelectObject(items)}
                    isLoading={isLoading}
                    placeholder='Select an insurance company'
                  />
                  <SelectFormField
                    form={form}
                    name='branchOffice'
                    label='Branch Office'
                    options={convertDataToSelectObject(branches)}
                    placeholder='Select a branch office'
                  />
                </div>
                <div className='p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8 '>
                  <SelectFormField
                    form={form}
                    name='distributionChannel'
                    label='Distribution Channel'
                    options={distributionChannel}
                    placeholder='Select a distribution channel'
                  />
                  <SelectFormField
                    form={form}
                    name='intermediaryType'
                    label='Intermediary Type:'
                    options={convertDataToSelectObject(
                      institutionTypes,
                      'name',
                      'id'
                    )}
                    disabled={form.watch('distributionChannel') === 'direct'}
                    placeholder='Select an intermediary type'
                  />
                  <SelectFormField
                    form={form}
                    name='intermediaryName'
                    label='Intermediary Name:'
                    options={convertDataToSelectObject(
                      intermediaryNames,
                      'name',
                      'id'
                    )}
                    disabled={form.watch('distributionChannel') === 'direct'}
                    placeholder='Select an intermediary name'
                  />
                  <SelectFormField
                    form={form}
                    name='intermediaryBranchOffice'
                    label='Branch Office of Intermediary:'
                    options={convertDataToSelectObject(
                      intermediaryBranches,
                      'name',
                      'id'
                    )}
                    disabled={form.watch('distributionChannel') === 'direct'}
                    placeholder='Select a branch office'
                  />
                </div>
                <div className='p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8 '>
                  <FormItem>
                    <FormLabel> Policy To:</FormLabel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                      <Input
                        placeholder='Full Name'
                        {...form.register('customerDetails.fullName')}
                      />
                      <Input
                        placeholder='ID Number'
                        {...form.register('customerDetails.ghanaCardNumber')}
                      />
                      <div className='flex items-center flex-wrap gap-4 px-5 '>
                        <Button variant='primary' type='button'>
                          Add New Customer
                        </Button>
                        <Button
                          variant='secondary'
                          type='button'
                          onClick={setCustomerValues}
                        >
                          Find Customer
                        </Button>
                      </div>
                    </div>
                  </FormItem>
                  <div className='px-5 space-y-1 text-gray-700'>
                    {form.watch('customerDetails.address') ? (
                      <>
                        <p className='grid grid-cols-3 '>
                          <span>Name:</span>{' '}
                          <span>{form.watch('customerDetails.fullName')}</span>
                        </p>
                        <p className='grid grid-cols-3'>
                          <span>Telephone:</span>{' '}
                          <span>
                            {form.watch('customerDetails.phoneNumber')}
                          </span>
                        </p>
                        <p className='grid grid-cols-3'>
                          <span>Email:</span>{' '}
                          <span>{form.watch('customerDetails.email')}</span>
                        </p>
                        <p className='grid grid-cols-3'>
                          <span>Address:</span>{' '}
                          <span>{form.watch('customerDetails.address')}</span>
                        </p>
                        <p className='grid grid-cols-3'>
                          <span>Ghana Card No.:</span>{' '}
                          <span>
                            {form.watch('customerDetails.ghanaCardNumber')}
                          </span>
                        </p>
                      </>
                    ) : (
                      <p>
                        {(form.formState.errors.customerDetails?.address
                          ?.message &&
                          'Select a Customer') ||
                          'No Customer Found'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className='border-b-[5px]'>
                <div className='p-10 grid lg:grid-cols-2 gap-8'>
                  <div className='flex lg:col-span-2 items-center gap-10 md:gap-0 flex-wrap justify-between lg:justify-around'>
                    <InputFormField
                      form={form}
                      className='flex flex-col lg:flex-row items-start lg:items-center lg:w-[40%] '
                      labelStyle=' lg:w-[40%] 2xl:w-[30%]'
                      name='inceptionDate'
                      label='Inception Date:'
                      type='date'
                    />
                    <InputFormField
                      form={form}
                      className='flex flex-col lg:flex-row items-start lg:items-center lg:w-[40%] '
                      labelStyle=' lg:w-[40%] 2xl:w-[30%] '
                      name='expiryDate'
                      label='Expiry Date:'
                      type='date'
                    />
                  </div>
                  <SelectFormField
                    form={form}
                    name='currency'
                    label='Currency'
                    options={convertDataToSelectObject(currencies)}
                  />
                  <InputFormField
                    form={form}
                    name='exchangeRate'
                    label='Exchange Rate'
                    type='number'
                  />
                  <SelectFormField
                    form={form}
                    name='letterOfCredit'
                    label='Letter Of Credit'
                    options={convertDataToSelectObject(financialInterests)}
                  />
                  <SelectFormField
                    options={[
                      { label: 'Test 1', value: 1 },
                      { label: 'Test 2', value: 2 },
                    ]}
                    form={form}
                    name='riskClass'
                    label='Risk Class'
                  />
                  <SelectFormField
                    options={[
                      { label: 'Test 1', value: 1 },
                      { label: 'Test 2', value: 2 },
                    ]}
                    form={form}
                    name='insuredInterest'
                    label='Insured interest'
                  />
                  <SelectFormField
                    options={[
                      { label: 'Test 1', value: 1 },
                      { label: 'Test 2', value: 2 },
                    ]}
                    form={form}
                    name='propertyType'
                    label='Property Type'
                  />
                </div>
              </div>
              <div className='border-b-[1px] p-10'>
                <div className='lg:flex items-center hidden  gap-1  '>
                  {tabsList.map(tab => (
                    <button
                      type='button'
                      className={`${
                        tab.toLowerCase() === selectedTab.toLowerCase() &&
                        'bg-blue-900 font-medium text-white'
                      } px-4 py-2 rounded-md text-center`}
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <Select onValueChange={e => setSelectedTab(e)}>
                  <SelectTrigger className='w-[180px] lg:hidden'>
                    <SelectValue placeholder='Select a tab' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {tabsList.map(tab => (
                        <SelectItem key={tab} value={tab}>
                          {tab}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {selectedTab.toLowerCase() === 'building/item details' && (
                  <BuildingItemDetails
                    items={form.watch('buildingItemsDetails') || []}
                    addItem={(item: BuildingItemDetailsType) =>
                      addToTable(item, 'buildingItemsDetails', form)
                    }
                    deleteItem={(id: string) =>
                      deleteTableValue(id, 'buildingItemsDetails', form)
                    }
                    updateItem={(item: BuildingItemDetailsType) =>
                      updateTableValue(item, 'buildingItemsDetails', form)
                    }
                  />
                )}
                {selectedTab.toLowerCase() === 'perils' && (
                  <Perils
                    items={form.watch('perils') || []}
                    addItem={(item: PerilsType) =>
                      addToTable(item, 'perils', form)
                    }
                    deleteItem={(id: string) =>
                      deleteTableValue(id, 'perils', form)
                    }
                    updateItem={(item: PerilsType) =>
                      updateTableValue(item, 'perils', form)
                    }
                  />
                )}
                {selectedTab.toLowerCase() === 'excesses' && (
                  <Excesses
                    items={form.watch('excesses') || []}
                    addItem={(item: ExcessType) =>
                      addToTable(item, 'excesses', form)
                    }
                    deleteItem={(id: string) =>
                      deleteTableValue(id, 'excesses', form)
                    }
                    updateItem={(item: ExcessType) =>
                      updateTableValue(item, 'excesses', form)
                    }
                  />
                )}
              </div>
              <div className='flex items-end justify-end p-5'>
                <Button variant='primary'>Submit Proposal</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
