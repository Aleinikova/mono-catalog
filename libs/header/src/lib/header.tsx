import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalXXL),
    backgroundColor: tokens.colorNeutralBackground1,
  },
  logo: {
    ...typographyStyles.title3,
    color: tokens.colorCompoundBrandBackground,
  },
  link: {
    textDecorationLine: 'none',
  },
});

export interface HeaderProps {
  logo: string;
  children?: React.ReactNode;
  className?: string;
}

export function Header({ logo, children, className }: HeaderProps) {
  const styles = useStyles();

  return (
    <header className={mergeClasses(styles.root, className)}>
      <Link className={styles.link} to="/">
        <div className={styles.logo}>{logo}</div>
      </Link>
      {children}
    </header>
  );
}

export default Header;
