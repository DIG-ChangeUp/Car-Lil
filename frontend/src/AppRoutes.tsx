import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UIProvider } from "@yamada-ui/react"

// import { Provider } from "jotai";

import { OwnerSelectMenu } from './components/OwnerSelectMenu.tsx';
import OwnerTop from './pages/OwnerTop.tsx';

export default function AppRoutes() {
  return (
    // <Provider>
    <BrowserRouter>
      <UIProvider>
        <Routes>
          <Route path="/ownerTop" element={<OwnerTop />} />
          <Route path="/ownerSelectMenu" element={<OwnerSelectMenu />} />
        </Routes>
        </UIProvider>
    </BrowserRouter>
    // </Provider>
  );
}
