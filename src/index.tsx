import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import 'virtual:uno.css';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(<App />);
}
