import {
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  makeStyles,
} from '@fluentui/react-components';
import { CategoryType, ProductType } from '@mono-catalog/types';
import ProductForm from './productForm';

const useStyles = makeStyles({
  root: {},
});

interface ProductDialogProps {
  title?: string;
  categories: CategoryType[];
  onSubmit: (product: ProductType) => void;
  defaultValues?: ProductType;
}

export function ProductDialog({
  title,
  categories,
  defaultValues,
  onSubmit,
}: ProductDialogProps) {
  const styles = useStyles();

  return (
    <DialogSurface className={styles.root}>
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
