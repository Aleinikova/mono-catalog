import {
  makeStyles,
  shorthands,
  Card,
  CardPreview,
  Text,
  typographyStyles,
  tokens,
} from '@fluentui/react-components';
import { ProductType } from '@mono-catalog/types';

const useStyles = makeStyles({
  card: {},
  preview: {
    height: '200px',
    ...shorthands.padding(tokens.spacingHorizontalM),
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
});

export interface ProductProps {
  product: ProductType;
}

export function Product({ product }: ProductProps) {
  const styles = useStyles();

  // TODO: create util
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Card className={styles.card}>
      <CardPreview className={styles.preview}>
        <img
          className={styles.img}
          src={product.imageUrl}
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
        {formatter.format(+product.price)}
      </Text>
    </Card>
  );
}

export default Product;
