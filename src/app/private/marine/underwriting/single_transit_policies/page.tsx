'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@app/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardTitle, CardContent } from '@app/components/ui/card';
import { ListTodo } from 'lucide-react';
import { Input } from '@app/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Button } from '@app/components/ui/button';
import {
  InputFormField,
  SelectFormField,
} from '@app/components/forms/ShadcnFormFields';
import Transhipment, {
  TranshipmentType,
} from '@app/components/single_transit_policy/partials/transhipment';
import Transits, {
  TransitType,
} from '@app/components/single_transit_policy/partials/transits';
import InterestItems, {
  InterestType,
} from '@app/components/single_transit_policy/partials/interests_items';
import PolicyExtenxions, {
  PolicyExtenxionsType,
} from '@app/components/single_transit_policy/partials/policy_extensions';
import PolicyExcess from '@app/components/single_transit_policy/partials/policy_excess';
import { convertDataToSelectObject } from '@app/helpers/index';
import {
  read_countries,
  read_institutions,
  read_branches,
  read_institution_types,
  read_shipping_types,
  read_banks,
  read_ports,
  read_carriers,
  read_currencies,
  IPort,
  IBranch,
  IInstitution,
} from '@app/server/services';
import DocumentUploads from '@app/components/single_transit_policy/partials/document_uploads';

const stylesPolicySummaryItemStyles =
  'flex items-center justify-between text-sm';

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

// npmr
// Hartwell Sygrove

const customers = [
  {
    id: 1,
    fullName: 'Hartwell Sygrove',
    phoneNumber: '404-460-2527',
    email: 'hsygrove0@psu.edu',
    address: '13 Utah Lane',
    ghanaCardNumber: '61.10.247.114',
  },
  {
    id: 2,
    fullName: 'Wendel Dunkerton',
    phoneNumber: '209-839-9861',
    email: 'wdunkerton1@answers.com',
    address: '4 Briar Crest Pass',
    ghanaCardNumber: '125.157.233.91',
  },
  {
    id: 3,
    fullName: 'Tommie Shillaber',
    phoneNumber: '463-578-8069',
    email: 'tshillaber2@stumbleupon.com',
    address: '3460 Hollow Ridge Place',
    ghanaCardNumber: '242.40.128.92',
  },
  {
    id: 4,
    fullName: 'Melissa Bednell',
    phoneNumber: '336-667-7195',
    email: 'mbednell3@bbb.org',
    address: '150 Dawn Street',
    ghanaCardNumber: '23.182.249.187',
  },
  {
    id: 5,
    fullName: 'Clifford Fawlks',
    phoneNumber: '834-758-6419',
    email: 'cfawlks4@ycombinator.com',
    address: '9 Carpenter Terrace',
    ghanaCardNumber: '93.86.215.166',
  },
];

const tabsList = [
  'Transhipment',
  'Transit',
  'Interests / Items',
  'Policy Extension',
  'Policy Excess',
  'Document uploads',
];

const getCountriesPorts = (id: any, ports: []) => {
  const filteredPorts = ports?.filter((port: IPort) => port.country.id === id);
  return convertDataToSelectObject(filteredPorts);
};

const defaultValues = {
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
    ghanaCardNumber: '',
    phoneNumber: '',
  },
  inceptionDate: '',
  noKnownLoss: '',
  shippingType: 0,
  currency: 0,
  exchangeRate: '',
  commercialInvoice: '',
  billOfLadenNumber: '',
  letterOfCredit: 0,
  vesselOrFlightName: '',
  voyageOrFlightNumber: '',
  vesselFlag: '',
  countryOfImportation: 0,
  countryDestination: 0,
  portOfLoading: 0,
  portOfDestination: 0,
  sailingDate: '',
  estimatedArrivalDate: '',
  transhipment: [],
  transits: [],
  interests: [],
  policyExtension: [],
};

