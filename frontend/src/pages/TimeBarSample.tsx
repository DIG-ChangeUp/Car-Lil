import {
  Box
} from "@yamada-ui/react"

// TimeBarIndicatorコンポーネントをインポートする際に、インターフェースである ITimeZone をインポートするのを忘れないでください
import {TimeBarIndicator, ITimeZone} from "../components/TimeBarIndicator";

export function TimeBarSample() {
  /**
   * オーナーの貸出時間
   * もしない場合は、nullを設定してください
   */
  const ownerRentalTime_1 = null;

  const ownerRentalTime_2:ITimeZone = {
    strTime: '07:45',
    endTime: '18:15'
  }

  /**
   * 予約時間
   * もしない場合は、空の配列を設定してください
   */
  const bookingTime_1:ITimeZone[] = []

  const bookingTime_2:ITimeZone[] = [
    {
      strTime: '09:00',
      endTime: '10:00'
    },
    {
      strTime: '11:00',
      endTime: '12:00'
    },
    {
      strTime: '13:15',
      endTime: '14:45'
    },
    {
      strTime: '15:00',
      endTime: '16:00'
    }
  ]

  return(
    <Box m={'md'}>
      <h1>Index Page</h1>
      <TimeBarIndicator bookingTime={bookingTime_1} ownerRentalTime={ownerRentalTime_1} />
      <br />
      <TimeBarIndicator bookingTime={bookingTime_2} ownerRentalTime={ownerRentalTime_2} />
    </Box>
  )
}