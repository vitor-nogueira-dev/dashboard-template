'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { Info, CheckCircle2, XCircle, AlertTriangle, Lightbulb, Copy, Check, ExternalLink, Code, Palette, Layers, Bell, Zap, Sparkles, Home, AlertCircle, ChevronLeft, ChevronRight, ChevronDown, User, Settings, LogOut } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function UIElements() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleToast = (type: 'success' | 'info' | 'error' | 'warning') => {
    toast[type](`This is a ${type} toast notification!`);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">UI Components</h1>
        </div>
        <p className="text-muted-foreground">
          Explore the various UI components available in this dashboard template. Each component is built with shadcn/ui and can be easily customized to fit your needs.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to the UI Components</CardTitle>
              <CardDescription>
                This page showcases the various UI components available in this dashboard template.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This dashboard template includes a comprehensive set of UI components built with shadcn/ui. You can use
                these components to build rich, interactive user interfaces for your applications.
              </p>
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">How to use these components</h3>
                </div>
                <div className="mt-2 text-sm">
                  <p>
                    All components are built using shadcn/ui, which provides a set of reusable components that you can copy and paste into your projects.
                    Each component is designed to be accessible, customizable, and easy to use.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="h-8">
                        <ExternalLink className="mr-2 h-3.5 w-3.5" />
                        shadcn/ui Docs
                      </Button>
                    </Link>
                    <Link href="https://github.com/shadcn-ui/ui" target="_blank" rel="noopener noreferrer">
                      <Button variant="default" size="sm" className="h-8">
                        <Code className="mr-2 h-3.5 w-3.5" />
                        GitHub Repository
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <p>
                Explore the tabs above to see different categories of components. For more specific components, check out
                the submenus:
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/dashboard/components-guide/forms">
                  <Button variant="outline">
                    Forms & Inputs
                  </Button>
                </Link>
                <Link href="/dashboard/components-guide/display">
                  <Button variant="outline">
                    Data Display
                  </Button>
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated April 2025</span>
              </div>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Various button styles and variants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Badges</CardTitle>
                <CardDescription>Status indicators and labels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
                  <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
                  <Badge className="bg-purple-500 hover:bg-purple-600">New</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Cards</CardTitle>
                <CardDescription>Versatile content containers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Cards are used to group related content and actions. They can contain various elements like text,
                  buttons, and other components.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="buttons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different styles for different purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Standard Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button>Default</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Primary action button</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="secondary">Secondary</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Secondary action button</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="destructive">Destructive</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>For destructive actions like delete</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Outline</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Less prominent actions</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost">Ghost</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Minimal visual impact</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="link">Link</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Appears as a hyperlink</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Button Sizes</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon" className="h-9 w-9"><Bell className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" className="h-7 px-3">Extra Small</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">With Icons</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button>
                      <Zap className="mr-2 h-4 w-4" /> Default
                    </Button>
                    <Button variant="secondary">
                      <Sparkles className="mr-2 h-4 w-4" /> Secondary
                    </Button>
                    <Button variant="outline">
                      <Palette className="mr-2 h-4 w-4" /> Outline
                    </Button>
                    <Button variant="ghost">
                      <Layers className="mr-2 h-4 w-4" /> Ghost
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">States</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled Outline</Button>
                    <Button className="relative">
                      <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      With Notification
                    </Button>
                    <Button isLoading={true} className="w-1/6" />

                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                <p>Hover over buttons to see their purpose</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard('<Button>Click me</Button>', 'button-code')}>
                {copied === 'button-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{copied === 'button-code' ? 'Copied!' : 'Copy Code'}</span>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Groups & Combinations</CardTitle>
              <CardDescription>Combining buttons for related actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Button Group</h3>
                <div className="inline-flex rounded-md shadow-sm">
                  <Button className="rounded-r-none">Left</Button>
                  <Button className="rounded-none border-l-0 border-r-0">Middle</Button>
                  <Button className="rounded-l-none">Right</Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">With Dropdown</h3>
                <div className="flex flex-wrap gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Options <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="inline-flex rounded-md shadow-sm">
                    <Button>Save</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default" className="rounded-l-none border-l border-l-white/20">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Save as Draft</DropdownMenuItem>
                        <DropdownMenuItem>Save as Template</DropdownMenuItem>
                        <DropdownMenuItem>Save and Publish</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Custom Styled Buttons</h3>
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Gradient
                  </Button>
                  <Button className="rounded-full">
                    Rounded
                  </Button>
                  <Button className="border-2 border-dashed border-primary bg-transparent text-primary hover:bg-primary/10">
                    Dashed
                  </Button>
                  <Button className="animate-pulse bg-green-500 hover:bg-green-600">
                    Animated
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Types</CardTitle>
              <CardDescription>Different types of alerts for different situations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>This is an informational alert for general notifications.</AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
              </Alert>

              <Alert className="border-yellow-500/50 text-yellow-600 dark:text-yellow-500">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Your subscription will expire in 7 days.</AlertDescription>
              </Alert>

              <Alert className="border-green-500/50 text-green-600 dark:text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your changes have been saved successfully.</AlertDescription>
              </Alert>

              <Alert className="border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-500">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Tip</AlertTitle>
                <AlertDescription>
                  You can customize the appearance of alerts by modifying their border and background colors.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Variations</CardTitle>
              <CardDescription>Different styles and layouts for alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Alert className="flex items-center border-l-4 border-l-blue-500">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="ml-2">Left border accent alert.</AlertDescription>
                </Alert>

                <Alert className="flex items-center rounded-full border-green-500/50 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription className="ml-2">Rounded success alert.</AlertDescription>
                </Alert>
              </div>

              <Alert className="flex flex-col items-start sm:flex-row sm:items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="ml-0 mt-3 sm:ml-4 sm:mt-0">
                  <AlertTitle>Browser Update Required</AlertTitle>
                  <AlertDescription>
                    Your browser is outdated. Please update to the latest version for the best experience.
                  </AlertDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-0 mt-3 sm:ml-auto sm:mt-0">
                  Update Now
                </Button>
              </Alert>

              <Alert className="border-none bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-foreground">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <AlertTitle>New Feature Available</AlertTitle>
                <AlertDescription>
                  We&apos;ve just launched our new AI-powered recommendations. Try it out now!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Toast Notifications</CardTitle>
              <CardDescription>Non-intrusive alerts that appear temporarily</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                You can use the Sonner library to create toast notifications for alerts. This is a great way to provide
                feedback to users in a non-intrusive manner.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <Button
                  onClick={() => handleToast('success')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Success Toast
                </Button>
                <Button
                  onClick={() => handleToast('info')}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Info Toast
                </Button>
                <Button
                  onClick={() => handleToast('error')}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Error Toast
                </Button>
                <Button
                  onClick={() => handleToast('warning')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Warning Toast
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                <p>Toast notifications automatically disappear after a few seconds.</p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
              <CardDescription>Vertically collapsing content panels</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
                  <AccordionContent>
                    shadcn/ui is a collection of reusable components built using Radix UI and Tailwind CSS. It&apos;s not a
                    component library, but rather a collection of re-usable components that you can copy and paste into
                    your apps.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I use these components?</AccordionTrigger>
                  <AccordionContent>
                    You can copy and paste the components directly into your project and modify them as needed. Each
                    component is designed to be customizable and accessible.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I customize the components?</AccordionTrigger>
                  <AccordionContent>
                    Yes, all components are built with customization in mind. You can modify the styles, behavior, and
                    functionality to suit your needs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                <p>Accordions are great for FAQs and reducing visual clutter.</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto" onClick={() => copyToClipboard('<Accordion type="single" collapsible>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Title</AccordionTrigger>\n    <AccordionContent>Content</AccordionContent>\n  </AccordionItem>\n</Accordion>', 'accordion-code')}>
                {copied === 'accordion-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{copied === 'accordion-code' ? 'Copied!' : 'Copy Code'}</span>
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
                <CardDescription>Switch between different content views</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tab1" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-2 space-y-2">
                    <h4 className="text-sm font-medium">Tab Content 1</h4>
                    <p className="text-sm text-muted-foreground">This is the content for the first tab.</p>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-2 space-y-2">
                    <h4 className="text-sm font-medium">Tab Content 2</h4>
                    <p className="text-sm text-muted-foreground">This is the content for the second tab.</p>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-2 space-y-2">
                    <h4 className="text-sm font-medium">Tab Content 3</h4>
                    <p className="text-sm text-muted-foreground">This is the content for the third tab.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <div className="text-sm text-muted-foreground">
                  <p>Tabs help organize content into different sections.</p>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Controls</CardTitle>
                <CardDescription>Toggle switches and selectors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" defaultChecked />
                  <Label htmlFor="notifications">Enable Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="dark-theme" />
                  <Label htmlFor="dark-theme">Dark Theme</Label>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-update">Auto-update</Label>
                  <Switch id="auto-update" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <div className="text-sm text-muted-foreground">
                  <p>Switches provide a simple way to toggle between two states.</p>
                </div>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tooltips & Hover Cards</CardTitle>
              <CardDescription>Provide additional information on hover</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Tooltips</h3>
                  <div className="flex flex-wrap gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover Me</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This is a tooltip</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Important information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Sparkles className="mr-2 h-4 w-4" />
                            With Icon
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Tooltip on bottom</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Hover Cards</h3>
                  <div className="flex flex-wrap gap-4">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link">@shadcn</Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">@shadcn</h4>
                            <p className="text-sm">
                              The creator of these amazing UI components.
                            </p>
                            <div className="flex items-center pt-2">
                              <span className="text-xs text-muted-foreground">
                                Joined December 2021
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>

                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="outline">Product Info</Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">Premium Plan</h4>
                            <p className="text-sm">
                              Our most popular plan for small teams.
                            </p>
                            <div className="flex items-center pt-2">
                              <Badge>$49/month</Badge>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                <p>Use tooltips for brief hints and hover cards for richer content.</p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Separators</CardTitle>
              <CardDescription>Horizontal and vertical dividers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p>Horizontal separator</p>
                <Separator />
              </div>
              <div className="flex h-20 items-center space-x-4">
                <div>Left</div>
                <Separator orientation="vertical" />
                <div>Center</div>
                <Separator orientation="vertical" />
                <div>Right</div>
              </div>
              <div className="space-y-2">
                <p>Styled separator</p>
                <Separator className="bg-gradient-to-r from-purple-500 to-blue-500 h-[2px]" />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                <p>Separators help divide content into logical sections.</p>
              </div>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Text styles and formatting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Heading 2</h2>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3</h3>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Heading 4</h4>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      This is a paragraph of text. It demonstrates the default text styling.
                    </p>
                    <blockquote className="mt-6 border-l-2 pl-6 italic">
                      &quot;This is a blockquote. It&apos;s used to quote text from another source.&quot;
                    </blockquote>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                      <li>First item in an unordered list</li>
                      <li>Second item in an unordered list</li>
                      <li>Third item in an unordered list</li>
                    </ul>
                    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                      <li>First item in an ordered list</li>
                      <li>Second item in an ordered list</li>
                      <li>Third item in an ordered list</li>
                    </ol>
                    <div className="my-6 rounded-lg bg-muted p-4">
                      <p className="text-sm font-medium">Note</p>
                      <p className="text-sm text-muted-foreground">This is a note block for important information.</p>
                    </div>
                    <p className="text-sm text-muted-foreground">This is small muted text often used for captions or secondary information.</p>
                    <p className="text-lg font-semibold">This is larger text with emphasis.</p>
                    <p className="text-xs uppercase tracking-widest">This is small uppercase text often used for labels.</p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lists</CardTitle>
                <CardDescription>Ordered and unordered lists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Unordered List</h4>
                  <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Ordered List</h4>
                  <ol className="my-2 ml-6 list-decimal [&>li]:mt-2">
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Custom List</h4>
                  <ul className="space-y-2 my-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Completed task</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Another completed task</span>
                    </li>
                    <li className="flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>Pending task</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Components</CardTitle>
              <CardDescription>Components for navigating between pages and sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Breadcrumbs</h3>
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                        Home
                      </Link>
                    </li>
                    <li className="text-muted-foreground">/</li>
                    <li>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                        Components
                      </Link>
                    </li>
                    <li className="text-muted-foreground">/</li>
                    <li>
                      <Link href="#" className="text-sm font-medium" aria-current="page">
                        Navigation
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Pagination</h3>
                <nav className="flex items-center justify-center space-x-1" aria-label="Pagination">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <span className="sr-only">Previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">1</Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 bg-muted">2</Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
                  <span className="text-sm text-muted-foreground">...</span>
                  <Button variant="outline" size="sm" className="h-8 w-8">8</Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">9</Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <span className="sr-only">Next page</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tabs Navigation</h3>
                <Tabs defaultValue="dashboard" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
                    <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
                    <TabsTrigger value="reports" className="flex-1">Reports</TabsTrigger>
                    <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Dropdown Navigation</h3>
                <div className="flex justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Menu <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