const formSchema = z.object({
  insuranceCompany: z.number().min(1, { message: 'Select an institution' }),
  branchOffice: z.number().min(1, { message: 'Select a branch' }),
  distributionChannel: z.string().min(1, { message: 'Select a channel' }),
  intermediaryType: z.number().min(1, { message: 'Select a type' }),
  intermediaryName: z.number().min(1, { message: 'Select a name' }),
  intermediaryBranchOffice: z.number().min(1, { message: 'Select an address' }),
  customerDetails: z.object({
    fullName: z.string(),
    ghanaCardNumber: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    email: z.string().email({ message: 'Invalid email address' }),
  }),
  inceptionDate: z.string().min(1, { message: 'Select a date' }),
  noKnownLoss: z.string(),
  shippingType: z.number().min(1, { message: 'Select a type' }),
  currency: z.number().min(1, { message: 'Select a currency' }),
  exchangeRate: z.string().min(1, { message: 'Enter a valid rate' }),
  commercialInvoice: z.string().min(1, { message: 'Enter invoice number' }),
  billOfLadenNumber: z
    .string()
    .min(1, { message: 'Enter bill of laden number' }),
  letterOfCredit: z.number().min(1, { message: 'Select a bank' }),
  carrier: z.number().min(1, { message: 'Select a carrier' }),
  vesselOrFlightName: z
    .string()
    .min(1, { message: 'Enter a vessel of flight name' }),
  vesselOrFlightNumber: z
    .string()
    .min(1, { message: 'Enter a vessel of flight name' }),
  vesselFlag: z.string().min(1, { message: 'Enter vessel flag' }),
  countryOfImportation: z.number(),
  countryOfDestination: z.number(),
  portOfLoading: z.number().min(1, { message: 'Select a port' }),
  portOfDestination: z.number().min(1, { message: 'Select a port' }),
  sailingDate: z.string().min(1, { message: 'Enter a date' }),
  estimatedArrivalDate: z.string().min(1, { message: 'Enter a date' }),
  transhipment: z.array(),
  transits: z.array(),
  interests: z.array(),
  policyExtension: z.array(),
});

