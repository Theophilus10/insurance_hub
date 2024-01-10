'use client';

import * as z from 'zod';
import { Card, CardContent, CardTitle } from '@app/components/ui/card';
import { ListTodo } from 'lucide-react';
import { Form, FormItem, FormLabel } from '@app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  InputFormField,
  SelectFormField,
  TextareaFormField,
} from '@app/components/forms/ShadcnFormFields';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';

const insuranceCompanies = [
  { value: 'Hollard', label: 'Hollard' },
  { value: 'GLICO', label: 'GLICO' },
  { value: 'Providence', label: 'Providence' },
  { value: 'New One', label: 'New One' },
  { value: 'Another One', label: 'Another One' },
  { value: 'We the best Insurance', label: 'We the best Insurance' },
];
const companyBranches = [{ value: 'Kumasi', label: 'Kumasi' }];

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
  transits: z.array(
    z.object({
      originCountry: z.string(),
      destinationCountry: z.string(),
      rate: z.number(),
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
      transits: [],
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
    <div>
      <Card>
        <CardTitle className='flex  items-center gap-2 font-thin border-b-[1px] p-5'>
          <ListTodo />
          Open Cover Policy
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
                    options={insuranceCompanies}
                  />
                  <SelectFormField
                    form={form}
                    name='branchOffice'
                    label='Branch Office'
                    options={companyBranches}
                  />
                </div>
                <div className='p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8 '>
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
                    name='inceptionDate'
                    label='Expiry Date:'
                    type='date'
                  />
                </div>
                <InputFormField
                  form={form}
                  name='inceptionDate'
                  label='Limit Per Shipment/Bottom'
                />
                <InputFormField
                  form={form}
                  name='inceptionDate'
                  label='Estimated Annual Shipment Value'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Policy Declaration'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Contracting Clause'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Cancellation Clause'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Conveyance'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Voyages'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Conditions'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Policies'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Interest'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Base Of Valuations'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Rates'
                  className='lg:col-span-2'
                />
                <TextareaFormField
                  form={form}
                  name='inceptionDate'
                  label='Dedcuctible'
                  className='lg:col-span-2'
                />
              </div>
              <div className='flex items-end justify-end p-5'>
                <Button variant='primary'>Submit Open Cover</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
