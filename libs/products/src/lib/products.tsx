import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { Action, Product } from '@mono-catalog/types';

import { ProductCard } from './productCard';

const useStyles = makeStyles({
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gridColumnGap: '16px',
    gridRowGap: '16px',
  },
  listItem: {
    listStyleType: 'none',
  },

  link: {
    textDecorationLine: 'none',
  },
});

export interface ProductsProps {
  products: Product[];
  actions: Action[];
  LinkComponent?: JSX.ElementType;
  className?: string;
}

export function Products({
  products,
  actions,
  LinkComponent,
  className,
}: ProductsProps) {
  const styles = useStyles();

  return (
    <ul className={mergeClasses(styles.list, className)}>
      {products.map((product) => (
        <li className={styles.listItem} key={product.id}>
          {LinkComponent && (
            <LinkComponent
              className={styles.link}
              to={`${product.id}`}
              href={`${product.id}`}
            >
              <ProductCard product={product} actions={actions} />
            </LinkComponent>
          )}
          {!LinkComponent && (
            <ProductCard product={product} actions={actions} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default Products;
