import MainLayout from '../layouts/MainLayout';
import { Outlet } from 'react-router-dom';
import { makeStyles, shorthands, Spinner } from '@fluentui/react-components';
import { Categories } from '@mono-catalog/categories';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import {
  getCategories,
  selectAllCategories,
  selectCategoriesStatus,
} from '../store/categoriesStore';

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
    ...shorthands.gridArea(1, 4, 1, 13),
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

  return (
    <MainLayout>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles.root}>
          <Categories categories={categories} className={styles.categories} />
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      )}
    </MainLayout>
  );
}

export default Homepage;
