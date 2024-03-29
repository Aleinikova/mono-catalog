import {
  Divider,
  Text,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalXXL),
    backgroundColor: tokens.colorBrandBackground4Static,
    color: tokens.colorBrandBackgroundInverted,
    minHeight: '200px',
  },
  logo: {
    ...typographyStyles.title3,
  },
  divider: {
    marginTop: 'auto',
    flexGrow: 0,
    marginBottom: tokens.spacingVerticalS,
  },
  caption: {
    ...typographyStyles.caption1,
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: '0.8',
  },
});

export interface FooterProps {
  logo: string;
  className?: string;
}

export function Footer({ logo, className }: FooterProps) {
  const styles = useStyles();

  return (
    <div className={mergeClasses(styles.root, className)}>
      <Text className={styles.logo}>{logo}</Text>
      <Divider className={styles.divider} />
      <Text as="span" className={styles.caption}>
        © 2024 made by Waleria Mogilewicz
      </Text>
    </div>
  );
}

export default Footer;
