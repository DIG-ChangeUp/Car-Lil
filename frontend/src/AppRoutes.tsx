import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import { Provider } from "jotai";

import TestView from './components/TestView.tsx';

export default function AppRoutes() {
  return (
    // <Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestView />} />
      </Routes>
    </BrowserRouter>
    // </Provider>
  );
}
