'use client';

import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToggleSwitchProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  showIcons?: boolean;
}

export function ToggleSwitch({
  defaultChecked = false,
  onChange,
  className,
  showIcons = false,
}: ToggleSwitchProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn('flex items-center justify-end', className)}>
      {showIcons && (
        <span className="mr-2 text-yellow-500">
          <Sun size={20} />
        </span>
      )}

      <button
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F3E9E] ${
          checked ? 'bg-[#4F3E9E]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>

      {showIcons && (
        <span className="ml-2 text-gray-500">
          <Moon size={20} />
        </span>
      )}
    </div>
  );
}
