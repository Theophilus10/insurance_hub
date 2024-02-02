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
  read_customer,
} from '@app/server/services';
import { createSingleTransitPolicy } from '@app/server/services/policies/marine/index';
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
    ghanaCardNumber: 0,
    phoneNumber: '',
    id: 0,
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
  policyExcess: '',
};

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
  transhipment: z
    .array(
      z.object({
        id: z.string(),
        originCountry: z.string(),
        destinationCountry: z.string(),
        rate: z.number(),
        description: z.string(),
      })
    )
    .min(1, { message: 'Add transhipments' }),
  transits: z
    .array(
      z.object({
        originCountry: z.string(),
        destinationCountry: z.string(),
        rate: z.number(),
        id: z.string(),
      })
    )
    .optional(),
  interests: z
    .array(
      z.object({
        coverType: z.number(),
        interest: z.number(),
        packageType: z.string(),
        rate: z.number(),
        itemCost: z.number(),
        freightAmount: z.number(),
        markupRate: z.number(),
        dutyRate: z.number(),
        sumInsured: z.number(),
        markupAmount: z.number(),
        dutyAmount: z.number(),
        basicPremium: z.number(),
        description: z.string(),
        id: z.string(),
      })
    )
    .min(1, { message: 'Add interest items' }),
  policyExtension: z
    .array(
      z.object({
        exchangeRate: z.number(),
        extension: z.number(),
        id: z.string(),
      })
    )
    .min(1, { message: 'Add policy extension' }),
  policyExcess: z.string(),
});

const findCustomer = async (fullName: string, id: number) => {
  const fullNameToLowerCase = fullName.toLowerCase();
  const customer = await read_customer(id);
  if (!customer.success) return false;
  if (customer?.data.name.toLowerCase() == fullNameToLowerCase)
    return customer.data;
};

const Page = () => {
  const [selectedTab, setSelectedTab] = useState('transhipment');
  const [branches, setBranches] = useState([]);
  const [intermediaryNames, setIntermediaryNames] = useState([]);
  const [intermediaryBranches, setIntermediaryBranches] = useState([]);
  const [customerError, setCustomerError] = useState('');
  const [intermediaryErrors, setIntermediaryErrors] = useState({});
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

    const formData = {
      ['vessel_flag']: values.vesselFlag,
      ['flight_vessel_number']: values.vesselOrFlightNumber,
      ['flight_vessel_name']: values.vesselOrFlightName,
      ['bill_of_laden_number']: values.billOfLadenNumber,
      ['commercial_invoice_number']: values.commercialInvoice,
      ['no_known_loss']: values.noKnownLoss,
      ['exchange_rate']: +values.exchangeRate,
      ['customer_id']: values.customerDetails.id,
      ['insurer_id']: values.customerDetails.id,
      ['distribution_channel']: values.distributionChannel,
      ['issue_date']: values.inceptionDate,
      ['policy_excess']: '',
      ['currency_id']: values.currency,
      ['shipping_type_id']: values.shippingType,
      ['carrier_id']: values.carrier,
      ['country_of_origin_id']: values.countryOfImportation,
      ['country_of_destination_id']: values.countryOfDestination,
      ['port_of_loading_id']: values.portOfLoading,
      ['port_of_destination_id']: values.portOfDestination,
      ['sailing_date']: values.sailingDate,
      ['estimated_arrival_date']: values.estimatedArrivalDate,
      ['policy_extensions']: values.policyExtension,
      interests: values.interests,
      transhipments: values.transhipment,
      transits: values.transits,
      ['intermediary_id']: values.intermediaryName,
      ['letter_of_credit_id']: values.letterOfCredit,
      ['open_cover_policy_id']: '',
    };

    const singleTransitPolicies =
      JSON.parse(localStorage.getItem('singleTransitPolicies')!) || [];
    singleTransitPolicies.push(formData);
    localStorage.setItem(
      'singleTransitPolicies',
      JSON.stringify(singleTransitPolicies)
    );
    form.reset();
    // const response = await createSingleTransitPolicy(formData);
    // console.log(response);
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
                    <p
                      className={`${
                        form.formState.errors.customerDetails?.id?.message ||
                        (customerError && 'text-red-500')
                      }`}
                    >
                      {form.formState.errors.customerDetails?.id?.message ||
                        customerError}
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
                  transits={form.watch('transits') || []}
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
                <PolicyExcess
                  policyExcess={form.watch('policyExcess')}
                  onChange={(value: string) =>
                    form.setValue('policyExcess', value)
                  }
                />
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
