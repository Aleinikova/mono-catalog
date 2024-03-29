import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalXXL),
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export interface HeaderProps {
  Logo: JSX.ElementType;
  children?: React.ReactNode;
  className?: string;
}

export function Header({ Logo, children, className }: HeaderProps) {
  const styles = useStyles();

  return (
    <header className={mergeClasses(styles.root, className)}>
      <Logo />
      {children}
    </header>
  );
}

export default Header;
