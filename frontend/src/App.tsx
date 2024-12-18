import { Routes, Route } from 'react-router-dom';
import { OwnerSelectMenu } from './components/OwnerSelectMenu.tsx';
import OwnerTop from './pages/OwnerTop.tsx';
import SignUp from './pages/SignUp.tsx';
import Home from './pages/Home.tsx';
import { AuthProvider } from './components/AuthContext.tsx';
import NewLogin from './pages/NewLogin.tsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<NewLogin />} />
        <Route path="/ownerTop" element={<OwnerTop />} />
        <Route path="/ownerSelectMenu" element={<OwnerSelectMenu />} />
      </Routes>
    </AuthProvider>
  );
}
