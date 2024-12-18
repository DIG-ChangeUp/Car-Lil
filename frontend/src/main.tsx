import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { extendTheme, UIProvider, UIStyle } from '@yamada-ui/react';
import App from './App.tsx';

const globalStyle: UIStyle = {
  body: {
    fontFamily: 'Noto Sans JP',
  },
};
const customTheme = extendTheme({ styles: { globalStyle } })();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider theme={customTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UIProvider>
  </StrictMode>
);
