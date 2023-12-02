import { Statistic, Spin } from 'antd'
import { useOccupiedRooms } from 'src/hooks/useRoomsQuery'

export const BookedRoomsWidget = () => {
	const occupiedRooms = useOccupiedRooms()

	return occupiedRooms?.data?.length ? (
		<Statistic
			title="Occupied Rooms"
			value={occupiedRooms.data.length}
			valueStyle={{ fontSize: '3rem' }}
		/>
	) : (
		<Spin />
	)
}
