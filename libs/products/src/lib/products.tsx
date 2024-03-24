import {
  makeStyles,
  shorthands,
  typographyStyles,
  tokens,
} from '@fluentui/react-components';
import { ProductType } from '@mono-catalog/types';
import { Product } from './product';

const useStyles = makeStyles({
  card: {},
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gridColumnGap: '16px',
    gridRowGap: '16px',
  },
  listItem: {
    listStyleType: 'none',
  },
  preview: {
    height: '200px',
    ...shorthands.padding(tokens.spacingHorizontalM),
  },
  img: {
    objectFit: 'contain',
  },
  title: {
    display: 'block',
    marginBottom: tokens.spacingVerticalXXL,
    ...typographyStyles.largeTitle,
  },
});

export interface ProductsProps {
  products: ProductType[];
}

export function Products({ products }: ProductsProps) {
  const styles = useStyles();

  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li className={styles.listItem} key={product.id}>
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
}

export default Products;
