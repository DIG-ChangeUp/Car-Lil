import {
  NativeTable,
  ScrollArea,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@yamada-ui/react';
import dayjs from 'dayjs';
// demo day用にコメントアウト
import { useAtomValue } from 'jotai/index';
import { currentShareDataAtom, selectedDateAtom } from './atom/globalState.ts';
import { useEffect, useState } from 'react';

const BorrowDateTable = () => {
  // demo day用に固定値を使用、本来は必要ない
  type Demo = {
    start_at: string;
    end_at: string;
  };
  type DemoData = Demo[];
  const demoData: DemoData = [
    {
      start_at: '2025-01-10T01:00:00.000Z',
      end_at: '2025-01-10T09:00:00.000Z',
    },
    {
      start_at: '2025-01-13T01:00:00.000Z',
      end_at: '2025-01-13T09:00:00.000Z',
    },
    {
      start_at: '2025-01-14T01:00:00.000Z',
      end_at: '2025-01-14T09:00:00.000Z',
    },
    {
      start_at: '2025-01-20T01:00:00.000Z',
      end_at: '2025-01-20T09:00:00.000Z',
    },
    {
      start_at: '2025-01-23T01:00:00.000Z',
      end_at: '2025-01-23T09:00:00.000Z',
    },
    {
      start_at: '2025-01-30T01:00:00.000Z',
      end_at: '2025-01-30T09:00:00.000Z',
    },
    {
      start_at: '2025-01-31T01:00:00.000Z',
      end_at: '2025-01-31T09:00:00.000Z',
    },
  ];
  const atomCurrentShareData = useAtomValue(currentShareDataAtom);
  const selectedDay = useAtomValue(selectedDateAtom);
  const [filteredDemoData, setFilteredDemoData] = useState<DemoData>([]);
  const [listData, setListData] = useState<DemoData>(demoData);
  console.log('atomCurrentShareData', atomCurrentShareData);

  //日付が選択されたらその日付がdemoDataに含まれるかを見て、あればその日付だけで絞ったデータを保持
  useEffect(() => {
    filterDataBySelectedDays();
  }, [selectedDay]);
  //↑でdemoDataに該当する日付がなければ全demoDataを、絞り込まれていればその日付だけをリスト表示
  useEffect(() => {
    if (selectedDay.length === 0) {
      setListData(demoData);
    } else {
      setListData(filteredDemoData);
    }
  }, [filteredDemoData]);

  function filterDataBySelectedDays() {
    const resultArr: DemoData = [];
    selectedDay.forEach((singleDay) => {
      demoData.forEach((data) => {
        if (data.start_at.includes(singleDay)) {
          resultArr.push(data);
        }
      });
    });
    setFilteredDemoData(resultArr);
  }

  return (
    <>
      <ScrollArea type="always">
        <TableContainer>
          <NativeTable variant="striped">
            <Thead>
              <Tr>
                <Th>日付</Th>
                <Th>開始</Th>
                <Th></Th>
                <Th>終了</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/*本来はatomCurrentShareDataで map する demo day用*/}
              {listData.map((borrow) => {
                return (
                  <Tr key={borrow.start_at} fontSize="16px">
                    <Td>
                      {dayjs(borrow.start_at)
                        .tz('Asia/Tokyo')
                        .format('MM月DD日')}
                    </Td>
                    <Td>
                      {dayjs(borrow.start_at).tz('Asia/Tokyo').format('HH:mm')}
                    </Td>
                    <Td>~</Td>
                    <Td>
                      {dayjs(borrow.end_at).tz('Asia/Tokyo').format('HH:mm')}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </NativeTable>
        </TableContainer>
      </ScrollArea>
    </>
  );
};

export default BorrowDateTable;
