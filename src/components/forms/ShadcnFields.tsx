'use client';

import { FormItem, FormLabel, FormMessage } from '@app/components/ui/form';
import Select from 'react-select';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface SelectFieldProps {
  label?: string;
  options: { value: string; label: string }[];
  onChange: (value: any) => void;
  className?: string;
  placeholder?: string;
  value?: any;
  isLoading?: boolean;
}

export const SelectField = ({
  label,
  options,
  onChange,
  className,
  placeholder,
  value,
  isLoading,
}: SelectFieldProps) => (
  <FormItem className={className}>
    <FormLabel>{label}</FormLabel>
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      isLoading={isLoading}
    />
  </FormItem>
);

interface InputFieldProps {
  label?: string;
  onChange: (value: any) => void;
  type?: string;
  className?: string;
  placeholder?: string;
  value?: any;
}

export const InputField = ({
  label,
  onChange,
  type,
  className,
  placeholder,
  value,
}: InputFieldProps) => (
  <FormItem className={className}>
    <FormLabel>{label}</FormLabel>
    <Input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  </FormItem>
);

export const TextAreaField = ({
  label,
  onChange,
  className,
  placeholder,
  value,
}: InputFieldProps) => (
  <FormItem className={className}>
    <FormLabel>{label}</FormLabel>
    <Textarea onChange={onChange} placeholder={placeholder} value={value} />
  </FormItem>
);
