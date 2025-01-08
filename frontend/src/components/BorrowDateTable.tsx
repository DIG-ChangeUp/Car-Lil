import {
  NativeTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@yamada-ui/react';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import { currentShareDataAtom } from './atom/globalState.ts';

const BorrowDateTable = () => {
  const atomCurrentShareData = useAtomValue(currentShareDataAtom);

  return (
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
          {atomCurrentShareData.map((borrow) => {
            return (
              <Tr key={borrow.id}>
                <Td fontSize="16px">
                  {dayjs(borrow.start_at).tz('Asia/Tokyo').format('MM月DD日')}
                </Td>
                <Td fontSize="16px">
                  {dayjs(borrow.start_at).tz('Asia/Tokyo').format('HH:mm')}
                </Td>
                <Td fontSize="16px">~</Td>
                <Td fontSize="16px">
                  {dayjs(borrow.end_at).tz('Asia/Tokyo').format('HH:mm')}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </NativeTable>
    </TableContainer>
  );
};

export default BorrowDateTable;
