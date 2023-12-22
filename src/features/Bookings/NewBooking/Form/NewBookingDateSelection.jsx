import { useState, useEffect } from 'react'
import { Space, Form, DatePicker, TimePicker } from 'antd'
import { useSettings } from 'src/hooks/useSettingsQuery'
import dayjs from 'dayjs'
import { isSameDay } from 'src/utils/dateHelpers'

export const NewBookingDateSelection = (props) => {
	const {
		checkinTime,
		checkoutTime,
		onCheckinDateSelection,
		onCheckoutDateSelection,
		setCheckinTime,
		setCheckoutTime,
	} = props
	const [checkinDate, setCheckinDate] = useState()
	const [checkoutDate, setCheckoutDate] = useState()
	const { settings } = useSettings()

	const disableDatesPriorToToday = (current) => {
		return current.isBefore(dayjs(new Date()).subtract(1, 'day')) ? true : false
	}

	const disableDatesPriorToCheckIn = (current) => {
		return current.isBefore(addMinStayDurationToCheckoutDate(checkinDate)) ? true : false
	}

	const onChangeOfCheckinDate = (val) => {
		setCheckinDate(val)
		onCheckinDateSelection(val)
	}

	const onChangeOfCheckoutDate = (val) => {
		setCheckoutDate(val)
		onCheckoutDateSelection(val)
	}

	const addMinStayDurationToCheckoutDate = (checkoutDate) => {
		const DEFAULT_MIN_STAY = 24
		let minStayDuration = settings?.properties?.minStayDuration
		return checkoutDate.add(minStayDuration || DEFAULT_MIN_STAY, 'hour')
	}

	// console.log(checkinTime)
	// console.log(checkoutTime)

	useEffect(() => {
		setCheckinTime(dayjs(checkinTime).format('HH:mm:ss'))
	}, [])

	return (
		<>
			<Space>
				<Form.Item
					name="checkinDate"
					label="CheckIn Date"
					rules={[
						{
							required: true,
							message: 'Checkin date is required',
						},
					]}>
					<DatePicker onChange={onChangeOfCheckinDate} disabledDate={disableDatesPriorToToday} />
				</Form.Item>
				<Form.Item
					name="checkinTime"
					label="Checkin Time"
					value={checkinTime}
					rules={[
						{
							required: true,
							message: 'Checkin time is required',
						},
					]}>
					<TimePicker
						use12Hour={true}
						minuteStep={15}
						format="h:mm a"
						onSelect={(val) => setCheckinTime(val)}
						disabledTime={(now) => {
							return {
								disabledHours: () => {
									let hours = []
									if (isSameDay(checkinDate, now)) {
										let currentHour = now.get('hour')
										for (let i = 0; i < currentHour; i++) {
											hours.push(i)
										}
									}
									return hours
								},
								disabledMinutes: (selectedHour) => {
									let minutes = []
									if (isSameDay(checkinDate, now)) {
										let currentMin = now.get('minute')
										for (let i = 0; i < currentMin; i++) {
											minutes.push(i)
										}
									}
									return minutes
								},
							}
						}}
					/>
				</Form.Item>
			</Space>
			<Space>
				<Form.Item
					name="checkoutDate"
					label="Checkout Date"
					rules={[
						{
							required: true,
							message: 'Checkout date is required',
						},
					]}>
					<DatePicker onChange={onChangeOfCheckoutDate} disabledDate={disableDatesPriorToCheckIn} />
				</Form.Item>
				<Form.Item
					name="checkoutTime"
					label="Checkout Time"
					value={checkoutTime}
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
						onSelect={(val) => setCheckoutTime(val)}
					/>
				</Form.Item>
			</Space>
		</>
	)
}
