import { Form, Button } from 'antd'

export const NewBookingSubmitButton = (props) => {
	const { bookingForm, moveToNextStep } = props
	const {
		guest,
		checkinDate,
		checkinTime,
		checkoutDate,
		checkoutTime,
		room,
	} = bookingForm.getFieldsValue()
	const formIsComplete =
		!!guest &&
		!!checkinDate &&
		!!checkinTime &&
		!!checkoutDate &&
		!!checkoutTime &&
		!!room

	return (
		<Form.Item shouldUpdate className="text-right mb-0">
			<Button
				type="primary"
				disabled={!formIsComplete}
				onClick={moveToNextStep}>
				Next
			</Button>
		</Form.Item>
	)
}
