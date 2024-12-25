import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import OneSignal from 'react-onesignal';

import { OwnerSelectMenu } from './components/OwnerSelectMenu.tsx';
import { AuthProvider } from './components/AuthContext.tsx';

import OwnerTop from './pages/OwnerTop.tsx';
import Map from './pages/Map.tsx';
import Login from './pages/Login.tsx';
import OwnerDateRegistration from './pages/OwnerDateRegistration.tsx';
import NotFound from './pages/NotFound.tsx';
import OwnerSelectCar from './pages/OwnerSelectCar.tsx';
import SampleCalendar from './pages/SampleCalendar.tsx';
import OwnerSelectTime from './pages/OwnerSelectTime.tsx';
import NewSignUp from './pages/SignUp.tsx';
import OwnerRegistrationCompleted from './pages/OwnerRegistrationCompleted.tsx';
import OwnerConfirmation from './pages/OwnerConfirmation.tsx';
import { Provider } from 'jotai';
import { TimeBarSample } from './pages/TimeBarSample.tsx';
import SelectUserOrOwner from './pages/SelectUserOrOwner.tsx';

export default function App() {
  useEffect(() => {
    (async () => {
      await OneSignal.init({
        appId: import.meta.env.VITE_ONESIGNAL_API_KEY,
      });
    })();
  }, []);

  return (
    <AuthProvider>
      <Provider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<NewSignUp />} />
          <Route path="/map" element={<Map />} />
          <Route path="/ownerTop" element={<OwnerTop />} />
          <Route path="/selectUserType" element={<SelectUserOrOwner />} />
          <Route path="/ownerSelectCar" element={<OwnerSelectCar />} />
          <Route path="/ownerSelectMenu" element={<OwnerSelectMenu />} />
          <Route path="/ownerConfirmation" element={<OwnerConfirmation />} />
          <Route
            path="/ownerRegistrationCompleted"
            element={<OwnerRegistrationCompleted />}
          />
          <Route path="/calendar" element={<OwnerDateRegistration />} />
          <Route path="/selectTime" element={<OwnerSelectTime />} />
          <Route path="/sample" element={<SampleCalendar />} />
          <Route path="/timeBarSample" element={<TimeBarSample />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </AuthProvider>
  );
}
