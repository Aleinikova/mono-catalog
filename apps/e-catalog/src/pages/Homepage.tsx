import MainLayout from '../layouts/MainLayout';
import { Outlet } from 'react-router-dom';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Categories } from '@mono-catalog/categories';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CategoryType } from '@mono-catalog/types';

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

  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios('categories.json');

        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCategories();
  }, []);

  return (
    <MainLayout>
      <div className={styles.root}>
        <Categories categories={categories} className={styles.categories} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </MainLayout>
  );
}

export default Homepage;
