'use client';

import type React from 'react';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectDropdownProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function SelectDropdown({
  options,
  defaultValue,
  onChange,
  className,
  placeholder = 'Select an option',
}: SelectDropdownProps) {
  const [value, setValue] = useState(defaultValue || '');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={handleChange}
        className={cn(
          'appearance-none w-full h-10 py-2 pl-4 pr-10 bg-[#F3F0FF] text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F3E9E] cursor-pointer',
          className,
        )}
      >
        {!value && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 bg-[#E6E0FF] rounded-r-lg border-l border-[#D1C4FF]">
        <ChevronDown size={16} />
      </div>
    </div>
  );
}
