// import { atom, useAtom } from 'jotai/index';
// import { useEffect } from 'react';
//
// const positionAtom = atom({ latitude: null, longitude: null });
// const [pinPositionAtom, setPinPositionAtom] = useAtom(positionAtom);
//
// export function PositionTest() {
//   // useEffect(() => {
//   //   async function get() {
//   //     await getGeolocation();
//   //     console.log('pinPosition:', pinPositionAtom);
//   //   }
//   //   get();
//   // }, []);
//
//   function getGeolocation(): void {
//     const options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0,
//     };
//
//     function success(pos: any) {
//       const crd = pos.coords;
//
//       console.log('Your current position is:');
//       console.log(`Latitude : ${crd.latitude}`);
//       console.log(`Longitude: ${crd.longitude}`);
//       console.log(`More or less ${crd.accuracy} meters.`);
//       setPinPositionAtom({ latitude: crd.latitude, longitude: crd.longitude });
//     }
//
//     function error(err: any) {
//       console.warn(`ERROR(${err.code}): ${err.message}`);
//     }
//
//     navigator.geolocation.getCurrentPosition(success, error, options);
//   }
// }
