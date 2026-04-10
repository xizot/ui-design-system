'use client';

import { useState } from 'react';
import { MultipleCombobox } from '@/components/ui/multiple-combobox';

const departments = [
  { id: 1, code: 'IT', name: 'Công nghệ thông tin' },
  { id: 2, code: 'HR', name: 'Nhân sự' },
  { id: 3, code: 'FIN', name: 'Tài chính' },
  { id: 4, code: 'MKT', name: 'Marketing' },
  { id: 5, code: 'OPS', name: 'Vận hành' },
];

export function MultipleComboboxBasicDemo() {
  const [values, setValues] = useState<(string | number)[]>([]);

  return (
    <div className="w-full max-w-sm p-4">
      <MultipleCombobox
        label="Phòng ban"
        required
        options={departments}
        value={values}
        onChange={(v) => setValues(v)}
        placeholder="Chọn phòng ban..."
      />
    </div>
  );
}

export function MultipleComboboxWithCodeDemo() {
  const [values, setValues] = useState<(string | number)[]>([]);

  return (
    <div className="w-full max-w-sm p-4">
      <MultipleCombobox
        label="Phòng ban"
        options={departments}
        value={values}
        onChange={(v) => setValues(v)}
        placeholder="Chọn phòng ban..."
        showMenuCode
        showSelectedCode
      />
    </div>
  );
}

export function MultipleComboboxLimitTagsDemo() {
  const [values, setValues] = useState<(string | number)[]>([]);

  return (
    <div className="w-full max-w-sm p-4">
      <MultipleCombobox
        label="Phòng ban"
        options={departments}
        value={values}
        onChange={(v) => setValues(v)}
        placeholder="Chọn phòng ban..."
        limitTags={2}
      />
    </div>
  );
}
