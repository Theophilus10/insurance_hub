import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderWithSortingProps {
  column: any;
  label: string;
  className?: string;
}

export const HeaderWithSorting = ({
  column,
  label,
  className,
}: HeaderWithSortingProps) => (
  <Button
    variant='ghost'
    className={className}
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    {label}
    <ArrowUpDown className='ml-2 h-4 w-4' />
  </Button>
);
