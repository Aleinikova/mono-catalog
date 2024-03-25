import {
  makeStyles,
  shorthands,
  typographyStyles,
  tokens,
} from '@fluentui/react-components';
import { Action, ProductType } from '@mono-catalog/types';
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
  actions: Action[];
}

export function Products({ products, actions }: ProductsProps) {
  const styles = useStyles();

  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li className={styles.listItem} key={product.id}>
          <Product product={product} actions={actions} />
        </li>
      ))}
    </ul>
  );
}

export default Products;
