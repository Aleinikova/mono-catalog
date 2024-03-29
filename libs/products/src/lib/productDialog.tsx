import {
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  makeStyles,
  mergeClasses,
} from '@fluentui/react-components';
import { Category, Product } from '@mono-catalog/types';

import ProductForm from './productForm';

const useStyles = makeStyles({
  root: {},
});

interface ProductDialogProps {
  title?: string;
  categories: Category[];
  onSubmit: (product: Product) => void;
  defaultValues?: Product;
  className?: string;
}

export function ProductDialog({
  title,
  categories,
  defaultValues,
  className,
  onSubmit,
}: ProductDialogProps) {
  const styles = useStyles();

  return (
    <DialogSurface className={mergeClasses(styles.root, className)}>
      <DialogBody>
        <DialogTitle>{title || 'Add new product'}</DialogTitle>
        <DialogContent>
          <ProductForm
            categories={categories}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          />
        </DialogContent>
      </DialogBody>
    </DialogSurface>
  );
}

export default ProductDialog;
