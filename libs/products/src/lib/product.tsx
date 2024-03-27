import {
  makeStyles,
  Card,
  CardPreview,
  Text,
  typographyStyles,
  tokens,
} from '@fluentui/react-components';
import { Action, ProductType } from '@mono-catalog/types';
import ProductMenu from './productMenu';
import { currencyFormatter } from '@mono-catalog/currency-formatter';

const useStyles = makeStyles({
  card: {},
  preview: {
    height: '200px',
  },
  img: {
    objectFit: 'contain',
  },
  title: {
    marginBottom: tokens.spacingVerticalS,
    ...typographyStyles.subtitle2,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  availability: {
    ...typographyStyles.body1,
  },
  price: {
    display: 'block',
    textAlign: 'center',
    ...typographyStyles.subtitle2,
  },
  menu: {
    marginLeft: 'auto',
    minWidth: '24px',
    width: '24px',
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export interface ProductProps {
  product: ProductType;
  actions: Action[];
}

export function Product({ product, actions }: ProductProps) {
  const styles = useStyles();

  // TODO: create util

  return (
    <Card className={styles.card}>
      <ProductMenu
        className={styles.menu}
        actions={actions}
        productId={product.id}
      />
      <CardPreview className={styles.preview}>
        <img
          className={styles.img}
          src={
            product.imageUrl ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
          }
          alt="Preview of a Word document: About Us - Overview"
        />
      </CardPreview>
      <div className={styles.row}>
        <Text as="h2" className={styles.title}>
          {product.name}
        </Text>
        <Text className={styles.availability}>({product.inventory})</Text>
      </div>
      <Text as="h2" className={styles.price}>
        {currencyFormatter(+product.price, product.currency)}
      </Text>
    </Card>
  );
}

export default Product;
