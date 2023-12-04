import { Form, Button } from 'antd'

export const EditDateSubmit = (props) => {
	const { form, invalid, submitForm } = props
	const { checkoutDate, checkoutTime } = form.getFieldsValue()
	const formIsComplete = !!checkoutDate && !!checkoutTime

	return (
		<Form.Item className="mb-0">
			<Button
				type="primary"
				key="submit"
				htmlType="submit"
				onClick={submitForm}
				disabled={invalid || !formIsComplete}>
				Update Booking
			</Button>
		</Form.Item>
	)
}
