import {
  Field,
  Input,
  Combobox,
  Option,
  FieldProps,
  InputProps,
} from '@fluentui/react-components';
import { ProductFieldOption, ProductFieldType } from '@mono-catalog/types';
import {
  Controller,
  Control,
  FieldValues,
  UseFormRegisterReturn,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface ProductFormProps<TForm extends FieldValues> extends FieldProps {
  name: Path<TForm>;
  type: ProductFieldType;
  inputProps?: InputProps;
  className?: string;
  options?: ProductFieldOption[];
  control?: Control<TForm>;
  register?: UseFormRegisterReturn;
  rules?: RegisterOptions<TForm, Path<TForm>>;
}

function ProductFormField<TForm extends FieldValues>({
  name,
  type,
  title,
  validationMessage,
  rules,
  className,
  options,
  control,
  inputProps,
}: ProductFormProps<TForm>) {
  if (type === 'string') {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Field
            label={title}
            className={className}
            validationMessage={validationMessage}
          >
            <Input {...inputProps} {...field} />
          </Field>
        )}
      />
    );
  }

  if (type === 'number') {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Field
            label={title}
            className={className}
            validationMessage={validationMessage}
          >
            <Input type="number" {...inputProps} {...field} />
          </Field>
        )}
      />
    );
  }

  if (type === 'select' && options) {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Field
            label={title}
            className={className}
            validationMessage={validationMessage}
          >
            <Combobox
              onOptionSelect={(_, data) => field.onChange(data.optionValue)}
            >
              {options.map((option) => (
                <Option key={option.id} value={option.id.toString()}>
                  {option.text}
                </Option>
              ))}
            </Combobox>
          </Field>
        )}
      />
    );
  }
}

export default ProductFormField;
