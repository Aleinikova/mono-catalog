import {
  Button,
  Combobox,
  Field,
  Input,
  Option,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { Category, Product } from '@mono-catalog/types';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ProductFormField from './productFormField';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: tokens.spacingVerticalL,
  },
  button: {
    marginLeft: 'auto',
  },
});

interface ProductFormProps {
  categories: Category[];
  defaultValues?: Product;
  className?: string;
  onSubmit: (product: Product) => void;
}

export function ProductForm({
  categories,
  defaultValues,
  onSubmit,
  className,
}: ProductFormProps) {
  const styles = useStyles();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: defaultValues || {
      categoryId: undefined,
      name: '',
      price: '',
      imageUrl: '',
      inventory: 0,
    },
  });

  const categoryId = watch('categoryId');

  const category = useMemo(
    () => categories.find((category) => category.id === categoryId),
    [categories, categoryId]
  );

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleSubmitClick = async (values: Product) => {
    await onSubmit({
      ...values,
      inventory: +values.inventory,
      currency: 'CHF',
    });
    reset();
  };

  return (
    <form
      className={mergeClasses(styles.form, className)}
      onSubmit={handleSubmit(handleSubmitClick)}
    >
      <Controller
        name="categoryId"
        control={control}
        rules={{ required: 'Required field' }}
        render={({ field }) => (
          <Field
            label="Category"
            className={styles.field}
            validationMessage={errors.categoryId?.message}
          >
            <Combobox
              onOptionSelect={(_, data) => field.onChange(data.optionValue)}
              selectedOptions={[field.value]}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id.toString()}>
                  {category.name}
                </Option>
              ))}
            </Combobox>
          </Field>
        )}
      />
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Required field' }}
        render={({ field }) => (
          <Field
            label="Name"
            className={styles.field}
            validationMessage={errors.name?.message}
          >
            <Input {...field} />
          </Field>
        )}
      />

      <Controller
        name="price"
        control={control}
        rules={{
          required: 'Required field',
          validate: {
            positive: (v) => +v > 0 || 'Should be positive',
          },
        }}
        render={({ field }) => (
          <Field
            label="Price"
            className={styles.field}
            validationMessage={errors.price?.message}
          >
            <Input type="number" {...field} />
          </Field>
        )}
      />

      <Controller
        name="inventory"
        control={control}
        rules={{
          required: 'Required field',
          validate: {
            positive: (v) => +v > 0 || 'Should be positive',
          },
        }}
        render={({ field }) => (
          <Field
            label="Inventory"
            className={styles.field}
            validationMessage={errors.price?.message}
          >
            <Input type="number" {...field} value={field.value.toString()} />
          </Field>
        )}
      />

      <Controller
        name="imageUrl"
        control={control}
        render={({ field }) => (
          <Field
            label="Photo Url"
            className={styles.field}
            validationMessage={errors.name?.message}
          >
            <Input {...field} />
          </Field>
        )}
      />

      {category &&
        category.fields?.map((field) => (
          <ProductFormField
            {...field}
            name={field.name}
            control={control}
            className={styles.field}
            key={field.name}
          />
        ))}
      <Button className={styles.button} appearance="primary" type="submit">
        Save
      </Button>
    </form>
  );
}

export default ProductForm;
