'use client';

import React from 'react';
import { Card, CardTitle } from '../ui/card';
import { DatePickerWithRange } from '../dateRange/dateRangePicker';

interface DateHeaderProps {
  onDateChange?: () => void;
}
const DateHeader = ({ onDateChange }: DateHeaderProps) => {
  return (
    <Card className='w-full p-5'>
      <CardTitle className='font-light text-gray-600'>
        Pending Single Transit Policy Proposals
      </CardTitle>
      <div className='mt-8 space-y-2'>
        <label>Policy Date Range</label>
        <DatePickerWithRange onChange={date => date} />
      </div>
    </Card>
  );
};

export default DateHeader;
