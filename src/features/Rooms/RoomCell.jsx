import { Typography, Space, Button } from 'antd'
const { Text } = Typography

export const RoomCell = (props) => {
	const { room, width, showModal, bookedRooms } = props
	const cellBgColor =
		bookedRooms && bookedRooms.includes(room._id) ? 'slate-200' : 'white'
	return (
		<Space.Compact
			size="small"
			align="start"
			direction="horizontal"
			className="py-2"
			style={{
				width: width,
			}}>
			<Button
				block
				onClick={() => showModal(room)}
				className={`h-full rounded-none bg-${cellBgColor}`}>
				<Text>{room.roomNum}</Text>
			</Button>
		</Space.Compact>
	)
}
