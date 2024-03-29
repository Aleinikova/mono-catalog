import { Spinner, makeStyles, mergeClasses } from '@fluentui/react-components';
import { Categories } from '@mono-catalog/categories';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store';
import {
  getCategories,
  selectAllCategories,
  selectCategoriesStatus,
} from '../../store/categoriesStore';

const useStyles = makeStyles({
  categories: {},
  spinner: {
    height: '100%',
  },
});

interface CategoriesContainerProps {
  className?: string;
}

function CategoriesContainer({ className }: CategoriesContainerProps) {
  const styles = useStyles();

  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const status = useSelector(selectCategoriesStatus);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const isLoading = status === 'loading';

  return (
    <>
      {isLoading && <Spinner className={styles.spinner} />}
      {!isLoading && (
        <Categories
          categories={categories}
          className={mergeClasses(styles.categories, className)}
          linkFormatter={(link) => `/${link}`}
        />
      )}
    </>
  );
}

export default CategoriesContainer;
