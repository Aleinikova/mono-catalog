import {
  Text,
  makeStyles,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { useParams } from 'react-router-dom';

import CategoriesContainer from '../features/categories';
import ProductsContainer from '../features/products';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: '1fr',
    gridColumnGap: tokens.spacingHorizontalXXXL,
    gridRowGap: '0px',
  },
  categories: {
    ...shorthands.gridArea(1, 1, 1, 4),
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gridArea(1, 4, 1, 13),
  },
  spinner: {
    height: '100%',
  },
  title: {
    display: 'block',
    marginBottom: tokens.spacingVerticalXXL,
    ...typographyStyles.largeTitle,
  },
});

function Products() {
  const styles = useStyles();

  const { category } = useParams();

  return (
    <div className={styles.root}>
      <CategoriesContainer className={styles.categories} />
      {category && (
        <main className={styles.main}>
          <Text as="h1" className={styles.title}>
            {category}
          </Text>
          <ProductsContainer category={category} />
        </main>
      )}
    </div>
  );
}

export default Products;
