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
import OwnerSelectTime from './pages/OwnerSelectTime.tsx';
import NewSignUp from './pages/SignUp.tsx';
import OwnerRegistrationCompleted from './pages/OwnerRegistrationCompleted.tsx';
import OwnerConfirmation from './pages/OwnerConfirmation.tsx';
import { Provider } from 'jotai';
import { TimeBarSample } from './pages/TimeBarSample.tsx';
import SelectUserOrOwner from './pages/SelectUserOrOwner.tsx';
import DemoSelectCar from './pages/DemoSelectCar.tsx';
import ReservationList from './pages/ReservationList.tsx';
import { UserCheckReservationAvailability } from './pages/UserCheckReservationAvailability.tsx';
import TenantConfirmReservation from './pages/TenantConfirmReservation.tsx';

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
          {/*共通ページ*/}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<NewSignUp />} />
          <Route path="/selectUserType" element={<SelectUserOrOwner />} />
          {/*オーナーページ*/}
          <Route path="/ownerTop" element={<OwnerTop />} />
          <Route path="/demoSelectCar" element={<DemoSelectCar />} />
          <Route path="/calendar" element={<OwnerDateRegistration />} />
          <Route path="/selectTime" element={<OwnerSelectTime />} />
          <Route path="/ownerSelectCar" element={<OwnerSelectCar />} />
          <Route path="/ownerConfirmation" element={<OwnerConfirmation />} />
          <Route
            path="/ownerRegistrationCompleted"
            element={<OwnerRegistrationCompleted />}
          />
          {/*使われていないページ*/}
          <Route path="/ownerSelectMenu" element={<OwnerSelectMenu />} />
          <Route path="/calendar" element={<OwnerDateRegistration />} />
          <Route path="/selectTime" element={<OwnerSelectTime />} />
          <Route path="/timeBarSample" element={<TimeBarSample />} />
          <Route
            path="/checkReservationAvailability"
            element={<UserCheckReservationAvailability />}
          />
          {/*テナントページ*/}
          <Route path="/map" element={<Map />} />
          <Route path="/reservationList" element={<ReservationList />} />
          <Route
            path="/tenantConfirmReservation"
            element={<TenantConfirmReservation />}
          />
          {/*Not foundページ*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </AuthProvider>
  );
}
