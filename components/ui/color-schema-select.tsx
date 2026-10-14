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
import { PopoverTitle } from './popover';
import {
  PopoverPanel,
  PopoverPanelContent,
  PopoverPanelTrigger,
} from './popover-panel';

const COLOR_SCHEMA_ITEM_STYLES =
  'mt-px w-full pr-8 pl-2 data-[checked=true]:bg-accent data-[checked=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground [&>svg:last-child]:absolute [&>svg:last-child]:right-2';

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
    <PopoverPanel open={open} onOpenChange={setOpen}>
      <PopoverPanelTrigger
        render={<Button variant="ghost" size="icon" aria-label={triggerLabel} title={triggerLabel} />}
      >
        <Palette aria-hidden="true" className="text-primary h-[1.2rem] w-[1.2rem]" />
      </PopoverPanelTrigger>
      <PopoverPanelContent
        size="sm"
        positionMethod="fixed"
        bodyClassName="p-0"
        scrollable={false}
        showFooter={false}
        showCloseButton={false}
      >
        <PopoverTitle className="sr-only">Chọn bộ màu giao diện</PopoverTitle>
        <Command className="h-auto p-0 py-2">
          <CommandInput aria-label="Tìm bộ màu" placeholder="Tìm bộ màu..." />
          <CommandList withScrollArea>
            <CommandEmpty>Không tìm thấy bộ màu</CommandEmpty>
            <CommandGroup heading="Bộ màu giao diện" className="p-0">
              <CommandItem
                className={COLOR_SCHEMA_ITEM_STYLES}
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
                  className={COLOR_SCHEMA_ITEM_STYLES}
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
      </PopoverPanelContent>
    </PopoverPanel>
  );
}
