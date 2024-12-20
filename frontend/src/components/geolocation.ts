type position = {
  latitude: number;
  longitude: number;
};
export const getGeolocation = (): position => {
  const resultPosition = { latitude: 35.1704882, longitude: 136.8851653 };
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function success(pos) {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    resultPosition.latitude = crd.latitude;
    resultPosition.longitude = crd.longitude;
    console.log('resultPosition: ', resultPosition);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  return resultPosition;
};
