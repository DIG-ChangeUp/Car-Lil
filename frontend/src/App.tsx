import { Routes, Route } from 'react-router-dom';
import { OwnerSelectMenu } from './components/OwnerSelectMenu.tsx';
import OwnerTop from './pages/OwnerTop.tsx';
import Home from './pages/Home.tsx';
import { AuthProvider } from './components/AuthContext.tsx';
import NewLogin from './pages/NewLogin.tsx';
import OwnerDateRegistration from './pages/OwnerDateRegistration.tsx';
import NotFound from './pages/NotFound.tsx';
import OwnerSelectCar from './pages/OwnerSelectCar.tsx';
import SampleCalendar from './pages/SampleCalendar.tsx';
import OwnerSelectTime from './pages/OwnerSelectTime.tsx';
import NewSignUp from './pages/NewSignUp.tsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<NewSignUp />} />
        <Route path="/login" element={<NewLogin />} />
        <Route path="/ownerTop" element={<OwnerTop />} />
        <Route path="/ownerSelectCar" element={<OwnerSelectCar />} />
        <Route path="/ownerSelectMenu" element={<OwnerSelectMenu />} />
        <Route path="/calendar" element={<OwnerDateRegistration />} />
        <Route path="/selectTime" element={<OwnerSelectTime />} />
        <Route path="/sample" element={<SampleCalendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
