import { Form, AutoComplete } from 'antd'

export const NewBookingRoomSelection = (props) => {
	const { room, rooms, roomIsLoading, onRoomSelection, onChange } = props

	return (
		<Form.Item
			name="room"
			label={`Rooms ${rooms.length ? `(${rooms.length})` : ''}`}
			rules={[
				{
					required: true,
					message: 'a room is required',
				},
			]}>
			<AutoComplete
				options={rooms}
				filterOption={true}
				onSelect={onRoomSelection}
				onChange={onChange}
				placeholder={
					roomIsLoading ? 'Loading...' : room?.value ? `#${room?.value}` : ''
				}
				disabled={roomIsLoading}
			/>
		</Form.Item>
	)
}
