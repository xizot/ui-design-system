'use client';

import { Palette } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { useColorSchema } from '../../hooks/use-color-schema';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from './popover';

export function ColorSchemaSelect() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const { schemaId, schema, schemas, setColorSchema } = useColorSchema();
  const isDark = resolvedTheme === 'dark';
  const selectedName = schema ? (isDark ? schema.name : schema.lightName) : 'Mặc định';
  const triggerLabel = `Bộ màu giao diện: ${selectedName}`;

  const handleSelect = (nextSchemaId: string) => {
    setColorSchema(nextSchemaId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="ghost" size="icon" aria-label={triggerLabel} title={triggerLabel} />}
      >
        <Palette aria-hidden="true" className="text-primary h-[1.2rem] w-[1.2rem]" />
      </PopoverTrigger>
      <PopoverContent align="center" className="w-72 gap-0 p-0">
        <PopoverTitle className="sr-only">Chọn bộ màu giao diện</PopoverTitle>
        <Command className="h-auto">
          <CommandInput aria-label="Tìm bộ màu" placeholder="Tìm bộ màu..." />
          <CommandList>
            <CommandEmpty>Không tìm thấy bộ màu</CommandEmpty>
            <CommandGroup heading="Bộ màu giao diện">
              <CommandItem
                value="default Mặc định"
                data-checked={schemaId === 'default'}
                onSelect={() => handleSelect('default')}
              >
                <span
                  aria-hidden="true"
                  className="border-border bg-background flex size-4 shrink-0 items-center justify-center rounded-full border"
                >
                  <span className="bg-foreground size-2 rounded-full" />
                </span>
                <span className="min-w-0 flex-1 truncate">Mặc định</span>
              </CommandItem>
              {schemas.map((entry) => (
                <CommandItem
                  key={entry.id}
                  value={`${entry.code} ${entry.lightName} ${entry.name}`}
                  data-checked={schemaId === entry.id}
                  onSelect={() => handleSelect(entry.id)}
                >
                  <span
                    aria-hidden="true"
                    className="border-border size-4 shrink-0 rounded-full border"
                    style={{
                      backgroundColor: isDark ? entry.dark['--primary'] : entry.light['--primary'],
                    }}
                  />
                  <span className="min-w-0 flex-1 truncate">
                    {isDark ? entry.name : entry.lightName}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
