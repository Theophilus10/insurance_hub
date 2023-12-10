'use client';

import { Card, CardTitle } from '@app/components/ui/card';
import { DatePickerWithRange } from '@app/components/dateRange/dateRangePicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select';

interface DateWithCompanySelectorsProps {
  onDateChange?: () => void;
  onBranchChange?: () => void;
  onInsuranceCompanyChange?: () => void;
  title: string;
}

const DateWithCompanySelectors = ({
  onInsuranceCompanyChange,
  onBranchChange,
  onDateChange,
  title,
}: DateWithCompanySelectorsProps) => {
  return (
    <Card className='w-full p-5'>
      <CardTitle className='font-light text-gray-600'>{title}</CardTitle>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <div>
          <label>Insurance Company</label>
          <Select>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select Insurance Company' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>
                Active International Insurance Company Limited
              </SelectItem>
              <SelectItem value='dark'>
                Ecfatum International Insurance Company Limited
              </SelectItem>
              <SelectItem value='system'>
                GLICO International Insurance Company Limited
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>Branch Office</label>
          <Select>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select branch' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Madina</SelectItem>
              <SelectItem value='dark'>Head Office</SelectItem>
              <SelectItem value='system'>Dansoma</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='mt-8 space-y-2'>
        <label>Policy Date Range</label>
        <DatePickerWithRange onChange={date => date} />
      </div>
    </Card>
  );
};

export default DateWithCompanySelectors;
