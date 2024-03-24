import {
  makeStyles,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
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
}

export function Header({ logo }: HeaderProps) {
  const styles = useStyles();

  return (
    <header className={styles.root}>
      <div className={styles.logo}>{logo}</div>
    </header>
  );
}

export default Header;
