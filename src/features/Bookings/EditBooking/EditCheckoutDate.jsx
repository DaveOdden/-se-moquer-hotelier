import { useState, useEffect } from 'react'
import {
	Col,
	Row,
	Space,
	Form,
	Button,
	DatePicker,
	TimePicker,
	Alert,
} from 'antd'
import dayjs from 'dayjs'

import { useRoom } from 'src/hooks/useRoomsQuery'
import { NewBookingRoomSelection } from 'src/features/Bookings/NewBooking/Form/NewBookingRoomSelection'
import { EditDateSubmit } from 'src/features/Bookings/EditBooking/EditDateSubmit'
import {
	getArrayOfDatesBooked,
	isRoomAvailableDuringDates,
} from 'src/utils/dateHelpers'

import { AppAPI } from 'src/api/API'
import { apiPaths } from 'src/api/constants'

export const EditCheckoutDate = (props) => {
	// props
	const { data, updateBooking, formStatus, resetEditForm, setEditing } = props

	// hooks
	const room = useRoom(data.room._id)
	const [editCheckoutDateForm] = Form.useForm()

	// state
	const [selectedCheckoutDate, setSelectedCheckoutDate] = useState(
		data?.checkoutDate ? dayjs(data.checkoutDate) : ''
	)
	const [selectedCheckoutTime, setSelectedCheckoutTime] = useState(
		data?.checkoutDate
			? dayjs(dayjs(data.checkoutDate).format('HH:mm:ss'), 'HH:mm:ss')
			: ''
	)
	const [showWarning, setShowWarning] = useState(false)
	const [isChangingRoom, setIsChangingRoom] = useState(false)
	const [rooms, setRooms] = useState([])
	const [roomIsLoading, setRoomLoadingState] = useState(false)
	const [selectedRoom, setSelectedRoom] = useState(data.room._id)

	// computation
	const isSameDate = dayjs(data.checkoutDate).isSame(
		dayjs(selectedCheckoutDate)
	)

	const submitForm = () => {
		let formattedCheckoutDate =
			dayjs(selectedCheckoutDate).format('YYYY-MM-DD')
		let formattedCheckoutTime =
			dayjs(selectedCheckoutTime).format('HH:mm:ss')
		let newData = {
			room: selectedRoom,
			checkinDate: data.checkinDate,
			checkoutDate: dayjs(
				`${formattedCheckoutDate}T${formattedCheckoutTime}`
			).toISOString(),
		}
		let dataReadyForAPI = {
			id: data._id,
			payload: newData,
		}
		updateBooking(dataReadyForAPI)
	}

	const onCheckoutChange = (newCheckoutDate) => {
		setShowWarning(false)
		if (dayjs(newCheckoutDate).isAfter(dayjs(data.checkoutDate))) {
			let proposedNewDates = getArrayOfDatesBooked(
				dayjs(data.checkoutDate).add(1, 'day'),
				newCheckoutDate
			)
			let roomIsAvailable = isRoomAvailableDuringDates(
				data.room.datesBooked,
				proposedNewDates
			)
			if (!roomIsAvailable) setShowWarning(true)
		}
		setSelectedCheckoutDate(newCheckoutDate)
	}

	const disableDatesPriorToCheckIn = () => {
		return false
	}

	const onRoomChange = (val) => {
		if (val === '') setSelectedRoom(-1)
	}

	const onRoomSelection = (val, obj) => {
		setSelectedRoom(obj.id)
	}

	const setAvailableRooms = (res) => {
		setRoomLoadingState(false)
		setRooms(res.message.roomsWithAvailabilityKeyVal)
	}

	const getAvailableRooms = () => {
		setRoomLoadingState(true)
		AppAPI.call({
			protocol: 'GET',
			endpoint: apiPaths.roomByAvailability,
			payload: {
				checkinDate: data.checkinDate,
				checkoutDate: selectedCheckoutDate,
			},
		}).then(setAvailableRooms)
	}

	const showChangeRoom = () => {
		setShowWarning(false)
		setIsChangingRoom(true)
		getAvailableRooms()
	}

	const cancelEdit = () => {
		setEditing(false)
		setIsChangingRoom(false)
		setShowWarning(false)
	}

	useEffect(() => {
		// revert to read-only when form is updated
		if (formStatus.response) {
			setEditing(false)
			resetEditForm()
		}
	}, [formStatus])

	return (
		<Form
			id="editCheckoutDate"
			form={editCheckoutDateForm}
			initialValues={{
				checkoutDate: selectedCheckoutDate,
				checkoutTime: selectedCheckoutTime,
			}}
			onFinish={submitForm}
			layout="vertical">
			<Row>
				<Col span={12} align="left">
					<Form.Item
						name="checkoutDate"
						label="Checkout Date"
						rules={[
							{
								required: true,
								message: 'Checkout date is required',
							},
						]}>
						<DatePicker
							onChange={onCheckoutChange}
							disabledDate={disableDatesPriorToCheckIn}
						/>
					</Form.Item>
				</Col>
				<Col span={12} align="left">
					<Form.Item
						name="checkoutTime"
						label="Checkout Time"
						rules={[
							{
								required: true,
								message: 'Checkout time is required',
							},
						]}>
						<TimePicker
							use12Hours
							minuteStep={15}
							format="h:mm a"
							onSelect={(val) => setSelectedCheckoutTime(val)}
						/>
					</Form.Item>
				</Col>
			</Row>

			{showWarning && (
				<>
					<Alert
						description="This room is not available during these dates. Please choose from the below actions to proceed"
						type="warning"
						showIcon
					/>

					<Row className="my-3">
						<Col span={12} align="left">
							<Button className="w-full" onClick={showChangeRoom}>
								Change Room
							</Button>
						</Col>
						<Col span={12} align="left">
							<Button className="w-full">Free-up Room</Button>
						</Col>
					</Row>
				</>
			)}

			{isChangingRoom && (
				<NewBookingRoomSelection
					room={selectedRoom}
					rooms={rooms}
					roomIsLoading={roomIsLoading}
					onRoomSelection={onRoomSelection}
					onChange={onRoomChange}
				/>
			)}

			<Space>
				<Button className="mb-0" onClick={cancelEdit}>
					Cancel
				</Button>

				<EditDateSubmit
					form={editCheckoutDateForm}
					invalid={isSameDate}
					submitForm={submitForm}
				/>
			</Space>
		</Form>
	)
}
