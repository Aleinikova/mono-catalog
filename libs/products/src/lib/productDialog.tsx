import {
  Dialog,
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
  open: boolean;
  toggleOpen: (isOpen: boolean) => void;
}

export function ProductDialog({
  title,
  categories,
  defaultValues,
  className,
  open,
  toggleOpen,
  onSubmit,
}: ProductDialogProps) {
  const styles = useStyles();

  return (
    <Dialog open={open} onOpenChange={(_, data) => toggleOpen(data.open)}>
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
    </Dialog>
  );
}

export default ProductDialog;
