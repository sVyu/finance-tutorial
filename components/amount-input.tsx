import CurrencyInput from 'react-currency-input-field';
import { Info, MinusCircle, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  // value: string | undefined; // next error
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const AmountInput = ({
  value,
  onChange,
  placeholder,
  disabled,
}: Props) => {
  const parsedValue = parseFloat(value ?? '0');
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) {
      return;
    }

    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  };

  return (
    <div className="w-full flex flex-col gap-0">
      <div className="relative flex flex-col justify-center">
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onReverseValue}
                className={cn(
                  'bg-slate-400 hover:bg-slate-500 absolute p-2 left-1.5 rounded-md flex items-center justify-center transition',
                  isIncome && 'bg-emerald-500 hover:bg-emerald-600',
                  isExpense && 'bg-rose-500 hover:bg-rose-600'
                )}
              >
                {!parsedValue && <Info className="size-3 text-white" />}
                {isIncome && <PlusCircle className="size-3 text-white" />}
                {isExpense && <MinusCircle className="size-3 text-white" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              Use [+] for income and [-] for expenses
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CurrencyInput
          prefix="$"
          className="pl-10 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={placeholder}
          value={value}
          decimalsLimit={2}
          decimalScale={2}
          onValueChange={onChange}
          disabled={disabled}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {isIncome && 'This will count as income'}
        {isExpense && 'This will count as expense'}
      </p>
    </div>
  );
};
