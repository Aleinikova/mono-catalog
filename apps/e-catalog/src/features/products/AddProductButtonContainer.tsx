import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import {
  Toast,
  useId,
  useToastController,
  ToastTitle,
  Toaster,
} from '@fluentui/react-components';
import { ProductType } from '@mono-catalog/types';
import { AddProductButton } from '@mono-catalog/products';

import { selectAllCategories } from '../../store/categoriesStore';
import { AppDispatch } from '../../store';
import { ProductAction } from '../../store/productsStore';

interface ProductButtonContainerProps {
  children?: React.ReactNode;
}

function AddProductButtonContainer(props: ProductButtonContainerProps) {
  const categories = useSelector(selectAllCategories);

  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);

  // TODO: create custom dispatch
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (product: Omit<ProductType, 'id'>) => {
    dispatch(
      ProductAction({
        ...product,
        id: uuidv4(),
      } as ProductType)
    );

    dispatchToast(
      <Toast>
        <ToastTitle>Product is successfully added</ToastTitle>
      </Toast>,
      { intent: 'success' }
    );
  };

  return (
    <>
      <AddProductButton categories={categories} onSubmit={onSubmit} />
      <Toaster toasterId={toasterId} />
    </>
  );
}

export default AddProductButtonContainer;
