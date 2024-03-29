import {
  makeStyles,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { Footer } from '@mono-catalog/footer';
import { Header } from '@mono-catalog/header';
import { Link, Outlet } from 'react-router-dom';

import AddProductButtonContainer from '../features/products/AddProductButtonContainer';

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
  logo: {
    ...typographyStyles.title3,
    color: tokens.colorCompoundBrandBackground,
  },
  link: {
    textDecorationLine: 'none',
  },
});

interface MainLayoutProps {
  children?: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header
        Logo={() => (
          <Link className={styles.link} to="/">
            <div className={styles.logo}>E-catalog</div>
          </Link>
        )}
      >
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
