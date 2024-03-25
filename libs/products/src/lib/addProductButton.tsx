import {
  Button,
  mergeClasses,
  Dialog,
  DialogTrigger,
} from '@fluentui/react-components';
import ProductDialog from './productDialog';
import { CategoryType, ProductType } from '@mono-catalog/types';

export interface ProductButtonProps {
  className?: string;
  categories: CategoryType[];
  onSubmit: (product: ProductType) => void;
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
