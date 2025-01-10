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
import { currentShareDataAtom } from './atom/globalState.ts';

const BorrowDateTable = () => {
  // demo day用にコメントアウト
  const atomCurrentShareData = useAtomValue(currentShareDataAtom);
  console.log(atomCurrentShareData);

  // demo day用に固定値を使用、本来は必要ない
  const demodata = [
    {
      start_at: '2025-01-07T01:00:00.000Z',
      end_at: '2025-01-07T09:00:00.000Z',
    },
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
      start_at: '2025-01-30T01:00:00.000Z',
      end_at: '2025-01-30T09:00:00.000Z',
    },
    {
      start_at: '2025-01-31T01:00:00.000Z',
      end_at: '2025-01-31T09:00:00.000Z',
    },
  ];

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
              {demodata.map((borrow) => {
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
