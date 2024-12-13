import { Routes, Route } from "react-router-dom";
// import { Provider } from "jotai";

import TestView from "./components/TestView.jsx";

export default function AppRoutes() {
  return (
      // <Provider>
        <Routes>
          <Route path="/" element={<TestView />} />
        </Routes>
      // </Provider>
  );
}
