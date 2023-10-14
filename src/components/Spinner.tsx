import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader, LucideProps } from 'lucide-react';

export const spinnerVariants = cva('text muted-foreground animate-spin', {
  variants: {
    size: {
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      md: 'h-5 w-5',
      icon: 'h-10 w-10',
      default: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface ISpinnerProps extends VariantProps<typeof spinnerVariants> {}

const Spinner = ({ size, className }: ISpinnerProps & LucideProps) => (
  <Loader className={cn(spinnerVariants({ size }), className)} />
);

export default Spinner;
