import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  Text,
  typographyStyles,
} from '@fluentui/react-components';
import { CategoryType } from '@mono-catalog/types';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.padding(tokens.spacingHorizontalL),
  },
  list: {
    listStyleType: 'none',
    ...shorthands.margin(tokens.spacingHorizontalS),
    ...typographyStyles.body2,
  },
  title: { ...typographyStyles.subtitle1 },
  listItem: {
    overflowY: 'hidden',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ':hover a:not(.active)': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  link: {
    display: 'block',
    width: '100%',
    paddingTop: tokens.spacingHorizontalXS,
    paddingBottom: tokens.spacingHorizontalXS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    textDecorationLine: 'none',
    color: 'inherit',
    textOverflow: 'ellipsis',

    '&.active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
    },
  },
});

export interface CategoriesProps {
  categories: CategoryType[];
  className?: string;
}

export function Categories({ categories, className }: CategoriesProps) {
  const styles = useStyles();

  return (
    <aside className={mergeClasses(styles.root, className)}>
      <Text className={styles.title}>Categories</Text>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id} className={styles.listItem}>
            <NavLink to={category.name} className={styles.link}>
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Categories;
