'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { DataColumnHeader, DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '@/constants/common';
import { cn } from '@/lib/utils';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';

const guide = {
  name: 'Table',
  group: 'ui',
  importPath: '@/design-system/components/ui/table',
} as const;

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  date?: string;
  method?: string;
  category?: string;
  description?: string;
};

const payments: Payment[] = [
  { id: 'PAY001', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
  { id: 'PAY002', amount: 242, status: 'success', email: 'abe45@gmail.com' },
  { id: 'PAY003', amount: 837, status: 'processing', email: 'monserrat44@gmail.com' },
  { id: 'PAY004', amount: 874, status: 'success', email: 'silas22@gmail.com' },
  { id: 'PAY005', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
  { id: 'PAY006', amount: 150, status: 'pending', email: 'derek12@outlook.com' },
  { id: 'PAY007', amount: 490, status: 'processing', email: 'luna.star@gmail.com' },
  { id: 'PAY008', amount: 635, status: 'success', email: 'frank88@yahoo.com' },
  { id: 'PAY009', amount: 218, status: 'failed', email: 'grace.k@hotmail.com' },
  { id: 'PAY010', amount: 970, status: 'pending', email: 'henry.b@gmail.com' },
  { id: 'PAY011', amount: 540, status: 'success', email: 'iris.t@gmail.com' },
  { id: 'PAY012', amount: 380, status: 'failed', email: 'jack.m@yahoo.com' },
  { id: 'PAY013', amount: 122, status: 'pending', email: 'kate.w@outlook.com' },
  { id: 'PAY014', amount: 760, status: 'processing', email: 'leo.n@gmail.com' },
  { id: 'PAY015', amount: 430, status: 'success', email: 'mia.c@hotmail.com' },
  { id: 'PAY016', amount: 295, status: 'failed', email: 'noah.b@gmail.com' },
  { id: 'PAY017', amount: 810, status: 'success', email: 'olivia.r@yahoo.com' },
  { id: 'PAY018', amount: 165, status: 'pending', email: 'paul.s@gmail.com' },
  { id: 'PAY019', amount: 920, status: 'processing', email: 'quinn.f@outlook.com' },
  { id: 'PAY020', amount: 670, status: 'success', email: 'rose.m@gmail.com' },
  { id: 'PAY021', amount: 345, status: 'failed', email: 'sam.k@yahoo.com' },
  { id: 'PAY022', amount: 580, status: 'success', email: 'tina.g@gmail.com' },
  { id: 'PAY023', amount: 210, status: 'pending', email: 'uma.h@hotmail.com' },
  { id: 'PAY024', amount: 755, status: 'processing', email: 'victor.p@gmail.com' },
  { id: 'PAY025', amount: 440, status: 'success', email: 'wendy.l@yahoo.com' },
  { id: 'PAY026', amount: 195, status: 'failed', email: 'xander.b@gmail.com' },
  { id: 'PAY027', amount: 820, status: 'success', email: 'yara.m@outlook.com' },
  { id: 'PAY028', amount: 365, status: 'pending', email: 'zoe.n@gmail.com' },
  { id: 'PAY029', amount: 615, status: 'processing', email: 'alan.c@yahoo.com' },
  { id: 'PAY030', amount: 280, status: 'success', email: 'bella.d@gmail.com' },
  { id: 'PAY031', amount: 730, status: 'failed', email: 'carl.e@hotmail.com' },
  { id: 'PAY032', amount: 155, status: 'pending', email: 'diana.f@gmail.com' },
  { id: 'PAY033', amount: 890, status: 'success', email: 'evan.g@yahoo.com' },
  { id: 'PAY034', amount: 425, status: 'processing', email: 'fiona.h@gmail.com' },
  { id: 'PAY035', amount: 560, status: 'success', email: 'george.i@outlook.com' },
  { id: 'PAY036', amount: 310, status: 'failed', email: 'helen.j@gmail.com' },
  { id: 'PAY037', amount: 945, status: 'pending', email: 'ivan.k@yahoo.com' },
  { id: 'PAY038', amount: 475, status: 'success', email: 'julia.l@gmail.com' },
  { id: 'PAY039', amount: 230, status: 'processing', email: 'kevin.m@hotmail.com' },
  { id: 'PAY040', amount: 685, status: 'success', email: 'laura.n@gmail.com' },
  { id: 'PAY041', amount: 395, status: 'failed', email: 'mike.o@yahoo.com' },
  { id: 'PAY042', amount: 845, status: 'pending', email: 'nina.p@gmail.com' },
  { id: 'PAY043', amount: 175, status: 'success', email: 'oscar.q@outlook.com' },
  { id: 'PAY044', amount: 620, status: 'processing', email: 'petra.r@gmail.com' },
  { id: 'PAY045', amount: 505, status: 'success', email: 'quinn.s@yahoo.com' },
  { id: 'PAY046', amount: 260, status: 'failed', email: 'ryan.t@gmail.com' },
  { id: 'PAY047', amount: 775, status: 'pending', email: 'sara.u@hotmail.com' },
  { id: 'PAY048', amount: 335, status: 'success', email: 'tom.v@gmail.com' },
  { id: 'PAY049', amount: 960, status: 'processing', email: 'ursula.w@yahoo.com' },
  { id: 'PAY050', amount: 415, status: 'success', email: 'vince.x@gmail.com' },
  { id: 'PAY051', amount: 590, status: 'failed', email: 'willa.y@outlook.com' },
  { id: 'PAY052', amount: 245, status: 'pending', email: 'xena.z@gmail.com' },
  { id: 'PAY053', amount: 710, status: 'success', email: 'yogi.a@yahoo.com' },
  { id: 'PAY054', amount: 380, status: 'processing', email: 'zack.b@gmail.com' },
  { id: 'PAY055', amount: 525, status: 'success', email: 'amy.c@hotmail.com' },
  { id: 'PAY056', amount: 170, status: 'failed', email: 'bob.d@gmail.com' },
  { id: 'PAY057', amount: 865, status: 'pending', email: 'cara.e@yahoo.com' },
  { id: 'PAY058', amount: 455, status: 'success', email: 'dan.f@gmail.com' },
  { id: 'PAY059', amount: 640, status: 'processing', email: 'eva.g@outlook.com' },
  { id: 'PAY060', amount: 295, status: 'success', email: 'fred.h@gmail.com' },
  { id: 'PAY061', amount: 780, status: 'failed', email: 'gina.i@yahoo.com' },
  { id: 'PAY062', amount: 350, status: 'pending', email: 'hank.j@gmail.com' },
  { id: 'PAY063', amount: 915, status: 'success', email: 'iris.k@hotmail.com' },
  { id: 'PAY064', amount: 485, status: 'processing', email: 'jake.l@gmail.com' },
  { id: 'PAY065', amount: 570, status: 'success', email: 'kim.m@yahoo.com' },
  { id: 'PAY066', amount: 225, status: 'failed', email: 'liam.n@gmail.com' },
  { id: 'PAY067', amount: 800, status: 'pending', email: 'mona.o@outlook.com' },
  { id: 'PAY068', amount: 465, status: 'success', email: 'ned.p@gmail.com' },
  { id: 'PAY069', amount: 330, status: 'processing', email: 'ora.q@yahoo.com' },
  { id: 'PAY070', amount: 695, status: 'success', email: 'pete.r@gmail.com' },
  { id: 'PAY071', amount: 410, status: 'failed', email: 'quinn.s@hotmail.com' },
  { id: 'PAY072', amount: 855, status: 'pending', email: 'rosa.t@gmail.com' },
  { id: 'PAY073', amount: 185, status: 'success', email: 'sean.u@yahoo.com' },
  { id: 'PAY074', amount: 630, status: 'processing', email: 'tara.v@gmail.com' },
  { id: 'PAY075', amount: 515, status: 'success', email: 'ulric.w@outlook.com' },
  { id: 'PAY076', amount: 270, status: 'failed', email: 'vera.x@gmail.com' },
  { id: 'PAY077', amount: 745, status: 'pending', email: 'will.y@yahoo.com' },
  { id: 'PAY078', amount: 320, status: 'success', email: 'xia.z@gmail.com' },
  { id: 'PAY079', amount: 985, status: 'processing', email: 'york.a@hotmail.com' },
  { id: 'PAY080', amount: 435, status: 'success', email: 'zena.b@gmail.com' },
  { id: 'PAY081', amount: 600, status: 'failed', email: 'adam.c@yahoo.com' },
  { id: 'PAY082', amount: 255, status: 'pending', email: 'beth.d@gmail.com' },
  { id: 'PAY083', amount: 720, status: 'success', email: 'cole.e@outlook.com' },
  { id: 'PAY084', amount: 390, status: 'processing', email: 'dawn.f@gmail.com' },
  { id: 'PAY085', amount: 535, status: 'success', email: 'earl.g@yahoo.com' },
  { id: 'PAY086', amount: 180, status: 'failed', email: 'faye.h@gmail.com' },
  { id: 'PAY087', amount: 875, status: 'pending', email: 'glen.i@hotmail.com' },
  { id: 'PAY088', amount: 445, status: 'success', email: 'hope.j@gmail.com' },
  { id: 'PAY089', amount: 660, status: 'processing', email: 'igor.k@yahoo.com' },
  { id: 'PAY090', amount: 305, status: 'success', email: 'jade.l@gmail.com' },
  { id: 'PAY091', amount: 790, status: 'failed', email: 'kent.m@outlook.com' },
  { id: 'PAY092', amount: 360, status: 'pending', email: 'luna.n@gmail.com' },
  { id: 'PAY093', amount: 925, status: 'success', email: 'marc.o@yahoo.com' },
  { id: 'PAY094', amount: 495, status: 'processing', email: 'nell.p@gmail.com' },
  { id: 'PAY095', amount: 580, status: 'success', email: 'omar.q@hotmail.com' },
  { id: 'PAY096', amount: 235, status: 'failed', email: 'pam.r@gmail.com' },
  { id: 'PAY097', amount: 815, status: 'pending', email: 'rex.s@yahoo.com' },
  { id: 'PAY098', amount: 475, status: 'success', email: 'sue.t@gmail.com' },
  { id: 'PAY099', amount: 340, status: 'processing', email: 'ted.u@outlook.com' },
  { id: 'PAY100', amount: 705, status: 'success', email: 'una.v@gmail.com' },
];

const statusFilterOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Success', value: 'success' },
  { label: 'Failed', value: 'failed' },
];

const basicColumns: ColumnDef<Payment>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'status',
    meta: { className: 'min-w-[120px]' },
    header: ({ column }) => (
      <DataColumnHeader column={column} label="Status" filterOptions={statusFilterOptions} />
    ),
    filterFn: (row, columnId, filterValues: string[]) =>
      filterValues.includes(row.getValue(columnId)),
  },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataColumnHeader column={column} label="Amount" align="right" />,
    cell: ({ row }) => (
      <div className="text-right font-medium">${(row.getValue('amount') as number).toFixed(2)}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date();
      date.setDate(date.getDate() - (row.index % 30));
      return date.toLocaleDateString('vi-VN');
    },
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => {
      const methods = ['Credit Card', 'Bank Transfer', 'PayPal', 'Cash', 'Crypto'];
      return methods[row.index % methods.length];
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'];
      return categories[row.index % categories.length];
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const descriptions = [
        'Payment for services',
        'Online purchase',
        'Subscription renewal',
        'Utility bill payment',
        'Restaurant expense',
      ];
      return descriptions[row.index % descriptions.length];
    },
  },
];

