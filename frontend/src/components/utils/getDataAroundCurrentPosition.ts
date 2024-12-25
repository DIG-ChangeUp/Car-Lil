//位置情報をサーバ側にPOSTでリクエスト、距離データが返る
type location = {
  latitude: number;
  longitude: number;
};
async function tempGetDataAroundCurrentPosition(position: location) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response: ResponseContents = await fetch('/api/distance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPosition: position }),
  });
  if (response.ok) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const jsonResponse = await response.json();
    return jsonResponse.data;
  }
}

export default tempGetDataAroundCurrentPosition;
