import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

import { useEffect } from 'react';

const ReservationList = () => {
  useEffect(() => {
    function getReservationData() {
      console.log('aaaa');
    }

    getReservationData();
  }, []);

  return (
    <>
      <Header />

      <Footer isOwnerMode={false} activeMenu={0} />
    </>
  );
};

export default ReservationList;
