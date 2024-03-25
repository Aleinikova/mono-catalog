import {
  Dialog,
  makeStyles,
  Spinner,
  Text,
  tokens,
  typographyStyles,
  useToastController,
  ToastTitle,
  Toast,
  useId,
  Toaster,
} from '@fluentui/react-components';
import { Products } from '@mono-catalog/products';
import { ProductDialog } from '@mono-catalog/products';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import {
  getProducts,
  removeProductAction,
  selectProductById,
  selectProductsByCategoryName,
  selectProductsStatus,
  updateProductAction,
} from '../../store/productsStore';
import { selectAllCategories } from '../../store/categoriesStore';
import { ProductType } from '@mono-catalog/types';

const useStyles = makeStyles({
  title: {
    display: 'block',
    marginBottom: tokens.spacingVerticalXXL,
    ...typographyStyles.largeTitle,
  },
  spinner: {
    height: '100%',
  },
});

function ProductsContainer() {
  const styles = useStyles();

  // TODO: remove copies of toaster
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);

  const [open, setOpen] = useState(false);

  const { category } = useParams();

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) =>
    selectProductsByCategoryName(state, category)
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

  const handleProductEdit = (product: ProductType) => {
    dispatch(
      updateProductAction({
        id: product.id,
        changes: product,
      })
    );

    // TODO: rework
    dispatchToast(
      <Toast>
        <ToastTitle>Product is successfully edited</ToastTitle>
      </Toast>,
      { intent: 'success' }
    );
  };

  return (
    <>
      <Text as="h1" className={styles.title}>
        {category}
      </Text>
      {isLoading && <Spinner className={styles.spinner} />}
      {!isLoading && <Products products={products} actions={actions} />}

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
