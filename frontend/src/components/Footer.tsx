import { useEffect, useState } from 'react';
import { HStack } from '@yamada-ui/react';

import { FooterItem, IFooterItem } from './FooterItem.tsx';

interface IFooterSetting {
  isOwnerMode: boolean;
  activeMenu: number;
}

/**
 * フッター
 * activeMenu に -1を設定すると、Active状態になるメニューはなしになります
 * それ以外のアイコンをアクティブにしたい場合は、0から順に番号を設定してください。
 *
 * オーナーモード
 * 0: 貸出設定
 * 1: 予約状況
 * 2: 車両情報
 * 3: バック金額
 * 4: 通知
 * 5: その他
 *
 * テナントモード
 * 6: TOP
 * 7: 利用する
 * 8: 予約一覧
 * 9: 通知
 * 10: ログアウト
 */
export default function Footer(props: IFooterSetting) {

  const [aryFooterItems, setAryFooterItems] = useState<IFooterItem[]>([]);

  useEffect(() => {
    const _aryFooterItems: IFooterItem[] = [];
    if(props.isOwnerMode) {
      _aryFooterItems.push({ labelText: '貸出設定', iconSelector: 0, menuMode: 'Enabled' });
      _aryFooterItems.push({ labelText: 'TOP', iconSelector: 1, menuMode: 'Enabled' });
      _aryFooterItems.push({ labelText: 'ログアウト', iconSelector: 2, menuMode: 'Enabled' });

    } else {
      _aryFooterItems.push({ labelText: '予約', iconSelector: 3, menuMode: 'Enabled' });
      _aryFooterItems.push({ labelText: 'TOP', iconSelector: 4, menuMode: 'Enabled' });
      _aryFooterItems.push({ labelText: 'ログアウト', iconSelector: 5, menuMode: 'Enabled' });

    }

    if(props.activeMenu >= 0) _aryFooterItems[props.activeMenu].menuMode = 'Active';

    setAryFooterItems(_aryFooterItems);
  }, [props]);


  return (
    <HStack
      justifyContent="space-between"
      h="80px"
      paddingX="15"
      paddingBottom="3"
      fontSize="2xl"
      backgroundColor="#F3F7F7"
      sx={{ borderTop: '1px solid #D9D9D9' }}
    >

      {aryFooterItems.map((item, index) => (
        <FooterItem key={index} labelText={item.labelText} iconSelector={item.iconSelector} menuMode={item.menuMode} />
      ))}

    </HStack>
  );
}
