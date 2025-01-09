import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UIProvider } from '@yamada-ui/react';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UIProvider>
  </StrictMode>
);
