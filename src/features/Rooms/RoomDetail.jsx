import { useState, useEffect } from 'react'
import { Calendar } from 'antd'
import dayjs from 'dayjs'
import { AppAPI } from 'src/api/API'
import { apiPaths } from 'src/api/constants'

export const RoomDetail = (props) => {
	const [room, setRoom] = useState([])

	const getRoomData = () => {
		AppAPI.call({
			method: 'GET',
			endpoint: apiPaths.rooms,
			id: props.room._id,
		}).then((res) => {
			setRoom(res.message)
		})
	}

	const findDatesToDisable = (current) => {
		if (room && room.datesBooked && room.datesBooked.length) {
			let index = room.datesBooked.findIndex(
				(date) => date === dayjs(current).format('YYYY-MM-DD')
			)
			return index > -1 && true
		}
	}

	useEffect(() => getRoomData, [])

	return (
		<>
			<h3>Room #{room.roomNum}</h3>
			{room && (
				<Calendar
					mode="month"
					fullscreen={false}
					disabledDate={findDatesToDisable}
				/>
			)}
		</>
	)
}
