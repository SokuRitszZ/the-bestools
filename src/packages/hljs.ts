import hljs from 'highlight.js';

// languages 
import cpp from 'highlight.js/lib/languages/cpp';
import ts from 'highlight.js/lib/languages/typescript';
import rust from 'highlight.js/lib/languages/rust';
import { entriesIn } from 'lodash';
import 'highlight.js/styles/atom-one-dark.min.css';

const ENTRIES_MAP = { cpp, ts, rust };

entriesIn(ENTRIES_MAP).map(([key, fn]) => {
  hljs.registerLanguage(key, fn);
});

console.log('import');

export { hljs };