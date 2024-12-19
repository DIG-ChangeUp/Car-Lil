import { Routes, Route } from 'react-router-dom';
import { OwnerSelectMenu } from './components/OwnerSelectMenu.tsx';
import OwnerTop from './pages/OwnerTop.tsx';
import SignUp from './pages/SignUp.tsx';
import Home from './pages/Home.tsx';
import { AuthProvider } from './components/AuthContext.tsx';
import NewLogin from './pages/NewLogin.tsx';
import OwnerSelectCar from './pages/OwnerSelectCar.tsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<NewLogin />} />
        <Route path="/ownerTop" element={<OwnerTop />} />
        <Route path="/ownerSelectCar" element={<OwnerSelectCar />} />
        <Route path="/ownerSelectMenu" element={<OwnerSelectMenu />} />
      </Routes>
    </AuthProvider>
  );
}
