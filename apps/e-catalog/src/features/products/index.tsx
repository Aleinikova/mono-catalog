import {
  Dialog,
  Spinner,
  Toast,
  ToastTitle,
  Toaster,
  makeStyles,
  useId,
  useToastController,
} from '@fluentui/react-components';
import { Products } from '@mono-catalog/products';
import { ProductDialog } from '@mono-catalog/products';
import { Product } from '@mono-catalog/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppDispatch, RootState } from '../../store';
import { selectAllCategories } from '../../store/categoriesStore';
import {
  getProducts,
  removeProductAction,
  selectAllProducts,
  selectProductById,
  selectProductsByCategoryName,
  selectProductsStatus,
  updateProductAction,
} from '../../store/productsStore';

const useStyles = makeStyles({
  spinner: {
    height: '100%',
  },
});

interface ProductsContainerProps {
  category?: string;
}

function ProductsContainer({ category }: ProductsContainerProps) {
  const styles = useStyles();

  // TODO: better to implement with redux and have on component for rendering toasters
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);

  const [open, setOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) =>
    category
      ? selectProductsByCategoryName(state, category)
      : selectAllProducts(state)
  );

  const categories = useSelector((state: RootState) =>
    selectAllCategories(state)
  );

  const status = useSelector(selectProductsStatus);

  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = (productId: string) => {
    dispatch(removeProductAction(productId));
  };

  const [productIdToEdit, setProductIdToEdit] = useState<string>();

  const productToEdit = useSelector((state: RootState) =>
    productIdToEdit ? selectProductById(state, productIdToEdit) : undefined
  );

  const actions = [
    {
      label: 'Edit',
      onClick: (productId: string) => {
        setProductIdToEdit(productId);
        setOpen(true);
      },
    },
    { label: 'Delete', onClick: handleDeleteProduct },
  ];

  const handleProductEdit = (product: Product) => {
    dispatch(
      updateProductAction({
        id: product.id,
        changes: product,
      })
    );

    dispatchToast(
      <Toast>
        <ToastTitle>Product is successfully edited</ToastTitle>
      </Toast>,
      { intent: 'success' }
    );
  };

  return (
    <>
      {isLoading && <Spinner className={styles.spinner} />}
      {!isLoading && (
        <Products products={products} actions={actions} LinkComponent={Link} />
      )}

      <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
        <ProductDialog
          defaultValues={productToEdit}
          categories={categories}
          onSubmit={handleProductEdit}
          title="Edit product"
        />
      </Dialog>

      <Toaster toasterId={toasterId} />
    </>
  );
}

export default ProductsContainer;
