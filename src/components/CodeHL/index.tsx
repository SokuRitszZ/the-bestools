import { useEffect, useState } from 'react';

import { hljs } from '@/packages/hljs';

import 'highlight.js/styles/github.css';

interface Props {
  language: string;
  text: string;
}

export const CodeHL = ({ text, language }: Props) => {
  const [rawHtml, setRawHtml] = useState('');
  useEffect(() => {
    try {
      const el = hljs.highlight(text, { language: language || 'text' });
      setRawHtml(el.value);
    }
    catch {}
  }, [text, language]);

  return (
    <code dangerouslySetInnerHTML={{ __html: rawHtml }} />
  );
};