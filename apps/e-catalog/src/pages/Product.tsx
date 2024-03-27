import { useRef } from 'react';
import { useSelector } from 'react-redux';

import {
  Button,
  makeStyles,
  shorthands,
  Spinner,
  Text,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';

import { RootState } from '../store';
import { selectCategoryById } from '../store/categoriesStore';
import { useParams } from 'react-router-dom';
import {
  selectProductById,
  selectProductsStatus,
} from '../store/productsStore';
import { currencyFormatter } from '@mono-catalog/currency-formatter';
import { useGenerateFile } from '@mono-catalog/useGenerateFile';

const TEMPLATE_BASE64 =
  'VTJGc2RHVmtYMThxaWVSSWtpS29nRG5lWEFoWDl0dHFDdHVtSU40SXBTZWZPbkJVdTNzNlhFNlJyYnZUVU9UbjlDVjFpS0FRa3kzcjBUYzNTNmVGeG5DT2FHVjdHRi9KSk9KNThIYTFYeDNTb2czakpVM2EzM0pyVUZoSlFRY2dzZkNLRmhkZ0FSSGRscGlEVVNQQUpML2JxTTM1RHRPeWNERy9ML0dCM0dWTThpcDJ2Q1piS1Y0L091b29KeVdYT1JyUi8yeXQvSzYxdUxzRUtRY0VTS2hMUEIxeldMQ0xkb1N4dEVodmIrWU9lT0dST2hUTTlLdG00TG9aQnlxbzNYdVNERTdVL1RlbDFDL3g4VUhjSE00RWxMbVpDazNwNXJCTndvOXdGQlVkWkNkODNKaGVsU3ZLSWpkVGxOUjRjc05qSWUrOWFiTm43NDNvbWNLNWlLTCtQZEZOY1NsUG5GODIybFEvdWZXYmxUcVFLUzFZNXE0SmEzVHNHZzZEVEdKbkcvTUc1V0NsWUJoS3hnQ0Mrd2EvMGxLZ2gyWDBUK0paeGVLWjl4d0xncFYwRUVlTU5rRFlqRitJcEN4YnF4UlY3cmVwOHdvRng4RVpMMzNDZHFULzZHenk5UnR4dGVqWXdpRndGL0hJNi9JbTV6U2RLUnF5RWNDM2pNQklqVXdGZFlad1UrdnR6d1ovU2daWGxqR1B6MDUrOTM4WVBxcHBFWmkzUThtM2NMbjBQQmJzTkROV3FWKzZZN3oyd1VJTjZKcVNRM1BpdjhTa1NpM283VHh5dmp4Z2xGQWVCSk5oT0ZxSUxoeDNjdGVmdjF1aEJFaU1zK1dSNnJxMXlacUNLWjhVNkk5ZFFGVXNVSjNOTlBOakxXOU1QTzVvT24ySTAvRGRkYlRnYzBpcVFNOEJtY2M5T1l6SEFnODRKYkVQVzJUWGl6dVFqVFFJbEhkMHNNclY3UDV5Y0MyUG93TzRRSEhaQ0dxN0hsbmN6by9LK2h4UE1tMmZGZG1KaERpMHZ5VWlNbStPSkRIK1NGOVgxdlQ4NTR6ZlBKMlRGZERBSkUzNnBjS2d1Z2dWRWc3VndVNURoYlFCUlNPYytCeERlSlIzdDA0MXdwZXBmeUViZ014RzBDb1hIbklnMVJ3ZEQ0ZXJkRjJhQ0E4ZDlCZkpIL1AzYS8zSlBTYWxUNmVnVlptMTdLcExxMFVMZ3U4bFFkeCtVT0NEeFRpOURPbnJmRHZFTGszWkxoOUpqdUd2MWFVcWNDR0FlWTlWZkVmWUQ5MzIvcVdvZmhzM0oxL25nSWl0TGNSOXRiK2xGR0wxU1pDbEpMMD0';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: '1fr',
    gridColumnGap: '32px',
    gridRowGap: '0px',
  },
  photo: {
    ...shorthands.gridArea(1, 1, 2, 6),
  },
  img: {
    width: '100%',
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
    gridColumnGap: '32px',
    gridRowGap: '16px',
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
  } = useGenerateFile(TEMPLATE_BASE64);

  const generateXML = () => {
    if (!product) {
      return;
    }

    const description = category?.fields?.map(
      (filed) => `${filed.title}: ${product[filed.name] || '-'}`
    );

    const xmlContent = `
    <Name>${product.name}</Name>
    <Price>${product.price} ${product.currency}</Price>
    <Inventory>${product.inventory}</Inventory>
    <Description>${description?.join(';  ') || ''}</Description>
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
                  {product[field.name] || '-'}
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
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
