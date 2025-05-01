'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { CalendarIcon, Loader2, Eye, EyeOff, Copy, Check, Search, X, Upload, FileText, HelpCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

export default function FormsAndInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success(`File selected: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Forms & Inputs</h1>
        <p className="text-muted-foreground">
          Explore form components and input elements for collecting user data and interactions.
          Each component is designed to be accessible, customizable, and easy to use.
        </p>
      </div>

      <Tabs defaultValue="inputs" className="space-y-4">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="inputs">Input Elements</TabsTrigger>
          <TabsTrigger value="selectors">Selectors</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="product-form">Product Form</TabsTrigger>
          <TabsTrigger value="contact-form">Contact Form</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Text Inputs</CardTitle>
                <CardDescription>Basic text input fields</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                  <p className="text-xs text-muted-foreground">Your full name as it appears on your ID.</p>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Enter your password" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Password must be at least 8 characters long.</p>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="disabled">Disabled Input</Label>
                  <Input id="disabled" placeholder="This input is disabled" disabled />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Input id="email" type="email" placeholder="Enter your email" />', 'input-code')}>
                  {copied === 'input-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied === 'input-code' ? 'Copied!' : 'Copy Code'}</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Inputs</CardTitle>
                <CardDescription>Specialized input types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="number">Number Input</Label>
                  <Input id="number" type="number" placeholder="0" min="0" max="100" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Min: 0</span>
                    <span className="text-xs text-muted-foreground">Max: 100</span>
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="file">File Upload</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="file" 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('file')?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {selectedFile ? 'Change File' : 'Choose File'}
                    </Button>
                    {selectedFile && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {selectedFile && (
                    <div className="flex items-center gap-2 rounded-md bg-muted p-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{selectedFile.name}</span>
                      <Badge variant="outline" className="ml-auto">
                        {(selectedFile.size / 1024).toFixed(0)} KB
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="textarea">Text Area</Label>
                  <Textarea id="textarea" placeholder="Enter your message" className="min-h-[100px] resize-vertical" />
                  <p className="text-xs text-muted-foreground">Use this for longer text content like messages or descriptions.</p>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="date">Date Picker</Label>
                  <DatePickerDemo />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Textarea id="textarea" placeholder="Enter your message" className="min-h-[100px]" />', 'textarea-code')}>
                  {copied === 'textarea-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied === 'textarea-code' ? 'Copied!' : 'Copy Code'}</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Input States</CardTitle>
              <CardDescription>Different states for input fields</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="default">Default</Label>
                <Input id="default" placeholder="Default input" />
                <p className="text-xs text-muted-foreground">Standard input appearance</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="focused">Focused (click to see)</Label>
                <Input id="focused" placeholder="Click to focus" />
                <p className="text-xs text-muted-foreground">Shows focus ring when active</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled-2">Disabled</Label>
                <Input id="disabled-2" placeholder="Disabled input" disabled />
                <p className="text-xs text-muted-foreground">Cannot be interacted with</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="with-icon">With Icon</Label>
                <div className="relative">
                  <Input id="with-icon" placeholder="Search..." />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Input with visual indicator</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="error">Error State</Label>
                <Input id="error" placeholder="Invalid input" className="border-red-500 focus-visible:ring-red-500" />
                <p className="text-xs text-red-500">This field is required</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="success">Success State</Label>
                <Input
                  id="success"
                  placeholder="Valid input"
                  className="border-green-500 focus-visible:ring-green-500"
                />
                <p className="text-xs text-green-500">Looks good!</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="with-prefix">With Prefix</Label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                    https://
                  </span>
                  <Input id="with-prefix" placeholder="example.com" className="rounded-l-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="with-suffix">With Suffix</Label>
                <div className="flex">
                  <Input id="with-suffix" placeholder="0.00" className="rounded-r-none" />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                    USD
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="with-help">With Help Text</Label>
                <div className="relative">
                  <Input id="with-help" placeholder="Enter username" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Username must be unique and contain only letters, numbers, and underscores.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selectors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Checkboxes</CardTitle>
                <CardDescription>Select multiple options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" defaultChecked />
                  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled-checkbox" disabled />
                  <Label htmlFor="disabled-checkbox" className="text-muted-foreground">
                    Disabled option
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled-checked" disabled defaultChecked />
                  <Label htmlFor="disabled-checked" className="text-muted-foreground">
                    Disabled checked
                  </Label>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-base">Notification Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="email-notifications" defaultChecked />
                      <div>
                        <Label htmlFor="email-notifications">Email notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive emails about your account activity.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="marketing-emails" />
                      <div>
                        <Label htmlFor="marketing-emails">Marketing emails</Label>
                        <p className="text-xs text-muted-foreground">Receive emails about new products, features, and more.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="security-emails" defaultChecked />
                      <div>
                        <Label htmlFor="security-emails">Security emails</Label>
                        <p className="text-xs text-muted-foreground">Receive emails about your account security.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Checkbox id="terms" />\n<Label htmlFor="terms">Accept terms and conditions</Label>', 'checkbox-code')}>
                  {copied === 'checkbox-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied === 'checkbox-code' ? 'Copied!' : 'Copy Code'}</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Radio Groups</CardTitle>
                <CardDescription>Select one option from a group</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" id="option-three" disabled />
                    <Label htmlFor="option-three" className="text-muted-foreground">
                      Option Three (Disabled)
                    </Label>
                  </div>
                </RadioGroup>
                <Separator />
                <div className="space-y-3">
                  <Label className="text-base">Subscription Plan</Label>
                  <RadioGroup defaultValue="standard">
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="free" />
                        <div>
                          <Label htmlFor="free">Free Plan</Label>
                          <p className="text-xs text-muted-foreground">Basic features for personal use</p>
                        </div>
                        <Badge className="ml-auto">$0/mo</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <div>
                          <Label htmlFor="standard">Standard Plan</Label>
                          <p className="text-xs text-muted-foreground">Advanced features for professionals</p>
                        </div>
                        <Badge className="ml-auto">$9/mo</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="premium" id="premium" />
                        <div>
                          <Label htmlFor="premium">Premium Plan</Label>
                          <p className="text-xs text-muted-foreground">All features for teams</p>
                        </div>
                        <Badge className="ml-auto">$19/mo</Badge>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <div className="space-y-3">
                  <Label className="text-base">Card Type</Label>
                  <RadioGroup defaultValue="visa" className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="visa" id="visa" className="sr-only" />
                      <Label
                        htmlFor="visa"
                        className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <svg className="mb-1 h-6 w-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="48" height="48" fill="white" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.6167 17.7887H21.876L19.1387 30.7887H13.8793L16.6167 17.7887Z" fill="#00579F" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M33.9518 18.144C32.9093 17.7367 31.3347 17.3 29.3227 17.3C25.0413 17.3 22.0413 19.5847 22.0227 22.8C22.004 25.2587 24.1853 26.6587 25.8413 27.5C27.5347 28.3587 28.0973 28.9 28.0973 29.6333C28.0787 30.7333 26.7347 31.2333 25.4853 31.2333C23.6973 31.2333 22.7493 30.9333 21.2413 30.2333L20.6413 29.9333L20 33.6333C21.2227 34.2 23.4853 34.7 25.8227 34.7C30.3413 34.7 33.2787 32.4333 33.3147 28.9667C33.3333 27.0333 32.0413 25.5667 29.5347 24.3C28.004 23.4667 27.0787 22.9 27.0973 22.1C27.0973 21.3667 27.9707 20.6 29.8413 20.6C31.3867 20.5667 32.4853 20.9667 33.3147 21.3667L33.7493 21.5667L34.3867 18.0333L33.9518 18.144Z" fill="#00579F" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M38.9333 17.7887H42.6667C43.3333 17.7887 43.8 17.9553 44 18.6887L46.6667 30.7887H42.6667L42 28.122H36.6667L35.6667 30.7887H31.3333L37.3333 18.322C37.7333 17.9553 38.2667 17.7887 38.9333 17.7887ZM40.6667 21.7887L38.6667 25.7887H41.3333L40.6667 21.7887Z" fill="#00579F" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.6667 17.7887L6.66667 26.7887L6.33333 25.122C5.66667 22.7887 3.33333 20.322 0.666667 19.122L4.33333 30.7887H8.66667L16 17.7887H10.6667Z" fill="#00579F" />
                        </svg>
                        <span className="text-xs">Visa</span>
                      </Label>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="mastercard" id="mastercard" className="sr-only" />
                      <Label
                        htmlFor="mastercard"
                        className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <svg className="mb-1 h-6 w-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="48" height="48" fill="white" />
                          <path d="M18.0002 34.9999H30.0002V13H18.0002V34.9999Z" fill="#FF5F00" />
                          <path d="M19.0001 24C19.0001 19.7 21.1001 15.9 24.0001 13.5C22.0001 11.9 19.5001 11 17.0001 11C10.4001 11 5.00012 16.8 5.00012 24C5.00012 31.2 10.4001 37 17.0001 37C19.5001 37 22.0001 36.1 24.0001 34.5C21.1001 32 19.0001 28.3 19.0001 24Z" fill="#EB001B" />
                          <path d="M43.0001 24C43.0001 31.2 37.6001 37 31.0001 37C28.5001 37 26.0001 36.1 24.0001 34.5C27.0001 32 29.0001 28.3 29.0001 24C29.0001 19.7 27.0001 15.9 24.0001 13.5C26.0001 11.9 28.5001 11 31.0001 11C37.6001 11 43.0001 16.8 43.0001 24Z" fill="#F79E1B" />
                        </svg>
                        <span className="text-xs">Mastercard</span>
                      </Label>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="amex" id="amex" className="sr-only" />
                      <Label
                        htmlFor="amex"
                        className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <svg className="mb-1 h-6 w-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="48" height="48" fill="white" />
                          <path d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" fill="#006FCF" />
                          <path d="M24.0133 28.5333H19.7333V19.4667H24.0133L26.4133 24L24.0133 28.5333Z" fill="white" />
                          <path d="M24.0133 19.4667L26.4133 24L24.0133 28.5333H28.2933L30.6933 24L28.2933 19.4667H24.0133Z" fill="white" />
                          <path d="M17.3333 19.4667H13.0533L12 21.0667V19.4667H8.77333L8.29333 20.6L7.81333 19.4667H4V28.5333H7.81333L8.29333 27.4L8.77333 28.5333H11.5267V26.9333L12 28.5333H16.28L17.3333 26.9333V28.5333H20.6V19.4667H17.3333ZM9.73333 26.4667H8.77333V21.5333H9.73333V26.4667ZM16.28 26.4667H14.84L13.5333 24.4667L14.84 22.4667H16.28L14.9733 24.4667L16.28 26.4667Z" fill="white" />
                          <path d="M40 19.4667H36.6667L35.2267 21.5333L33.7867 19.4667H28.2933L30.6933 24L28.2933 28.5333H33.7867L35.2267 26.4667L36.6667 28.5333H40L37.1333 24L40 19.4667ZM33.3067 26.4667H31.8667L30.56 24.4667L31.8667 22.4667H33.3067L32 24.4667L33.3067 26.4667Z" fill="white" />
                        </svg>
                        <span className="text-xs">American Express</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard('<RadioGroup defaultValue="option-one">\n  <div className="flex items-center space-x-2">\n    <RadioGroupItem value="option-one" id="option-one" />\n    <Label htmlFor="option-one">Option One</Label>\n  </div>\n</RadioGroup>', 'radio-code')}>
                  {copied === 'radio-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied === 'radio-code' ? 'Copied!' : 'Copy Code'}</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Dropdowns</CardTitle>
                <CardDescription>Choose from a list of options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">T-Shirt Size</Label>
                  <Select defaultValue="m">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="s">Small</SelectItem>
                      <SelectItem value="m">Medium</SelectItem>
                      <SelectItem value="l">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <Input placeholder="Search country..." className="h-8" />
                      </div>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="br">Brazil</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="cn">China</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Select>\n  <SelectTrigger>\n    <SelectValue placeholder="Select an option" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="option1">Option 1</SelectItem>\n    <SelectItem value="option2">Option 2</SelectItem>\n  </SelectContent>\n</Select>', 'select-code')}>
                  {copied === 'select-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied === 'select-code' ? 'Copied!' : 'Copy Code'}</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sliders & Toggles</CardTitle>
                <CardDescription>Adjust values and toggle settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="volume">Volume</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      75%
                    </span>
                  </div>
                  <Slider id="volume" defaultValue={[75]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="price-range">Price Range</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      $25-$75
                    </span>
                  </div>
                  <Slider id="price-range" defaultValue={[25, 75]} max={100} step={1} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Enable Notifications</Label>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <Switch id="marketing" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Slider id="volume" defaultValue={[75]} max={100} step={1} />', 'slider-code')}>
                  {copied === 'slider-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied === 'slider-code' ? 'Copied!' : 'Copy Code'}</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Form Validation</CardTitle>
              <CardDescription>Implementing validation for form inputs</CardDescription>
            </CardHeader>
            <CardContent>
              <ValidationForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product-form" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Create a new product for your inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact-form" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>A simple contact form for user inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DatePickerDemo() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

function ValidationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      valid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    
    if (isValid) {
      setSubmitted(true);
      toast.success('Form submitted successfully!');
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted ? (
        <div className="rounded-md bg-green-50 p-4 text-green-700">
          <div className="flex">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div className="ml-3">
              <h3 className="text-sm font-medium">Form submitted successfully!</h3>
              <div className="mt-2 text-sm">
                <p>Thank you for your submission.</p>
              </div>
              <div className="mt-4">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setFormData({
                      username: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                    });
                    setErrors({
                      username: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                    });
                    setSubmitted(false);
                  }}
                >
                  Reset Form
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="username">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            {!errors.password && (
              <div className="text-xs text-muted-foreground">
                Password must be at least 8 characters and include uppercase, lowercase, and numbers.
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="submit">Submit</Button>
          </div>
        </>
      )}
    </form>
  );
}

function ProductForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Product created successfully!');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input id="product-name" placeholder="Enter product name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-sku">SKU</Label>
            <Input id="product-sku" placeholder="e.g. PROD-12345" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-category">Category</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="home">Home & Kitchen</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="toys">Toys & Games</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-description">Description</Label>
          <Textarea id="product-description" placeholder="Enter product description" className="min-h-[100px]" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="product-price">Price ($)</Label>
            <Input id="product-price" type="number" min="0" step="0.01" placeholder="0.00" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-stock">Stock Quantity</Label>
            <Input id="product-stock" type="number" min="0" placeholder="0" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Product Status</Label>
          <RadioGroup defaultValue="active">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="status-active" />
              <Label htmlFor="status-active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="draft" id="status-draft" />
              <Label htmlFor="status-draft">Draft</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="archived" id="status-archived" />
              <Label htmlFor="status-archived">Archived</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Options</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="featured" />
              <Label htmlFor="featured">Featured Product</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="tax-exempt" />
              <Label htmlFor="tax-exempt">Tax Exempt</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="requires-shipping" defaultChecked />
              <Label htmlFor="requires-shipping">Requires Shipping</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Creating...' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Message sent successfully!');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input id="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input id="email" type="email" placeholder="Your email" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Message subject" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="support">Customer Support</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="technical">Technical Support</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea id="message" placeholder="Your message" className="min-h-[150px]" required />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="privacy-policy" required />
        <div>
          <Label htmlFor="privacy-policy">
            I agree to the privacy policy <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            By submitting this form, you agree to our terms and conditions and privacy policy.
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="reset">Reset</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}
