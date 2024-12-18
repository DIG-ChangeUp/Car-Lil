import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UIProvider } from "@yamada-ui/react"

// import { Provider } from "jotai";

import TestView from './components/TestView.tsx';
import { OwnerSelectMenu } from './components/OwnerSelectMenu.tsx';

export default function AppRoutes() {
  return (
    // <Provider>
    <BrowserRouter>
      <UIProvider>
        <Routes>
          <Route path="/" element={<TestView />} />
          <Route path="/ownerInput" element={<OwnerSelectMenu />} />
        </Routes>
        </UIProvider>
    </BrowserRouter>
    // </Provider>
  );
}
