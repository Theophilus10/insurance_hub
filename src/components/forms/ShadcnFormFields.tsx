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
import { Textarea } from '../ui/textarea';

interface SelectFormFieldProps {
  form: any;
  name: string;
  options: { value: any; label: string }[];
  label?: string;
  showWatchValue?: boolean;
  className?: string;
  labelStyle?: string;
}

interface InputFormFieldProps {
  form: any;
  name: string;
  label?: string;
  showWatchValue?: boolean;
  type?: string;
  className?: string;
  labelStyle?: string;
}

export const SelectFormField = ({
  form,
  name,
  options,
  label,
  showWatchValue = true,
  className,
  labelStyle,
}: SelectFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { name, onBlur, onChange, ref, disabled } }) => (
        <FormItem className={className}>
          <FormLabel className={labelStyle}>{label}</FormLabel>
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
  className,
  labelStyle,
}: InputFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelStyle}>{label}</FormLabel>
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

export const TextareaFormField = ({
  form,
  name,
  label,
  showWatchValue = false,
  className,
  labelStyle,
}: InputFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelStyle}>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
