import { Header } from '@mono-catalog/header';
import { Footer } from '@mono-catalog/footer';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  main: {
    flexGrow: 1,
    ...shorthands.margin(tokens.spacingVerticalXXL),
  },
});

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header logo="E-Catalog" />
      <main className={styles.main}>{children}</main>
      <Footer logo="E-Catalog" />
    </div>
  );
}

export default MainLayout;
