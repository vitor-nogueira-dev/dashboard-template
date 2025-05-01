'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, Plus, Star, StarHalf, Search, Filter, ArrowUpDown, Download, Printer, RefreshCw, ChevronDown, Eye, Pencil, Trash2, Copy, Check, PieChart, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Share2, FileText, BarChart, Globe } from 'lucide-react';
import { toast } from 'sonner';

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { BarChartExample } from '@/components/ui/bar-chart';
import { LineChartExample } from '@/components/ui/line-chart';
import { PieChartExample } from '@/components/ui/pie-chart';

export default function DataDisplay() {
  const [copied, setCopied] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<string>('name');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [progressValues] = useState({
    revenue: 75,
    subscriptions: 60,
    sales: 45,
    users: 80,
  });
  const [activeTab, setActiveTab] = useState('tables');
  const [selectedView, setSelectedView] = useState('grid');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast.success('Code copied to clipboard!');
  };

  const handleSelectAllProducts = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    }
  };

  const filteredProducts = products
    .filter(product =>
      (searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (selectedStatus === 'all' ||
        (selectedStatus === 'inStock' && product.stock > 20) ||
        (selectedStatus === 'lowStock' && product.stock > 0 && product.stock <= 20) ||
        (selectedStatus === 'outOfStock' && product.stock === 0)
      ),
    )
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ?
          a.name.localeCompare(b.name) :
          b.name.localeCompare(a.name);
      } else if (sortField === 'price') {
        return sortOrder === 'asc' ?
          a.price - b.price :
          b.price - a.price;
      } else if (sortField === 'stock') {
        return sortOrder === 'asc' ?
          a.stock - b.stock :
          b.stock - a.stock;
      }
      return 0;
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedProducts.length === 0) {
      toast.error('No products selected');
      return;
    }

    if (action === 'delete') {
      toast.success(`Deleted ${selectedProducts.length} products`);
    } else if (action === 'export') {
      toast.success(`Exported ${selectedProducts.length} products`);
    } else if (action === 'print') {
      toast.success(`Printing ${selectedProducts.length} products`);
    }

    setSelectedProducts([]);
  };

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Data Display</h1>
          <div className="flex items-center gap-2">
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid View</SelectItem>
                <SelectItem value="list">List View</SelectItem>
                <SelectItem value="compact">Compact View</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => toast.success('Data refreshed')}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Components for displaying and visualizing data in your dashboard. These components help you present information in a clear and organized manner.
        </p>
      </div>

      <Tabs defaultValue="tables" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>A list of products currently in stock.</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleBulkAction('export')}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('print')}>
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleBulkAction('delete')}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 md:flex-row">
                <div className="flex flex-1 items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-4" align="end">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Category</h4>
                          <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Status</h4>
                          <Select
                            value={selectedStatus}
                            onValueChange={setSelectedStatus}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="inStock">In Stock</SelectItem>
                              <SelectItem value="lowStock">Low Stock</SelectItem>
                              <SelectItem value="outOfStock">Out of Stock</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedCategory('all');
                            setSelectedStatus('all');
                            setSearchTerm('');
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" size="icon" onClick={() => {
                    setSortField('name');
                    setSortOrder('asc');
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                    toast.success('Table refreshed');
                  }}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedProducts.length === products.length && products.length > 0}
                          onCheckedChange={handleSelectAllProducts}
                          aria-label="Select all products"
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead className="max-w-[150px]">
                        <div
                          className="flex cursor-pointer items-center"
                          onClick={() => handleSort('name')}
                        >
                          Name
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead>
                        <div
                          className="flex cursor-pointer items-center"
                          onClick={() => handleSort('stock')}
                        >
                          Inventory
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div
                          className="flex cursor-pointer items-center justify-end"
                          onClick={() => handleSort('price')}
                        >
                          Price
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) => handleSelectProduct(product.id, !!checked)}
                              aria-label={`Select ${product.name}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Image
                              src={`/${product.img || 'placeholder.svg'}`}
                              width="64"
                              height="64"
                              alt={`${product.name} image`}
                              className="aspect-square rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant="outline"
                              className={
                                product.stock > 20 ?
                                  'bg-green-500/10 text-green-600 border-green-200' :
                                  product.stock > 0 ?
                                    'bg-yellow-500/10 text-yellow-600 border-yellow-200' :
                                    'bg-red-500/10 text-red-600 border-red-200'
                              }
                            >
                              {product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.stock} units</TableCell>
                          <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit product
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete product
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                Showing page 1 of 1
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={order.customerAvatar || '/placeholder.svg'} alt={order.customer} />
                              <AvatarFallback>{order.customer[0]}</AvatarFallback>
                            </Avatar>
                            <span>{order.customer}</span>
                          </div>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              order.status === 'Completed' ?
                                'bg-green-500/10 text-green-600 border-green-200' :
                                order.status === 'Processing' ?
                                  'bg-blue-500/10 text-blue-600 border-blue-200' :
                                  order.status === 'Shipped' ?
                                    'bg-purple-500/10 text-purple-600 border-purple-200' :
                                    'bg-yellow-500/10 text-yellow-600 border-yellow-200'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Column 1</TableHead>\n      <TableHead>Column 2</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>Cell 1</TableCell>\n      <TableCell>Cell 2</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>', 'table-code')}>
                {copied === 'table-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{copied === 'table-code' ? 'Copied!' : 'Copy Code'}</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Card Layouts</CardTitle>
              <CardDescription>Different card layouts for displaying data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <div className="flex items-center pt-1 text-xs text-green-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+20.1% from last month</span>
                    </div>
                    <Progress className="mt-2" value={progressValues.revenue} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <div className="flex items-center pt-1 text-xs text-green-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+180.1% from last month</span>
                    </div>
                    <Progress className="mt-2" value={progressValues.subscriptions} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <div className="flex items-center pt-1 text-xs text-red-500">
                      <TrendingDown className="mr-1 h-3 w-3" />
                      <span>-19.5% from last month</span>
                    </div>
                    <Progress className="mt-2" value={progressValues.sales} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <div className="flex items-center pt-1 text-xs text-green-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+201 since last hour</span>
                    </div>
                    <Progress className="mt-2" value={progressValues.users} />
                  </CardContent>
                </Card>
              </div>

            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Card>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n    <CardDescription>Description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Content</p>\n  </CardContent>\n  <CardFooter>\n    <Button>Action</Button>\n  </CardFooter>\n</Card>', 'card-code')}>
                {copied === 'card-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{copied === 'card-code' ? 'Copied!' : 'Copy Code'}</span>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Your team members and their roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={member.avatar || '/placeholder.svg'} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>{member.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add New Member
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Launch Schedule</CardTitle>
              <CardDescription>Upcoming product launches and release dates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="md:w-1/2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="mb-4 text-lg font-medium">Upcoming Events</h3>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <Badge>{event.type}</Badge>
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <h4 className="mt-2 font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-muted-foreground">Product Launch</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">Marketing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-muted-foreground">Promotion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-xs text-muted-foreground">Update</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Schedule</CardTitle>
              <CardDescription>Calendar view with monthly events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">April 2025</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                  <div className="text-sm font-medium text-muted-foreground">Sun</div>
                  <div className="text-sm font-medium text-muted-foreground">Mon</div>
                  <div className="text-sm font-medium text-muted-foreground">Tue</div>
                  <div className="text-sm font-medium text-muted-foreground">Wed</div>
                  <div className="text-sm font-medium text-muted-foreground">Thu</div>
                  <div className="text-sm font-medium text-muted-foreground">Fri</div>
                  <div className="text-sm font-medium text-muted-foreground">Sat</div>

                  {/* Empty cells for days before the 1st */}
                  <div className="h-12 rounded-md border border-dashed"></div>
                  <div className="h-12 rounded-md border border-dashed"></div>

                  {/* Calendar days */}
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i + 1}
                      className={`h-12 rounded-md border p-1 ${i + 1 === 15 ? 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800' : ''
                      } ${i + 1 === 20 ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : ''
                      } ${i + 1 === 10 ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800' : ''
                      }`}
                    >
                      <div className="flex h-full flex-col justify-between">
                        <span className="text-xs">{i + 1}</span>
                        {i + 1 === 15 && (
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 self-end"></div>
                        )}
                        {i + 1 === 20 && (
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 self-end"></div>
                        )}
                        {i + 1 === 10 && (
                          <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 self-end"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />', 'calendar-code')}>
                {copied === 'calendar-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{copied === 'calendar-code' ? 'Copied!' : 'Copy Code'}</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="carousel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Featured Products</CardTitle>
              <CardDescription>Showcase of our top products.</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent>
                  {products.slice(0, 5).map((product, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex flex-col items-center justify-center p-6">
                            <div className="mb-4 rounded-md bg-muted/50 p-2">
                              <Image
                                src={`/${product.img || 'placeholder.svg'}`}
                                alt={product.name}
                                height={100}
                                width={100}
                                className="h-[100px] w-[100px] object-cover"
                              />
                            </div>
                            <div className="space-y-2 text-center">
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                              <div className="flex justify-center">
                                <Badge variant="secondary">${product.price.toFixed(2)}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Carousel>\n  <CarouselContent>\n    <CarouselItem>Slide 1</CarouselItem>\n    <CarouselItem>Slide 2</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>', 'carousel-code')}>
                {copied === 'carousel-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{copied === 'carousel-code' ? 'Copied!' : 'Copy Code'}</span>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Testimonials</CardTitle>
              <CardDescription>What our customers are saying about us.</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex flex-col items-center p-6">
                            <div className="mb-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={testimonial.avatar || '/placeholder.svg'} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="space-y-2 text-center">
                              <div className="flex justify-center">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i}>
                                    {i < Math.floor(testimonial.rating) ? (
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ) : i < testimonial.rating ? (
                                      <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ) : (
                                      <Star className="h-4 w-4 text-muted" />
                                    )}
                                  </span>
                                ))}
                              </div>
                              <p className="text-sm italic">&quot;{testimonial.comment}&quot;</p>
                              <h3 className="font-medium">{testimonial.name}</h3>
                              <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+20.1% from last month</span>
                </div>
                <Progress className="mt-2" value={progressValues.revenue} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+180.1% from last month</span>
                </div>
                <Progress className="mt-2" value={progressValues.subscriptions} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  <span>-19.5% from last month</span>
                </div>
                <Progress className="mt-2" value={progressValues.sales} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+201 since last hour</span>
                </div>
                <Progress className="mt-2" value={progressValues.users} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Statistics</CardTitle>
              <CardDescription>Detailed metrics and performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
                    <div className="text-2xl font-bold">3.6%</div>
                    <div className="flex items-center text-xs text-green-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+0.4% from last week</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Avg. Order Value</h3>
                    <div className="text-2xl font-bold">$89.42</div>
                    <div className="flex items-center text-xs text-green-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+$4.26 from last month</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Customer Retention</h3>
                    <div className="text-2xl font-bold">82.3%</div>
                    <div className="flex items-center text-xs text-red-500">
                      <TrendingDown className="mr-1 h-3 w-3" />
                      <span>-1.2% from last quarter</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Net Promoter Score</h3>
                    <div className="text-2xl font-bold">58</div>
                    <div className="flex items-center text-xs text-green-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>+3 points from last survey</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Direct</span>
                          </div>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">Search</span>
                          </div>
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">Social</span>
                          </div>
                          <span className="text-sm font-medium">22%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            <span className="text-sm">Referral</span>
                          </div>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Device Usage</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Mobile</span>
                          </div>
                          <span className="text-sm font-medium">62%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">Desktop</span>
                          </div>
                          <span className="text-sm font-medium">31%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">Tablet</span>
                          </div>
                          <span className="text-sm font-medium">7%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Top Countries</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-sm">United States</span>
                          </div>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">United Kingdom</span>
                          </div>
                          <span className="text-sm font-medium">18%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">Germany</span>
                          </div>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            <span className="text-sm">Canada</span>
                          </div>
                          <span className="text-sm font-medium">11%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" size="sm" className="ml-auto">
                <FileText className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chart Types</CardTitle>
              <CardDescription>Different chart types for data visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <BarChartExample />
                <LineChartExample />
                <PieChartExample />
                {/* <ActivityChartExample /> */}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                <p>Charts can be implemented using libraries like Chart.js, Recharts, or D3.js</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <Share2 className="mr-2 h-4 w-4" />
                Share Charts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ProductCardProps {
  product: {
    id: number
    name: string
    category: string
    stock: number
    price: number
    img?: string
  }
}

function ProductCard({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between">
          <Badge
            variant="outline"
            className={
              product.stock > 20 ?
                'bg-green-500/10 text-green-600 border-green-200' :
                product.stock > 0 ?
                  'bg-yellow-500/10 text-yellow-600 border-yellow-200' :
                  'bg-red-500/10 text-red-600 border-red-200'
            }
          >
            {product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
          </Badge>
          <span className="font-bold">${product.price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>{product.category}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center rounded-md border p-4">
                <Image
                  src={`/${product.img || 'placeholder.svg'}`}
                  alt={product.name}
                  height={150}
                  width={150}
                  className="h-[150px] w-[150px] object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Price</h4>
                  <p>${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Stock</h4>
                  <p>{product.stock} units</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">SKU</h4>
                  <p>SKU-{product.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <Badge
                    variant="outline"
                    className={
                      product.stock > 20 ?
                        'bg-green-500/10 text-green-600 border-green-200' :
                        product.stock > 0 ?
                          'bg-yellow-500/10 text-yellow-600 border-yellow-200' :
                          'bg-red-500/10 text-red-600 border-red-200'
                    }
                  >
                    {product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="text-sm">
                  This is a sample description for {product.name}. It would typically include details about the
                  product&apos;s features, specifications, and benefits.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button>Edit Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

// Sample data
const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', stock: 45, price: 129.99, img: 'wireless-headphones.jpg' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', stock: 12, price: 199.99, img: 'smartwatch.webp' },
  { id: 3, name: 'Ergonomic Chair', category: 'Furniture', stock: 8, price: 249.99, img: 'ergonomic-chair.webp' },
  { id: 4, name: 'Coffee Maker', category: 'Kitchen', stock: 24, price: 89.99, img: 'coffee-maker.webp' },
  { id: 5, name: 'Fitness Tracker', category: 'Wearables', stock: 0, price: 79.99, img: 'fitness-tracker.jpg' },
  { id: 6, name: 'Bluetooth Speaker', category: 'Electronics', stock: 32, price: 59.99, img: 'bluetooth-speaker.jpg' },
  { id: 7, name: 'Laptop Backpack', category: 'Accessories', stock: 18, price: 49.99, img: 'laptop-backpack.jpg' },
  { id: 8, name: 'Wireless Mouse', category: 'Electronics', stock: 0, price: 29.99, img: 'wireless-mouse.jpg' },
];

const orders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    customerAvatar: '/placeholder.svg',
    date: '2025-04-28',
    status: 'Completed',
    amount: 129.99,
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    customerAvatar: '/placeholder.svg',
    date: '2025-04-28',
    status: 'Processing',
    amount: 249.99,
  },
  {
    id: 'ORD-003',
    customer: 'Robert Johnson',
    customerAvatar: '/placeholder.svg',
    date: '2025-04-27',
    status: 'Shipped',
    amount: 89.99,
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    customerAvatar: '/placeholder.svg',
    date: '2025-04-27',
    status: 'Pending',
    amount: 59.99,
  },
  {
    id: 'ORD-005',
    customer: 'Michael Wilson',
    customerAvatar: '/placeholder.svg',
    date: '2025-04-26',
    status: 'Completed',
    amount: 199.99,
  },
  {
    id: 'ORD-006',
    customer: 'Sarah Brown',
    customerAvatar: '/placeholder.svg',
    date: '2025-04-26',
    status: 'Processing',
    amount: 79.99,
  },
  {
    id: 'ORD-007',
    customer: 'David Miller',
    customerAvatar: '/placeholder.svg',
    date: '2025-04-25',
    status: 'Shipped',
    amount: 149.99,
  },
  {
    id: 'ORD-008',
    customer: 'Lisa Taylor',
    customerAvatar: '/placeholder.svg',
    date: '2025-04-25',
    status: 'Pending',
    amount: 29.99,
  },
];

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    avatar: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    avatar: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'Developer',
    avatar: '/placeholder.svg',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Designer',
    avatar: '/placeholder.svg',
  },
];

const events = [
  {
    id: 1,
    title: 'New Headphones Launch',
    type: 'Product Launch',
    date: 'May 15, 2025',
    description: 'Launch of our new wireless headphones with noise cancellation technology.',
  },
  {
    id: 2,
    title: 'Summer Sale',
    type: 'Promotion',
    date: 'June 1, 2025',
    description: 'Annual summer sale with discounts up to 50% on selected items.',
  },
  {
    id: 3,
    title: 'Smart Watch Update',
    type: 'Product Update',
    date: 'June 10, 2025',
    description: 'Software update for our smart watch line with new health tracking features.',
  },
  {
    id: 4,
    title: 'Back to School Campaign',
    type: 'Marketing',
    date: 'July 20, 2025',
    description: 'Special promotions for students returning to school.',
  },
];

const testimonials = [
  {
    name: 'John Doe',
    title: 'CEO at TechCorp',
    rating: 5,
    comment: 'These products have transformed our business operations. Highly recommended!',
    avatar: '/placeholder.svg',
  },
  {
    name: 'Jane Smith',
    title: 'Marketing Director',
    rating: 4.5,
    comment: 'Excellent quality and customer service. Will definitely purchase again.',
    avatar: '/placeholder.svg',
  },
  {
    name: 'Robert Johnson',
    title: 'Small Business Owner',
    rating: 5,
    comment: "The best investment I've made for my business this year.",
    avatar: '/placeholder.svg',
  },
  {
    name: 'Emily Davis',
    title: 'Tech Blogger',
    rating: 4,
    comment: 'Great products with intuitive design. A few minor issues but overall very satisfied.',
    avatar: '/placeholder.svg',
  },
];
