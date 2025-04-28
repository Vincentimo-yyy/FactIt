import type React from 'react';
import { cn } from '@/lib/utils';

interface SettingsItemProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsItem({
  label,
  children,
  className,
}: SettingsItemProps) {
  return (
    <div className={cn('mb-6 p-2', className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-1">
        <label className="text-gray-700 font-medium">{label}</label>
        <div className="w-full md:max-w-[280px]">{children}</div>
      </div>
      <div className="h-px bg-gray-200 w-full mt-4"></div>
    </div>
  );
}
