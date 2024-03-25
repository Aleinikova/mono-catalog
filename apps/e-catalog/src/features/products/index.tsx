import {
  makeStyles,
  Text,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { Products } from '@mono-catalog/products';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import {
  getProducts,
  selectProductsByCategoryName,
} from '../../store/productsStore';

const useStyles = makeStyles({
  title: {
    display: 'block',
    marginBottom: tokens.spacingVerticalXXL,
    ...typographyStyles.largeTitle,
  },
});

function ProductsContainer() {
  const styles = useStyles();

  const { category } = useParams();

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) =>
    selectProductsByCategoryName(state, category)
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Text as="h1" className={styles.title}>
        {category}
      </Text>
      <Products products={products} />
    </>
  );
}

export default ProductsContainer;
