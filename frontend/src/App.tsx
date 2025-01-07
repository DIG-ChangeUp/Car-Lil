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
import SignUp from './pages/SignUp.tsx';
import OwnerCompleteShareData from './pages/OwnerCompleteShareData.tsx';
import OwnerCheckShareData from './pages/OwnerCheckShareData.tsx';
import { Provider } from 'jotai';
import { TimeBarSample } from './pages/TimeBarSample.tsx';
import Home from './pages/Home.tsx';
import ReservationList from './pages/ReservationList.tsx';
import TenantCheckRentalData from './pages/TenantCheckRentalData.tsx';
import { TenantEmptyData } from './pages/TenantEmptyData.tsx';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          {/*オーナーページ*/}
          <Route path="/ownerTop" element={<OwnerTop />} />
          <Route path="/calendar" element={<OwnerDateRegistration />} />
          <Route path="/selectTime" element={<OwnerSelectTime />} />
          <Route path="/ownerSelectCar" element={<OwnerSelectCar />} />
          <Route
            path="/ownerCheckShareData"
            element={<OwnerCheckShareData />}
          />
          <Route
            path="/ownerCompleteShareData"
            element={<OwnerCompleteShareData />}
          />
          {/*使われていないページ*/}
          <Route path="/ownerSelectMenu" element={<OwnerSelectMenu />} />
          <Route path="/calendar" element={<OwnerDateRegistration />} />
          <Route path="/selectTime" element={<OwnerSelectTime />} />
          <Route path="/timeBarSample" element={<TimeBarSample />} />

          {/*テナントページ*/}
          <Route path="/map" element={<Map />} />
          <Route path="/emptyData/:car_port_id/:share_car_id" element={<TenantEmptyData />} />
          <Route path="/reservationList" element={<ReservationList />} />
          <Route
            path="/tenantCheckRentalData"
            element={<TenantCheckRentalData />}
          />
          {/*Not foundページ*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </AuthProvider>
  );
}
