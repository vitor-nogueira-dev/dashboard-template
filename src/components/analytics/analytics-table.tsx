'use client';

import { useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, Download, Eye, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Define the data type
type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  sales: number
  revenue: number
  conversion: number
  lastUpdated: string
}

// Sample data
const data: Product[] = [
  {
    id: 'PROD-1001',
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 45,
    status: 'In Stock',
    sales: 287,
    revenue: 57398.13,
    conversion: 4.2,
    lastUpdated: '2025-04-28',
  },
  {
    id: 'PROD-1002',
    name: 'Ultra HD Smart TV 55"',
    category: 'Electronics',
    price: 699.99,
    stock: 12,
    status: 'Low Stock',
    sales: 98,
    revenue: 68599.02,
    conversion: 2.8,
    lastUpdated: '2025-04-27',
  },
  {
    id: 'PROD-1003',
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 249.99,
    stock: 32,
    status: 'In Stock',
    sales: 156,
    revenue: 38998.44,
    conversion: 3.5,
    lastUpdated: '2025-04-26',
  },
  {
    id: 'PROD-1004',
    name: 'Professional DSLR Camera',
    category: 'Photography',
    price: 1299.99,
    stock: 8,
    status: 'Low Stock',
    sales: 42,
    revenue: 54599.58,
    conversion: 1.9,
    lastUpdated: '2025-04-25',
  },
  {
    id: 'PROD-1005',
    name: 'Stainless Steel Cookware Set',
    category: 'Kitchen',
    price: 179.99,
    stock: 0,
    status: 'Out of Stock',
    sales: 215,
    revenue: 38697.85,
    conversion: 4.8,
    lastUpdated: '2025-04-24',
  },
  {
    id: 'PROD-1006',
    name: 'Bluetooth Portable Speaker',
    category: 'Electronics',
    price: 89.99,
    stock: 67,
    status: 'In Stock',
    sales: 342,
    revenue: 30776.58,
    conversion: 5.2,
    lastUpdated: '2025-04-23',
  },
  {
    id: 'PROD-1007',
    name: 'Organic Cotton Bedding Set',
    category: 'Home',
    price: 129.99,
    stock: 23,
    status: 'In Stock',
    sales: 187,
    revenue: 24308.13,
    conversion: 3.7,
    lastUpdated: '2025-04-22',
  },
  {
    id: 'PROD-1008',
    name: 'Smart Fitness Tracker',
    category: 'Wearables',
    price: 149.99,
    stock: 5,
    status: 'Low Stock',
    sales: 276,
    revenue: 41397.24,
    conversion: 4.9,
    lastUpdated: '2025-04-21',
  },
  {
    id: 'PROD-1009',
    name: 'Leather Messenger Bag',
    category: 'Accessories',
    price: 159.99,
    stock: 18,
    status: 'In Stock',
    sales: 124,
    revenue: 19838.76,
    conversion: 2.6,
    lastUpdated: '2025-04-20',
  },
  {
    id: 'PROD-1010',
    name: 'Wireless Gaming Mouse',
    category: 'Gaming',
    price: 79.99,
    stock: 0,
    status: 'Out of Stock',
    sales: 312,
    revenue: 24956.88,
    conversion: 5.7,
    lastUpdated: '2025-04-19',
  },
  {
    id: 'PROD-1011',
    name: 'Noise Cancelling Earbuds',
    category: 'Electronics',
    price: 149.99,
    stock: 41,
    status: 'In Stock',
    sales: 198,
    revenue: 29698.02,
    conversion: 3.9,
    lastUpdated: '2025-04-18',
  },
  {
    id: 'PROD-1012',
    name: 'Adjustable Standing Desk',
    category: 'Furniture',
    price: 349.99,
    stock: 7,
    status: 'Low Stock',
    sales: 86,
    revenue: 30099.14,
    conversion: 2.3,
    lastUpdated: '2025-04-17',
  },
  {
    id: 'PROD-1013',
    name: 'Professional Blender',
    category: 'Kitchen',
    price: 219.99,
    stock: 29,
    status: 'In Stock',
    sales: 143,
    revenue: 31458.57,
    conversion: 3.2,
    lastUpdated: '2025-04-16',
  },
  {
    id: 'PROD-1014',
    name: 'Waterproof Action Camera',
    category: 'Photography',
    price: 299.99,
    stock: 0,
    status: 'Out of Stock',
    sales: 97,
    revenue: 29099.03,
    conversion: 2.1,
    lastUpdated: '2025-04-15',
  },
  {
    id: 'PROD-1015',
    name: 'Smart Home Security System',
    category: 'Home',
    price: 399.99,
    stock: 14,
    status: 'In Stock',
    sales: 78,
    revenue: 31199.22,
    conversion: 1.8,
    lastUpdated: '2025-04-14',
  },
];

// Define the columns
export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Product
          <ArrowUpDown className="ml-2 h-4 w-4 text-primary" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div>{row.getValue('category')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4 text-primary" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant="outline"
          className={
            status === 'In Stock' ?
              'bg-green-500/10 text-green-600 border-green-200' :
              status === 'Low Stock' ?
                'bg-yellow-500/10 text-yellow-600 border-yellow-200' :
                'bg-red-500/10 text-red-600 border-red-200'
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'sales',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Sales
          <ArrowUpDown className="ml-2 h-4 w-4 text-primary" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium text-right">{row.getValue('sales')}</div>;
    },
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Revenue
          <ArrowUpDown className="ml-2 h-4 w-4 text-primary" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const revenue = Number.parseFloat(row.getValue('revenue'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(revenue);
      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: 'conversion',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Conversion
          <ArrowUpDown className="ml-2 h-4 w-4 text-primary" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const conversion = Number.parseFloat(row.getValue('conversion'));
      return <div className="font-medium text-right">{conversion.toFixed(1)}%</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => toast.info(`Viewing ${product.name}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success(`Report for ${product.name} downloaded`)}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.info(`Editing ${product.name}`)}>Edit Product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function AnalyticsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Analytics</CardTitle>
        <CardDescription>Detailed performance metrics for all products in your inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Filter products..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto cursor-pointer">
                  Columns <ChevronDown className="ml-2 h-4 w-4 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize cursor-pointer"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
