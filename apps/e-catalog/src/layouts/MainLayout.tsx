import { Header } from '@mono-catalog/header';
import { Footer } from '@mono-catalog/footer';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

import AddProductButtonContainer from '../features/products/AddProductButtonContainer';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    ...shorthands.margin(tokens.spacingVerticalXXL),
  },
});

interface MainLayoutProps {
  children?: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header logo="E-Catalog">
        <AddProductButtonContainer />
      </Header>
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer logo="E-Catalog" />
    </div>
  );
}

export default MainLayout;
