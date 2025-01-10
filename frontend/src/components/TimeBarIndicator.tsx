import {useEffect,useState} from "react";

import {Center, For, Grid, GridItem} from "@yamada-ui/react";

export interface ITimeZone {
  strTime: string;
  endTime: string;
}

interface props {
  ownerRentalTime:ITimeZone | null | undefined;
  bookingTime:ITimeZone[] | undefined;
}

const colCodeNormal = '#DDD';
const colCodeNG = '#F1AAAA';
const colCodeOK = '#AADCF1';
const countBars = 48;
const aryClockAM:string[] = ['00','01','02','03','04','05','06','07','08','09','10','11'];
const aryClockPM:string[] = ['12','13','14','15','16','17','18','19','20','21','22','23'];

export function TimeBarIndicator(props:props) {


  const [aryTimeAM, setAryTimeAM] = useState<string[]>([...Array(countBars)].map(() => colCodeNormal));
  const [aryTimePM, setAryTimePM] = useState<string[]>([...Array(countBars)].map(() => colCodeNormal));

  useEffect(() => {
    let _arySetTime:string[] = aryTimeAM.concat(aryTimePM);

    if(props.ownerRentalTime !== null && props.ownerRentalTime !== undefined) {
      _arySetTime = setBarColor(_arySetTime, props.ownerRentalTime, colCodeOK);
    }

    if(props.bookingTime !== undefined){
      if(props.bookingTime.length !== 0) {
        props.bookingTime.forEach((timeZone) => {
          _arySetTime = setBarColor(_arySetTime, timeZone, colCodeNG);
        });
      }
    }

    setAryTimeAM(_arySetTime.slice(0, countBars));
    setAryTimePM(_arySetTime.slice(countBars, countBars * 2));

  }, [props.bookingTime, props.ownerRentalTime]);

  function setBarColor(targetAry:string[] ,targetTimoZone:ITimeZone, colCode:string) {

    const _srtHours = Number(targetTimoZone.strTime.split(':')[0]);
    const _strMinutes = Number(targetTimoZone.strTime.split(':')[1]);
    const _strIndex = _strMinutes / 15 + (_srtHours * 4);

    const _endHours = Number(targetTimoZone.endTime.split(':')[0]);
    const _endMinutes = Number(targetTimoZone.endTime.split(':')[1]);
    const _endIndex = _endMinutes / 15 + (_endHours * 4);

    for (let i = 0; i < targetAry.length; i++) {
      if(_strIndex <= i && i < _endIndex){
        targetAry[i] = colCode;
      }
    }

    return targetAry;
  }

  return (
    <>
      {/* AM time bar indicator */}
      <Grid templateColumns="repeat(48, 1fr)" gap="2px" ml={"2px"} mr={"2px"}>
        <For each={aryTimeAM}>
          {(bg, index) => (
            <GridItem key={index} w="full" h="18px" rounded="sm" bg={bg}/>
          )}
        </For>
      </Grid>
      <Grid templateColumns="repeat(12, 1fr)" gap="0" mb={"12px"}>
        <For each={aryClockAM}>
          {(bg, index) => (
            <GridItem key={index} w="full" h="18px">
              <Center borderLeft={'1px solid #AFAFAF'} borderRight={'1px solid #AFAFAF'} color={'#0C0C0C'}>{bg}</Center>
            </GridItem>
          )}
        </For>
      </Grid>

      {/* PM time bar indicator */}
      <Grid templateColumns="repeat(48, 1fr)" gap="2px" ml={"2px"} mr={"2px"}>
        <For each={aryTimePM}>
          {(bg, index) => (
            <GridItem key={index} w="full" h="18px" rounded="sm" bg={bg}/>
          )}
        </For>
      </Grid>
      <Grid templateColumns="repeat(12, 1fr)" gap="0" marginBottom={'md'}>
        <For each={aryClockPM}>
          {(bg, index) => (
            <GridItem key={index} w="full" h="18px">
              <Center borderLeft={'1px solid #AFAFAF'} borderRight={'1px solid #AFAFAF'} color={'#0C0C0C'}>{bg}</Center>
            </GridItem>
          )}
        </For>
      </Grid>
    </>
  )
}