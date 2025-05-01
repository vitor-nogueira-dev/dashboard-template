// Button component based on ShadcnUI, with modifications to add variants, icons and loading state.

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 [&:not(:disabled)]:active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:bg-primary/95 cursor-pointer',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:bg-destructive/95 focus-visible:ring-destructive/30 dark:bg-destructive/80 dark:hover:bg-destructive/70 dark:focus-visible:ring-destructive/30 dark:shadow-lg dark:shadow-destructive/20 cursor-pointer',
        outline:
          'border border-accent/50 bg-background hover:bg-accent hover:text-white dark:border-accent/40 dark:hover:border-accent/60 dark:hover:bg-accent/20 shadow-sm cursor-pointer',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:bg-secondary/85 dark:bg-secondary/80 dark:hover:bg-secondary/70 dark:shadow-md cursor-pointer',
        ghost:
          'hover:bg-muted hover:text-accent-foreground dark:hover:bg-muted/30 dark:hover:text-accent-foreground cursor-pointer',
        link:
          'text-primary underline-offset-4 hover:underline focus-visible:ring-transparent dark:text-primary/90 dark:hover:text-primary cursor-pointer',
        subtle:
          'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 dark:text-primary-foreground',
        accent:
          'bg-accent text-accent-foreground hover:bg-accent/90 dark:bg-accent/80 dark:hover:bg-accent/70 shadow-sm cursor-pointer',
        glass:
          'bg-background/70 backdrop-blur-md border border-background/20 shadow-lg hover:bg-background/80 dark:bg-background/30 dark:hover:bg-background/40 dark:border-white/10 cursor-pointer',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
        lg: 'h-12 rounded-md px-6 has-[>svg]:px-5 text-base',
        xl: 'h-14 rounded-lg px-8 has-[>svg]:px-6 text-lg',
        icon: 'size-10 p-2',
        'icon-sm': 'size-8 p-1.5',
        'icon-lg': 'size-12 p-2.5',
      },
      rounded: {
        default: 'rounded-md',
        sm: 'rounded',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
        none: 'rounded-none',
      },
      hasIcon: {
        true: '[&_svg]:mr-2 [&_svg]:size-4',
        leading: '[&_svg]:mr-2 [&_svg]:size-4',
        trailing: '[&_svg]:ml-2 [&_svg]:size-4 flex-row-reverse',
      },
      isLoading: {
        true: 'relative text-white transition-none hover:text-transparent [&:disabled]:text-transparent',
      },
    },
    compoundVariants: [
      {
        isLoading: true,
        className: '[&:disabled]:cursor-not-allowed [&:disabled]:opacity-70',
      },
      {
        variant: ['default', 'destructive', 'secondary', 'accent', 'glass'],
        className: 'shadow-sm focus-visible:shadow-md',
      },
      {
        variant: ['outline', 'ghost', 'link'],
        className: 'focus-visible:bg-accent/20',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  },
);

interface ButtonProps extends React.ComponentProps<'button'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Button({
  className,
  variant,
  size,
  rounded,
  hasIcon,
  isLoading,
  leftIcon,
  rightIcon,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  // Determine hasIcon based on the provided icons
  const effectiveHasIcon = leftIcon ? 'leading' :
    rightIcon ? 'trailing' :
      hasIcon === true ? true :
        hasIcon;

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({
        variant,
        size,
        rounded,
        hasIcon: effectiveHasIcon,
        isLoading,
        className,
      }))}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <Loader2
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-white h-8 w-8 animate-spin"
        />
      )}
      {leftIcon && !isLoading && leftIcon}
      {children}
      {rightIcon && !isLoading && rightIcon}
    </Comp>
  );
}

export { Button, buttonVariants };