const actionColumns: ColumnDef<Payment>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'status',
    meta: { className: 'min-w-[120px]' },
    header: ({ column }) => (
      <DataColumnHeader column={column} label="Status" filterOptions={statusFilterOptions} />
    ),
    filterFn: (row, columnId, filterValues: string[]) =>
      filterValues.includes(row.getValue(columnId)),
  },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataColumnHeader column={column} label="Amount" align="right" />,
    cell: ({ row }) => (
      <div className="text-right font-medium">${(row.getValue('amount') as number).toFixed(2)}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date();
      date.setDate(date.getDate() - (row.index % 30));
      return date.toLocaleDateString('vi-VN');
    },
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => {
      const methods = ['Credit Card', 'Bank Transfer', 'PayPal', 'Cash', 'Crypto'];
      return methods[row.index % methods.length];
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'];
      return categories[row.index % categories.length];
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const descriptions = [
        'Payment for services',
        'Online purchase',
        'Subscription renewal',
        'Utility bill payment',
        'Restaurant expense',
      ];
      return descriptions[row.index % descriptions.length];
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: { className: 'text-center' },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button variant={'ghost'} size={'icon-md'}>
          <Trash2 className="text-red-500" />
        </Button>
      </div>
    ),
  },
];

function BasicTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE_OPTIONS[0],
  });

  return (
    <div className="h-full w-full">
      <DataTable
        data={payments}
        columns={basicColumns}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </div>
  );
}

function SelectionTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE_OPTIONS[0],
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-4 h-full w-full h-100">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedCount > 0 ? (
            <span>
              Selected {selectedCount} item{selectedCount > 1 ? 's' : ''}
            </span>
          ) : (
            <span>No items selected</span>
          )}
        </div>
        {selectedCount > 0 && (
          <button
            onClick={() => setRowSelection({})}
            className="text-sm text-destructive hover:text-destructive/80"
          >
            Clear selection
          </button>
        )}
      </div>
      <DataTable
        data={payments}
        columns={basicColumns}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        pagination={pagination}
        onPaginationChange={setPagination}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
    </div>
  );
}

function ActionTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE_OPTIONS[0],
  });

  return (
    <div className="h-full w-full">
      <DataTable
        data={payments}
        columns={actionColumns}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </div>
  );
}

const props = [
  { name: 'className', type: 'string', defaultValue: '--' },
  { name: 'rowSelection', type: 'RowSelectionState', defaultValue: '{}' },
  { name: 'onRowSelectionChange', type: 'OnChangeFn<RowSelectionState>', defaultValue: '--' },
];

export default function TableGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A responsive table component for displaying tabular data.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import the table components from the design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Table component props.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-border/70">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Prop</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={cn(index !== props.length - 1 && 'border-b border-border/70')}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{prop.type}</td>
                        <td className="px-4 py-3 text-muted-foreground">{prop.defaultValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card id="tanstack" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>3. TanStack Table</CardTitle>
              <CardDescription>
                Headless table logic dengan <code>@tanstack/react-table</code> &mdash; sorting,
                filtering, pagination, selection, and actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="selection">With Selection</TabsTrigger>
                    <TabsTrigger value="actions">With Actions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic">
                    <div className="rounded-[20px] border border-dashed border-border bg-muted/30 p-8">
                      <div className="flex h-100 items-center justify-center rounded-[18px] bg-card p-6 shadow-sm">
                        <BasicTableDemo />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="selection">
                    <div className="rounded-[20px] border border-dashed border-border bg-muted/30 p-8">
                      <div className="flex items-center justify-center rounded-[18px] bg-card p-6 shadow-sm">
                        <SelectionTableDemo />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="actions">
                    <div className="rounded-[20px] border border-dashed border-border bg-muted/30 p-8">
                      <div className="flex h-100 items-center justify-center rounded-[18px] bg-card p-6 shadow-sm">
                        <ActionTableDemo />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <CodeBlock
                  id="tanstack-sorting"
                  code={`import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { DataTable } from "@/design-system/components/ui/data-table";

function SortableHeader({ label, sorted, onToggle }) {
  const isActive = sorted !== false;
  return (
    <button
      className={cn("flex items-center gap-1", isActive && "text-primary")}
      onClick={onToggle}
    >
      {label}
      {sorted === "asc" ? (
        <ArrowUp className="size-3" />
      ) : sorted === "desc" ? (
        <ArrowDown className="size-3" />
      ) : (
        <ArrowUpDown className="size-3 opacity-50" />
      )}
    </button>
  );
}

const columns: ColumnDef<Payment>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader
        label="Status"
        sorted={column.getIsSorted()}
        onToggle={() => {
          const s = column.getIsSorted();
          if (s === "desc") column.clearSorting();
          else column.toggleSorting(s === "asc");
        }}
      />
    ),
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <SortableHeader
        label="Amount"
        sorted={column.getIsSorted()}
        onToggle={() => {
          const s = column.getIsSorted();
          if (s === "desc") column.clearSorting();
          else column.toggleSorting(s === "asc");
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium">
        \${(row.getValue("amount") as number).toFixed(2)}
      </div>
    ),
  },
];

export function SortableTable({ data }: { data: Payment[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  return (
    <DataTable
      data={data}
      columns={columns}
      sorting={sorting}
      onSortingChange={setSorting}
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
    />
  );
}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <aside className="hidden xl:block">
        <div className="sticky top-24 rounded-[24px] border border-border/70 bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            TOC
          </p>
          <nav className="mt-4 space-y-3 text-sm text-muted-foreground">
            <a href="#import" className="block transition hover:text-foreground">
              Import
            </a>
            <a href="#props" className="block transition hover:text-foreground">
              Props
            </a>
            <a href="#usages" className="block transition hover:text-foreground">
              Usages
            </a>
            <a href="#tanstack" className="block transition hover:text-foreground">
              TanStack Table
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
