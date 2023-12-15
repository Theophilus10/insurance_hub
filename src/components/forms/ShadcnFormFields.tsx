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
import Select from 'react-select';
import { Input } from '../ui/input';

interface SelectFormFieldProps {
  form: any;
  name: string;
  options: { value: any; label: string }[];
  label: string;
  showWatchValue?: boolean;
}

interface InputFormFieldProps {
  form: any;
  name: string;
  label: string;
  showWatchValue?: boolean;
  type?: string;
}

export const SelectFormField = ({
  form,
  name,
  options,
  label,
  showWatchValue = true,
}: SelectFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { name, onBlur, onChange, ref, disabled } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              options={options}
              name={name}
              isDisabled={disabled}
              onBlur={onBlur}
              ref={ref}
              onChange={e => onChange(e && e.value)}
            />
          </FormControl>
          {showWatchValue && (
            <FormDescription className='pl-5'>
              {form.watch(name)}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const InputFormField = ({
  form,
  name,
  label,
  showWatchValue = false,
  type = 'text',
}: InputFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} />
          </FormControl>
          {showWatchValue && (
            <FormDescription className='pl-5'>
              {form.watch(name)}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
