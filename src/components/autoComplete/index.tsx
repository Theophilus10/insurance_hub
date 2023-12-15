import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface AutoCompleteProps {
  options: Option[];
  onChange: (value: string) => void;
  name: any;
  onBlur: () => void;
  ref: any;
  value: any;
}

const AutoComplete = (props: AutoCompleteProps) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [recentText, setRecentText] = useState('');
  const [filteredItems, setFilteredItems] = useState<Option[]>(props.options);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropDown(false);
    }
  };

  const onSearch = (searchValue: string) => {
    const searchParams = searchValue.toLowerCase();
    const filteredOptions = props.options.filter((option: Option) =>
      option.label.toLowerCase().includes(searchParams)
    );
    setFilteredItems(filteredOptions);
  };

  const onSelect = (option: Option) => {
    props.onChange(option.value);
    setFilterText(option.label);
    setRecentText(option.label);
    setShowDropDown(false);
  };

  const handleInputClick = () => {
    setShowDropDown(prev => !prev);
    setFilteredItems(props.options);
  };

  const handleInputBlur = () => {
    if (filterText.length > 0 || filterText !== recentText) {
      setFilterText(recentText);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    onSearch(e.target.value);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <div className='w-full relative' ref={dropdownRef}>
      <div className='border-[1px] rounded-md flex items-center p-2 '>
        <input
          placeholder='search'
          onClick={handleInputClick}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          value={filterText}
          className='border-0 w-full focus:outline-none'
        />
        <div className='text-gray-400 flex items-center  '>
          {filterText && (
            <X
              onClick={() => {
                setFilterText('');
                setRecentText('');
              }}
            />
          )}
          {showDropDown ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>

      {showDropDown && (
        <div className='w-full absolute mt-2'>
          <Card className='max-h-48 overflow-auto'>
            <ul className='p-1'>
              {filteredItems?.map((option: Option) => (
                <li
                  className='p-2 pl-5 hover:bg-slate-100 cursor-pointer rounded-md text-sm text-gray-500'
                  key={option.label}
                  onClick={() => onSelect(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