const findCustomer = (fullName: string, id: string) => {
  const fullNameToLowerCase = fullName.toLowerCase();
  return customers.find(
    customer =>
      customer.fullName.toLowerCase() === fullNameToLowerCase &&
      customer.ghanaCardNumber === id
  );
};
const Page = () => {
  const [selectedTab, setSelectedTab] = useState('transhipment');
  const [branches, setBranches] = useState([]);
  const [intermediaryNames, setIntermediaryNames] = useState([]);
  const [intermediaryBranches, setIntermediaryBranches] = useState([]);
  const { items, isLoading } = read_institutions();
  const { items: institutionTypes } = read_institution_types();
  const { items: branchesItems, isLoading: branchesLoading } = read_branches();
  const { items: shippingTypes } = read_shipping_types();
  const { items: countries } = read_countries();
  const { items: banks } = read_banks();
  const { items: ports } = read_ports();
  const { items: carriers } = read_carriers();
  const { items: currencies } = read_currencies();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
      const intermediaryNames = items.filter(
        (x: IInstitution) =>
          x['institution_type']?.id === form.watch('intermediaryType')
      );
      setIntermediaryNames(intermediaryNames);
    }
  }, [form.watch('intermediaryType')]);

  useEffect(() => {
    if (form.watch('distributionChannel') === 'direct') {
      form.resetField('intermediaryType');
      form.resetField('intermediaryName');
      form.resetField('intermediaryBranchOffice');
    }
  }, [form.watch('distributionChannel')]);

  const setCustomerValues = () => {
    const customer = findCustomer(
      form.watch('customerDetails.fullName'),
      form.watch('customerDetails.ghanaCardNumber')
    );
    if (customer) {
      form.setValue('customerDetails.fullName', customer.fullName);
      form.setValue('customerDetails.phoneNumber', customer.phoneNumber);
      form.setValue('customerDetails.address', customer.address);
      form.setValue('customerDetails.email', customer.email);
      form.setValue(
        'customerDetails.ghanaCardNumber',
        customer.ghanaCardNumber
      );
    } else {
      form.setValue('customerDetails.address', '');
    }
  };

  return (
    <Card>
      <CardTitle className='flex  items-center gap-2 font-thin border-b-[1px] p-5'>
        <ListTodo />
        Single Transit Policy Details
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
                        <span>{form.watch('customerDetails.phoneNumber')}</span>
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
              <div className='p-10 border-b-[1px] md:grid space-y-4 md:space-y-0  md:grid-cols-2 md:gap-8'>
                <FormField
                  control={form.control}
                  name='inceptionDate'
                  render={({ field }) => (
                    <FormItem className='flex flex-col md:flex-row md:items-center gap-4 md:col-span-2 '>
                      <FormLabel>Inception Date:</FormLabel>
                      <FormControl>
                        <Input {...field} className=' md:w-80' type='date' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <InputFormField
                  name='noKnownLoss'
                  form={form}
                  label='No Known Loss'
                />
                <SelectFormField
                  form={form}
                  name='shippingType'
                  label='Shipping Type:'
                  options={convertDataToSelectObject(
                    shippingTypes,
                    'name',
                    'id'
                  )}
                />
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
                <InputFormField
                  form={form}
                  name='commercialInvoice'
                  label='Commercial Invoice'
                />
                <InputFormField
                  form={form}
                  name='billOfLadenNumber'
                  label='Bill Of Laden Number'
                />
                <SelectFormField
                  form={form}
                  name='letterOfCredit'
                  label='Letter Of Credit'
                  options={convertDataToSelectObject(banks)}
                />
                <SelectFormField
                  form={form}
                  name='carrier'
                  label='Carrier'
                  options={convertDataToSelectObject(carriers)}
                />
                <InputFormField
                  form={form}
                  name='vesselOrFlightName'
                  label='Vessel/Flight Name'
                />
                <InputFormField
                  form={form}
                  name='vesselOrFlightNumber'
                  label='Vessel/Flight Number'
                />
                <div className='md:col-span-2'>
                  <InputFormField
                    form={form}
                    name='vesselFlag'
                    label='Vessel Flag'
                  />
                </div>
                <SelectFormField
                  form={form}
                  name='countryOfImportation'
                  label='Country of Importation/Exportation'
                  options={convertDataToSelectObject(countries)}
                />
                <SelectFormField
                  form={form}
                  name='countryOfDestination'
                  label='Country of Destination'
                  options={convertDataToSelectObject(countries)}
                />
                <SelectFormField
                  form={form}
                  name='portOfLoading'
                  label='Port of Loading'
                  options={getCountriesPorts(
                    form.watch('countryOfImportation'),
                    ports
                  )}
                />
                <SelectFormField
                  form={form}
                  name='portOfDestination'
                  label='Port of Destination'
                  options={getCountriesPorts(
                    form.watch('countryOfDestination'),
                    ports
                  )}
                />
                <FormField
                  control={form.control}
                  name='sailingDate'
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-4 px-5'>
                      <FormLabel>Sailing Date:</FormLabel>
                      <FormControl>
                        <Input {...field} className='w-80' type='date' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='estimatedArrivalDate'
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-4 px-5'>
                      <FormLabel>Estimated Arrival Date:</FormLabel>
                      <FormControl>
                        <Input {...field} className='w-80' type='date' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
              {selectedTab.toLowerCase() === 'transhipment' && (
                <Transhipment
                  transhipments={form.watch('transhipment')}
                  addTranshipments={(transhipment: TranshipmentType) =>
                    addToTable(transhipment, 'transhipment', form)
                  }
                  updateTranshipment={(transhipment: TranshipmentType) =>
                    updateTableValue(transhipment, 'transhipment', form)
                  }
                  deleteTranshipment={(id: string) =>
                    deleteTableValue(id, 'transhipment', form)
                  }
                />
              )}
              {selectedTab.toLowerCase() === 'transit' && (
                <Transits
                  transits={form.watch('transits')}
                  addTransit={(transit: TransitType) =>
                    addToTable(transit, 'transits', form)
                  }
                  updateTransit={(transit: TransitType) =>
                    updateTableValue(transit, 'transits', form)
                  }
                  deleteTransit={(id: string) =>
                    deleteTableValue(id, 'transits', form)
                  }
                />
              )}
              {selectedTab.toLowerCase() === 'interests / items' && (
                <InterestItems
                  addInterests={(interests: InterestType) =>
                    addToTable(interests, 'interests', form)
                  }
                  interests={form.watch('interests')}
                  deleteInterest={(id: string) =>
                    deleteTableValue(id, 'interests', form)
                  }
                  updateInterets={(interest: InterestType) =>
                    updateTableValue(interest, 'interests', form)
                  }
                />
              )}
              {selectedTab.toLowerCase() === 'policy extension' && (
                <PolicyExtenxions
                  addPolicyExtension={(policyExtenxion: PolicyExtenxionsType) =>
                    addToTable(policyExtenxion, 'policyExtension', form)
                  }
                  policyExtensions={form.watch('policyExtension')}
                  deletePolicyExtension={(id: string) =>
                    deleteTableValue(id, 'policyExtension', form)
                  }
                  updatePolicyExtension={(
                    policyExtension: PolicyExtenxionsType
                  ) =>
                    updateTableValue(policyExtension, 'policyExtension', form)
                  }
                />
              )}
              {selectedTab.toLowerCase() === 'policy excess' && (
                <PolicyExcess />
              )}
              {selectedTab.toLowerCase() === 'document uploads' && (
                <DocumentUploads />
              )}
              <div className='ml-auto mr-0 block  p-5 w-[400px] shadow-md rounded-md '>
                <h3>Policy Summary</h3>

                <div className='space-y-4 py-1 my-3 border-b-2 border-t-2'>
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Sum Insured:</span> <span>GH₵0.00</span>
                  </p>
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Basic Premium:</span> <span>GH₵0.00</span>
                  </p>
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Loadings(%):</span> <span>0000%</span>
                  </p>
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Total Loadings:</span> <span>GH₵10.00</span>
                  </p>
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Maintenance fee:</span> <span>3000</span>
                  </p>
                </div>
                <p className='flex items-center justify-between'>
                  <span>Premium Payable:</span> <span>GH₵100.00</span>
                </p>
              </div>
            </div>
            <div className='flex justify-end mx-12 my-5'>
              <Button type='submit' variant='primary'>
                Submit Proposal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
