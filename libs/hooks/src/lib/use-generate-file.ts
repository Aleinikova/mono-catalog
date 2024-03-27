import { useEffect, useState } from 'react';

const TEMPLATE_CHOOSER_LINK =
  'https://template-chooser-embedded.officeatwork.com';

export function useGenerateFile(template: string): {
  iframeLink: string | null;
  downloadFile: () => void;
  generateIframeLink: (customXmlPart: string) => void;
  error: string | null;
  fileName?: string;
  isGenerated?: boolean;
} {
  const [isGenerated, setIsGenerated] = useState(false);
  const [iframeLink, setIframeLink] = useState<string | null>(null);
  const [resultFile, setResultFile] = useState<{
    fileName: string;
    blob: Blob;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateIframeLink = (customXmlPart: string) => {
    setResultFile(null);
    setIframeLink(null);

    const xmlBAse64 = window.btoa(
      JSON.stringify([
        {
          type: 'customxmlpart',
          base64Xml: window.btoa(unescape(encodeURIComponent(customXmlPart))),
        },
      ])
    );

    setIframeLink(
      `${TEMPLATE_CHOOSER_LINK}/#template=${template}&inject=${xmlBAse64}`
    );
  };

  const downloadFile = () => {
    if (!resultFile) {
      return;
    }

    const url = window.URL.createObjectURL(new Blob([resultFile.blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', resultFile.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!TEMPLATE_CHOOSER_LINK.includes(event.origin)) {
        return;
      }

      if (event.data) {
        switch (event.data.type) {
          case 'template-chooser-error': {
            setError(
              `Error when creating document, error detail: <pre><code>${JSON.stringify(
                event.data.error,
                null,
                4
              )}`
            );
            break;
          }
          case 'template-chooser-document-created': {
            const { blob, fileName } = event.data;

            setResultFile({
              fileName,
              blob,
            });
            setIsGenerated(true);
            break;
          }
        }
      }
    };
    window.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return {
    iframeLink,
    generateIframeLink,
    downloadFile,
    error,
    fileName: resultFile?.fileName,
    isGenerated,
  };
}
