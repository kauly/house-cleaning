import { NumberInput, NumberInputProps } from '@tremor/react';
import { useController } from 'react-hook-form';

type HookedNumberInputProps = {
  label: string;
} & NumberInputProps;

function HookedNumberInput(props: HookedNumberInputProps) {
  const {
    field,
    fieldState: { error }
  } = useController({ name: props?.name ?? '' });
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name}>{props.label}</label>
      <NumberInput
        error={!!error}
        errorMessage={error?.message ?? ' '}
        {...props}
        {...field}
      />
    </div>
  );
}

export { HookedNumberInput };
