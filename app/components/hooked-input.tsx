import { TextInput, TextInputProps } from '@tremor/react';
import { useController } from 'react-hook-form';

type HookedInputProps = { label: string } & TextInputProps;

function HookedInput(props: HookedInputProps) {
  const {
    field: { onChange, value, onBlur, ref },
    fieldState: { error }
  } = useController({ name: props.name || '' });

  return (
    <div className="flex flex-col">
      <label htmlFor={props.name}>{props.label}</label>
      <TextInput
        {...props}
        value={value}
        error={!!error}
        errorMessage={error?.message ?? ' '}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </div>
  );
}

export { HookedInput };
