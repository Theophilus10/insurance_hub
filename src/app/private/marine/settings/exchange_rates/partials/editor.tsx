'use client';
import Form from '@app/components/forms/Form';
import InputField from '@app/components/forms/InputField';
import SelectField from '@app/components/forms/SelectField';
import { Button } from '@app/components/ui/button';
import { showError, showSuccess } from '@app/lib/utils';
import {
  IExchangeRate,
  create_exchange_rate,
  update_exchange_rate,
} from '@app/server/services';
import React, { useEffect, useState } from 'react';
import * as z from 'zod';

const initialValues = {
  rate: 0,
  currency_id: 0,
};

interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: IExchangeRate;
  currencies: any[];
}

const schema = z.object({
  rate: z
    .number({
      invalid_type_error: 'Rate is required',
      required_error: 'Rate is required',
    })
    .refine(value => value !== 0, {
      message: 'Rate is required',
    }),
  currency_id: z
    .number({
      invalid_type_error: 'Currency is required',
      required_error: 'Currency is required',
    })
    .refine(value => value !== 0, {
      message: 'Currency is required',
    }),
});

const Editor: React.FC<EditorProps> = ({
  id = 0,
  edit = false,
  isDone,
  data,
  currencies = [],
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setFormData({
        rate: data.rate,
        currency_id: data.currency.id,
      });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_exchange_rate(id, {
            rate: values.rate,
            country_id: values.country_id,
          })
        : await create_exchange_rate({
            rate: values.rate,
            country_id: values.country_id,
          });

      if (res.success) {
        showSuccess(
          edit
            ? 'Successfully updated an exchange rate'
            : 'Successfully created an exchange rate'
        );
        isDone();
      } else {
        showError(res.message || 'Failed to perform command');
      }
    } catch (err: any) {
      showError(err?.message || err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form
      schema={schema}
      initialValues={formData}
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 w-full h-full px-2'
    >
      <div className='grid gap-6'>
        <SelectField
          name='currency_id'
          label='Select Currency'
          options={currencies}
          required
        />
        <InputField
          name='rate'
          label='Exchange Rate'
          type='number'
          required
          helpText='Exchange rate based on your based currency'
        />
      </div>
      <div className='ml-auto flex gap-4'>
        <Button label='Submit' variant='primary' type='submit' busy={busy} />
        <Button label='Reset' variant='outline' type='reset' />
      </div>
    </Form>
  );
};

export default Editor;
