import { Spin } from 'antd'
import { RoomCell } from './RoomCell'
import { useSettings } from 'src/hooks/useSettingsQuery'
import { useArrayOfRoomsBooked } from 'src/hooks/useBookingsQuery'

export const RoomGrid = (props) => {
	const { rooms, showModal } = props
	const settings = useSettings()
	const bookedRooms = useArrayOfRoomsBooked()

	const width = settings.data
		? `calc(100%/${settings.data.properties.roomsPerFloor})`
		: null
	return settings.isLoading || bookedRooms.isLoading ? (
		<Spin className="w-full text-center m-8" />
	) : (
		rooms.map((room) => (
			<RoomCell
				key={room._id}
				room={room}
				bookedRooms={bookedRooms.data}
				width={width}
				showModal={showModal}
			/>
		))
	)
}
