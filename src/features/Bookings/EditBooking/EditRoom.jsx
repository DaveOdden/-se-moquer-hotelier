import { useState, useEffect } from 'react'
import { Space, Form, Button } from 'antd'

import { NewBookingRoomSelection } from 'src/features/Bookings/NewBooking/Form/NewBookingRoomSelection'
import { EditRoomSubmit } from 'src/features/Bookings/EditBooking/EditRoomSubmit'
import { AppAPI } from 'src/api/API'
import { apiPaths } from 'src/api/constants'

export const EditRoom = (props) => {
	const { data, updateBooking, formStatus, resetEditForm, setEditing } = props
	const [editRoom] = Form.useForm()
	const [rooms, setRooms] = useState([])
	const [roomIsLoading, setRoomLoadingState] = useState(false)
	const [selectedRoom, setSelectedRoom] = useState({
		key: data.room.roomNum.toString(),
		value: data.room.roomNum.toString(),
		id: data.room._id,
	})
	const isSameRoom = data.room._id === selectedRoom.id

	const goBack = () => setEditing(false)

	const onRoomSelection = (val, obj) => setSelectedRoom(obj)

	const onRoomSelectionChange = (val) => {
		if (val === '') setSelectedRoom(-1)
	}

	const initialPopulateRoomDropdown = () => {
		if (data.checkinDate && data.checkoutDate) {
			setRoomLoadingState(true)
			AppAPI.call({
				protocol: 'GET',
				endpoint: apiPaths.roomByAvailability,
				payload: {
					checkinDate: data.checkinDate,
					checkoutDate: data.checkoutDate,
				},
			}).then((res) => {
				setRooms(res.message.roomsWithAvailabilityKeyVal)
				setRoomLoadingState(false)
			})
		}
	}

	const submitForm = () => {
		let newData = {
			id: data._id,
			payload: {
				room: selectedRoom.id,
			},
		}
		console.log(newData)
		updateBooking(newData)
	}

	useEffect(() => initialPopulateRoomDropdown(), [])

	useEffect(() => {
		// revert to read-only when form is updated
		if (formStatus.response) {
			setEditing(false)
			resetEditForm()
		}
	}, [formStatus])

	return (
		<Form
			id="editRoom"
			form={editRoom}
			onFinish={submitForm}
			layout="vertical">
			<NewBookingRoomSelection
				room={selectedRoom}
				rooms={rooms}
				roomIsLoading={roomIsLoading}
				onChange={onRoomSelectionChange}
				onRoomSelection={onRoomSelection}
			/>

			<Space>
				<Button className="mb-0" onClick={goBack}>
					Cancel
				</Button>
				<EditRoomSubmit form={editRoom} invalid={isSameRoom} />
			</Space>
		</Form>
	)
}
