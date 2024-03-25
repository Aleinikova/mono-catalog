import {
  makeStyles,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';

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
});

export interface HeaderProps {
  logo: string;
  children?: React.ReactNode;
}

export function Header({ logo, children }: HeaderProps) {
  const styles = useStyles();

  return (
    <header className={styles.root}>
      <div className={styles.logo}>{logo}</div>
      {children}
    </header>
  );
}

export default Header;
