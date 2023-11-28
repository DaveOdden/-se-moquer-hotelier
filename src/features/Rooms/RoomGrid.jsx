import { Spin } from 'antd'
import { RoomCell } from './RoomCell'
import { useSettings } from 'src/hooks/useSettingsQuery'

export const RoomGrid = props => {
  const { rooms } = props
  const settings = useSettings();
  const width = settings.data ? `calc(100%/${settings.data.properties.roomsPerFloor})` : null
  return settings.isLoading ? <Spin style={{ width: '100%', textAlign: 'center', margin: '32px'}}/> : rooms.map( room => <RoomCell key={room._id} room={room} width={width} />)
}