'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardTitle, CardContent } from '@app/components/ui/card';
import { ListTodo } from 'lucide-react';
import { Input } from '@app/components/ui/input';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@app/components/ui/button';
import {
  InputFormField,
  SelectFormField,
} from '@app/components/forms/ShadcnFormFields';
import Transhipment, {
  TranshipmentType,
} from '@app/components/single_transit_policy/partials/transhipment';

const insuranceCompanies = [
  { value: 'Hollard', label: 'Hollard' },
  { value: 'GLICO', label: 'GLICO' },
  { value: 'Providence', label: 'Providence' },
  { value: 'New One', label: 'New One' },
  { value: 'Another One', label: 'Another One' },
  { value: 'We the best Insurance', label: 'We the best Insurance' },
];
const companyBranches = [{ value: 'Kumasi', label: 'Kumasi' }];

// 61.10.247.114
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

const formSchema = z.object({
  insuranceCompany: z.string().min(1, { message: 'Select an institution' }),
  branchOffice: z.string().min(1, { message: 'Select a branch' }),
  distributionChannel: z.string().min(1, { message: 'Select a channel' }),
  intermediaryType: z.string().min(1, { message: 'Select a type' }),
  intermediaryName: z.string().min(1, { message: 'Select a name' }),
  branchOfficeAddress: z.string().min(1, { message: 'Select an address' }),
  customerDetails: z.object({
    fullName: z.string(),
    ghanaCardNumber: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    email: z.string().email({ message: 'Invalid email address' }),
  }),
  inceptionDate: z.string().min(1, { message: 'Select a date' }),
  transhipment: z.array(
    z.object({
      originCountry: z.string(),
      destinationCountry: z.string(),
      rate: z.number(),
      description: z.string(),
    })
  ),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      insuranceCompany: '',
      branchOffice: '',
      branchOfficeAddress: '',
      customerDetails: {
        fullName: '',
        address: '',
        email: '',
        ghanaCardNumber: '',
        phoneNumber: '',
      },
      distributionChannel: '',
      intermediaryName: '',
      inceptionDate: '',
      intermediaryType: '',
      transhipment: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
              <div className='p-5 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-4   '>
                <SelectFormField
                  form={form}
                  name='insuranceCompany'
                  label='Insurance Company'
                  options={insuranceCompanies}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Branch Office'
                  options={companyBranches}
                />
              </div>
              <div className='p-5 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-4 '>
                <SelectFormField
                  form={form}
                  name='distributionChannel'
                  label='Distribution Channel'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='intermediaryType'
                  label='Intermediary Type:'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='intermediaryName'
                  label='Intermediary Name:'
                  options={insuranceCompanies}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Branch Office of Intermediary:'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
              </div>
              <div className='p-5 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-4 '>
                <FormItem>
                  <FormLabel> Policy To:</FormLabel>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
              <div className='p-5 border-b-[1px] md:grid space-y-4 md:space-y-0  md:grid-cols-2 md:gap-4'>
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
                  name='inceptionDate'
                  form={form}
                  label='No Known Loss'
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Shipping Type:'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Currency'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Exchange Rate'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Commercial Invoice'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Bill Of Laden Number'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Letter Of Credit'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Voyage/Flight Number'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <div className='md:col-span-2'>
                  <InputFormField
                    form={form}
                    name='branchOffice'
                    label='Voyage/Flight Number'
                    showWatchValue={false}
                  />
                </div>
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Country of Importation/Exportation'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Country of Destination'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Port of Loading'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <SelectFormField
                  form={form}
                  name='branchOffice'
                  label='Port of Destination'
                  options={insuranceCompanies}
                  showWatchValue={false}
                />
                <FormField
                  control={form.control}
                  name='inceptionDate'
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
                  name='inceptionDate'
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
            <div className='border-b-[1px] p-5'>
              <div className='flex items-center  gap-1  '>
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
              <Transhipment
                transhipments={form.watch('transhipment')}
                addTranshipments={(trans: TranshipmentType) =>
                  form.setValue('transhipment', [
                    trans,
                    ...form.watch('transhipment'),
                  ])
                }
              />
            </div>
          </form>
          <div className='flex justify-end mx-12 my-5'>
            <Button type='submit'>Submit</Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
