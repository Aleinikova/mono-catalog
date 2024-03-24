import {
  makeStyles,
  Text,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { Products } from '@mono-catalog/products';
import { ProductType } from '@mono-catalog/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios('products.json');

        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCategories();
  }, []);

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
