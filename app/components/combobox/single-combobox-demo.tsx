'use client';

import { useState } from 'react';
import { SingleCombobox } from '@/components/ui/single-combobox';

const departments = [
  { id: 1, code: 'IT', name: 'Công nghệ thông tin' },
  { id: 2, code: 'HR', name: 'Nhân sự' },
  { id: 3, code: 'FIN', name: 'Tài chính' },
  { id: 4, code: 'MKT', name: 'Marketing' },
  { id: 5, code: 'OPS', name: 'Vận hành' },
];

export function SingleComboboxBasicDemo() {
  const [value, setValue] = useState<string | number | undefined>();

  return (
    <div className="w-full max-w-sm p-4">
      <SingleCombobox
        label="Phòng ban"
        required
        options={departments}
        value={value}
        onChange={(v) => setValue(v)}
        placeholder="Chọn phòng ban..."
      />
    </div>
  );
}

export function SingleComboboxWithCodeDemo() {
  const [value, setValue] = useState<string | number | undefined>();

  return (
    <div className="w-full max-w-sm p-4">
      <SingleCombobox
        label="Phòng ban"
        options={departments}
        value={value}
        onChange={(v) => setValue(v)}
        placeholder="Chọn phòng ban..."
        showMenuCode
        showSelectedCode
      />
    </div>
  );
}
