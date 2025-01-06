import { useEffect, useState } from 'react';
import { auth } from './auth/firebase.ts';
import { useNavigate } from 'react-router-dom';
import {
  MdCarCrash,
  MdCurrencyYen,
  MdEditCalendar,
  MdMoreHoriz,
  MdNotificationsNone,
  MdCarRental,
  MdDirectionsCar,
  MdLogout,
  MdChecklistRtl,
} from 'react-icons/md';
import { Text, VStack } from '@yamada-ui/react';

export interface IFooterItem {
  labelText: string;
  iconSelector: number;
  menuMode: string;
}

const colCodeActive = '#289FAB';
const colCodeEnabled = '#595959';
const colCodeDisabled = '#AFAFAF';

const aryMoveUrl: string[] = [
  '/timeBarSampling',
  '/timeBarSampling',
  '/timeBarSampling',
  '/timeBarSampling',
  '/timeBarSampling',
  '/timeBarSampling',
  '/map',
  '/timeBarSampling',
  '/reservationList',
  '/timeBarSampling',
  '/timeBarSampling',
];

export function FooterItem(props: IFooterItem) {
  const navigate = useNavigate();
  const [colorCode, setColorCode] = useState<string>(colCodeDisabled);
  useEffect(() => {
    switch (props.menuMode) {
      case 'Active':
        setColorCode(colCodeActive);
        break;
      case 'Enabled':
        setColorCode(colCodeEnabled);
        break;
      case 'Disabled':
        setColorCode(colCodeDisabled);
        break;
    }
  }, [props.menuMode]);

  function handlerClick() {
    if (props.menuMode !== 'Disabled') {
      if (props.iconSelector === 10) {
        const checkLogOut = handleLogout();
        console.log(checkLogOut);
      } else {
        navigate(aryMoveUrl[props.iconSelector]);
      }
    }
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('ログアウト エラー');
    }
  };

  return (
    <VStack
      alignItems="center"
      gap={'1'}
      color={colorCode}
      onClick={handlerClick}
    >
      {props.iconSelector === 0 && <MdEditCalendar />}
      {props.iconSelector === 1 && <MdCarRental />}
      {props.iconSelector === 2 && <MdCarCrash />}
      {props.iconSelector === 3 && <MdCurrencyYen />}
      {props.iconSelector === 4 && <MdNotificationsNone />}
      {props.iconSelector === 5 && <MdMoreHoriz />}
      {props.iconSelector === 6 && <MdEditCalendar />}
      {props.iconSelector === 7 && <MdDirectionsCar />}
      {props.iconSelector === 8 && <MdChecklistRtl />}
      {props.iconSelector === 9 && <MdNotificationsNone />}
      {props.iconSelector === 10 && <MdLogout />}
      <Text fontSize="9px">{props.labelText}</Text>
    </VStack>
  );
}
