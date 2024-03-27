import { useParams } from 'react-router-dom';
import {
  makeStyles,
  shorthands,
  Spinner,
  Text,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { Categories } from '@mono-catalog/categories';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import {
  getCategories,
  selectAllCategories,
  selectCategoriesStatus,
} from '../store/categoriesStore';
import ProductsContainer from '../features/products';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: '1fr',
    gridColumnGap: '32px',
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

function Homepage() {
  const styles = useStyles();

  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const status = useSelector(selectCategoriesStatus);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const isLoading = status === 'loading';

  const { category } = useParams();

  return (
    <>
      {isLoading && <Spinner className={styles.spinner} />}
      {!isLoading && (
        <div className={styles.root}>
          <Categories
            categories={categories}
            className={styles.categories}
            linkFormatter={(link) => `/${link}`}
          />
          <main className={styles.main}>
            <Text as="h1" className={styles.title}>
              {category || 'All'}
            </Text>
            <ProductsContainer category={category} />
          </main>
        </div>
      )}
    </>
  );
}

export default Homepage;
