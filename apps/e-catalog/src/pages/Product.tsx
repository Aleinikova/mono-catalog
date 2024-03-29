import {
  Button,
  Spinner,
  Text,
  makeStyles,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { currencyFormatter } from '@mono-catalog/currency-formatter';
import { useGenerateFile } from '@mono-catalog/useGenerateFile';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../store';
import { selectCategoryById } from '../store/categoriesStore';
import {
  selectProductById,
  selectProductsStatus,
} from '../store/productsStore';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: '1fr',
    gridColumnGap: tokens.spacingHorizontalXXXL,
    gridRowGap: '0px',
  },
  photo: {
    ...shorthands.gridArea(1, 1, 2, 6),
  },
  img: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'contain',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gridArea(1, 1, 1, 13),
  },
  iframeContainer: {
    ...shorthands.gridArea(2, 1, 2, 13),
  },
  spinner: {
    height: '100%',
  },
  title: {
    display: 'block',
    marginBottom: tokens.spacingVerticalXXL,
    ...typographyStyles.largeTitle,
  },
  keyValueRow: {
    display: 'flex',
    marginBottom: tokens.spacingVerticalXXL,
  },
  key: {
    display: 'block',
    marginRight: tokens.spacingHorizontalXS,
    ...typographyStyles.body1Strong,
  },
  value: {
    display: 'block',
    ...typographyStyles.body1,
  },
  iframe: {
    height: '100%',
    width: '100%',
    minHeight: '600px',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: '2fr',
    gridColumnGap: tokens.spacingHorizontalXXXL,
    gridRowGap: tokens.spacingVerticalL,
    ...shorthands.gridArea(1, 6, 1, 13),
  },
  button: {
    marginBottom: tokens.spacingVerticalS,
  },
});

function Product() {
  const styles = useStyles();

  const { productId } = useParams();

  const product = useSelector((state: RootState) =>
    productId ? selectProductById(state, productId) : null
  );

  const status = useSelector(selectProductsStatus);

  const category = useSelector((state: RootState) =>
    product?.categoryId ? selectCategoryById(state, product?.categoryId) : null
  );

  const iframeContainer = useRef<HTMLIFrameElement | null>(null);

  const isLoading = status === 'loading' || status === 'idle';

  const {
    generateIframeLink,
    iframeLink,
    downloadFile,
    fileName,
    isGenerated,
    iframeKey,
  } = useGenerateFile();

  const generateXML = () => {
    if (!product) {
      return;
    }

    const description = category?.fields?.map(
      (field) =>
        `${field.title}: ${
          field.type === 'select'
            ? field.options?.find((option) => option.id === product[field.name])
                ?.text
            : product[field.name] || '-'
        }`
    );

    const xmlContent = `
    <Name>${product.name}</Name>
    <Price>${product.price} ${product.currency}</Price>
    <Inventory>${product.inventory}</Inventory>
    <Description>${description?.join(';  ') || '-'}</Description>
    `;

    const finalXML = `<CustomXmlPart xmlns="http://schemas.officeatwork.com/2024/product">${xmlContent}</CustomXmlPart>`;

    generateIframeLink(finalXML);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <div>Not found</div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        <img
          className={styles.img}
          src={
            product?.imageUrl ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
          }
          alt="product"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <Text className={styles.title}>{product.name}</Text>
          <div className={styles.keyValueRow}>
            <Text className={styles.key}>Category:</Text>
            <Text className={styles.value}>{category?.name || 'Unknown'}</Text>
          </div>
          <div className={styles.keyValueRow}>
            <Text className={styles.key}>Inventory:</Text>
            <Text className={styles.value}>{product.inventory}</Text>
          </div>
          <div className={styles.keyValueRow}>
            <Text className={styles.key}>Price:</Text>
            <Text className={styles.value}>
              {currencyFormatter(+product.price, product.currency)}
            </Text>
          </div>
          {category?.fields &&
            category?.fields.map((field) => (
              <div className={styles.keyValueRow} key={field.name}>
                <Text className={styles.key}>{field.title}:</Text>
                <Text className={styles.value}>
                  {field.type === 'select'
                    ? field.options?.find(
                        (option) => option.id === product[field.name]
                      )?.text
                    : product[field.name] || '-'}
                </Text>
              </div>
            ))}
          <Button className={styles.button} onClick={generateXML}>
            Generate Document
          </Button>
          {isGenerated && (
            <Button
              appearance="primary"
              onClick={downloadFile}
            >{`Download ${fileName}`}</Button>
          )}
        </div>
        <div className={styles.iframeContainer} ref={iframeContainer}>
          {iframeLink && (
            <iframe
              className={styles.iframe}
              title="OfficeAtWorkTemplateChooser"
              src={iframeLink}
              key={iframeKey}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
