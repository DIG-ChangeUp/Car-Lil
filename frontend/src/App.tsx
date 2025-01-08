import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import OneSignal from 'react-onesignal';

import { AuthProvider } from './components/AuthContext.tsx';

import OwnerTop from './pages/OwnerTop.tsx';
import Map from './pages/Map.tsx';
import Login from './pages/Login.tsx';
import OwnerSelectDay from './pages/OwnerSelectDay.tsx';
import NotFound from './pages/NotFound.tsx';
import OwnerSelectCar from './pages/OwnerSelectCar.tsx';
import OwnerSelectTime from './pages/OwnerSelectTime.tsx';
import SignUp from './pages/SignUp.tsx';
import OwnerCompleteShareData from './pages/OwnerCompleteShareData.tsx';
import OwnerCheckShareData from './pages/OwnerCheckShareData.tsx';
import { Provider } from 'jotai';
import { TimeBarSample } from './pages/TimeBarSample.tsx';
import Home from './pages/Home.tsx';
import TenantReservedList from './pages/TenantReservedList.tsx';
import TenantCheckRentalData from './pages/TenantCheckRentalData.tsx';
import { TenantEmptyData } from './pages/TenantEmptyData.tsx';
import TenantCompleteShareData from './pages/TenantCompleteShareData.tsx';

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
          <Route path="/ownerSelectCar" element={<OwnerSelectCar />} />
          <Route path="/ownerSelectDay" element={<OwnerSelectDay />} />
          <Route path="/ownerSelectTime" element={<OwnerSelectTime />} />
          <Route
            path="/ownerCheckShareData"
            element={<OwnerCheckShareData />}
          />
          <Route
            path="/ownerCompleteShareData"
            element={<OwnerCompleteShareData />}
          />
          {/*使われていないページ*/}
          <Route path="/ownerTop" element={<OwnerTop />} />
          <Route path="/timeBarSample" element={<TimeBarSample />} />

          {/*テナントページ*/}
          <Route path="/map" element={<Map />} />
          <Route
            path="/emptyData/:car_port_id/:share_car_id"
            element={<TenantEmptyData />}
          />
          <Route path="/reservedList" element={<TenantReservedList />} />
          <Route
            path="/tenantCheckRentalData"
            element={<TenantCheckRentalData />}
          />
          <Route
            path="/tenantCompleteShareData"
            element={<TenantCompleteShareData />}
          />
          {/*Not foundページ*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </AuthProvider>
  );
}
