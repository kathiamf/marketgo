import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import { Input } from './Input';

type FormInputProps<T extends FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur'
> & {
  control: Control<T>;
  name: Path<T>;
  label: string;
  mask?: (text: string) => string;
};

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  mask,
  ...rest
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Input
          {...rest}
          label={label}
          value={String(value ?? '')}
          onChangeText={(text) => onChange(mask ? mask(text) : text)}
          onBlur={onBlur}
          error={error?.message}
        />
      )}
    />
  );
}
