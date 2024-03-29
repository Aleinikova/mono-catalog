import {
  Card,
  CardPreview,
  Text,
  makeStyles,
  mergeClasses,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { currencyFormatter } from '@mono-catalog/currency-formatter';
import { Action, Product } from '@mono-catalog/types';
import { useState } from 'react';

import ProductMenu from './productMenu';

const DEFAULT_IMG_SRC =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

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
  product: Product;
  actions: Action[];
  className?: string;
}

export function ProductCard({ product, actions, className }: ProductProps) {
  const [imageSrc, setImageSrc] = useState(product.imageUrl || DEFAULT_IMG_SRC);
  const styles = useStyles();

  return (
    <Card
      className={mergeClasses(styles.card, className)}
      data-testid={`product-${product.id}`}
    >
      <ProductMenu
        className={styles.menu}
        actions={actions}
        productId={product.id}
      />
      <CardPreview className={styles.preview}>
        <img
          className={styles.img}
          src={imageSrc}
          alt="Preview of a Word document: About Us - Overview"
          onError={() => setImageSrc(DEFAULT_IMG_SRC)}
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

export default ProductCard;
