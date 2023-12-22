'use client';

import { FormItem, FormLabel } from '@app/components/ui/form';
import Select from 'react-select';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface SelectFieldProps {
  label?: string;
  options: { value: string; label: string }[];
  onChange: (value: any) => void;
  className?: string;
  placeholder?: string;
}

export const SelectField = ({
  label,
  options,
  onChange,
  className,
  placeholder,
}: SelectFieldProps) => (
  <FormItem className={className}>
    <FormLabel>{label}</FormLabel>
    <Select options={options} onChange={onChange} placeholder={placeholder} />
  </FormItem>
);

interface InputFieldProps {
  label?: string;
  onChange: (value: any) => void;
  type?: string;
  className?: string;
  placeholder?: string;
}

export const InputField = ({
  label,
  onChange,
  type,
  className,
  placeholder,
}: InputFieldProps) => (
  <FormItem className={className}>
    <FormLabel>{label}</FormLabel>
    <Input type={type} onChange={onChange} placeholder={placeholder} />
  </FormItem>
);

export const TextAreaField = ({
  label,
  onChange,
  className,
  placeholder,
}: InputFieldProps) => (
  <FormItem className={className}>
    <FormLabel>{label}</FormLabel>
    <Textarea onChange={onChange} placeholder={placeholder} />
  </FormItem>
);
