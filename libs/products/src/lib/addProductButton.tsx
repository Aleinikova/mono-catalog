import {
  Button,
  Dialog,
  DialogTrigger,
  mergeClasses,
} from '@fluentui/react-components';
import { Category, Product } from '@mono-catalog/types';

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
  return (
    <Dialog>
      <DialogTrigger>
        <Button className={mergeClasses(className)} appearance="primary">
          Add Product
        </Button>
      </DialogTrigger>
      <ProductDialog categories={categories} onSubmit={onSubmit} />
    </Dialog>
  );
}

export default AddProductButton;
