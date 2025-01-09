import { useEffect, useState } from 'react';
import { auth } from './auth/firebase.ts';
import { useNavigate } from 'react-router-dom';
import {
  MdEditCalendar,
  MdCalendarMonth,
  MdHome,
  MdLogout,
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
  '/ownerSelectDay',
  '/',
  '/',
  '/map',
  '/',
  '/',
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
      if (props.iconSelector === 2 || props.iconSelector === 5) {
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
      navigate('/login');
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
      {props.iconSelector === 1 && <MdHome />}
      {props.iconSelector === 2 && <MdLogout />}
      {props.iconSelector === 3 && <MdCalendarMonth />}
      {props.iconSelector === 4 && <MdHome />}
      {props.iconSelector === 5 && <MdLogout />}
      <Text fontSize="9px">{props.labelText}</Text>
    </VStack>
  );
}
