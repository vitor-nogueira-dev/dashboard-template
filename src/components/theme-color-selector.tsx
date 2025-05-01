'use client';

import { Palette } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ThemeColor, useThemeColor } from '@/contexts/theme-color-context';

import { cn } from '@/lib/utils';

interface ThemeColors {
  name: string
  value: ThemeColor
}

const themeColors: ThemeColors[] = [
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Violet', value: 'violet' },
  { name: 'Rose', value: 'rose' },
  { name: 'Orange', value: 'orange' },
  { name: 'Red', value: 'red' },
  { name: 'Cyan', value: 'cyan' },
  { name: 'Purple', value: 'purple' },
  { name: 'Amber', value: 'amber' },
  { name: 'Teal', value: 'teal' },
  { name: 'Emerald', value: 'emerald' },
  { name: 'Sky', value: 'sky' },
  { name: 'Pink', value: 'pink' },
  { name: 'Indigo', value: 'indigo' },
];

export function ThemeColorSelector() {
  const { themeColor, setThemeColor } = useThemeColor();

  const handleGetThemeColor = (color: ThemeColor) => {
    switch (color) {
    case 'blue':
      return 'bg-blue-500';
    case 'green':
      return 'bg-green-500';
    case 'violet':
      return 'bg-violet-500';
    case 'rose':
      return 'bg-rose-500';
    case 'orange':
      return 'bg-orange-500';
    case 'red':
      return 'bg-red-500';
    case 'cyan':
      return 'bg-cyan-500';
    case 'purple':
      return 'bg-purple-500';
    case 'amber':
      return 'bg-amber-500';
    case 'teal':
      return 'bg-teal-500';
    case 'emerald':
      return 'bg-emerald-500';
    case 'sky':
      return 'bg-sky-500';
    case 'pink':
      return 'bg-pink-500';
    case 'indigo':
      return 'bg-indigo-500';
    default:
      return 'bg-gray-500';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select theme color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themeColors.map((color) => (
          <DropdownMenuItem
            key={color.value}
            onClick={() => setThemeColor(color.value)}
            className="flex items-center gap-2"
          >
            <div
              className={cn(
                'size-4 rounded-full',
                handleGetThemeColor(color.value),
              )}
            />
            <span>{color.name}</span>
            {themeColor === color.value && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
