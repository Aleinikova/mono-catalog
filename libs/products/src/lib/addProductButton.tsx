import { Button, mergeClasses } from '@fluentui/react-components';
import { Category, Product } from '@mono-catalog/types';
import { useCallback, useState } from 'react';

import ProductDialog from './productDialog';

export interface ProductButtonProps {
  className?: string;
  categories: Category[];
  onSubmit: (product: Product) => void;
}

export function AddProductButton({
  className,
  categories,
  onSubmit,
}: ProductButtonProps) {
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const handleSubmit = useCallback(
    (data: Product) => {
      onSubmit(data);
      setOpen(false);
    },
    [onSubmit]
  );

  return (
    <>
      <Button
        className={mergeClasses(className)}
        appearance="primary"
        onClick={openDialog}
      >
        Add Product
      </Button>

      <ProductDialog
        categories={categories}
        onSubmit={handleSubmit}
        open={open}
        toggleOpen={setOpen}
      />
    </>
  );
}

export default AddProductButton;
