import { Form, Button } from 'antd'

export const EditDateSubmit = (props) => {
	const { form, invalid, submitForm } = props
	const { checkoutDate, checkoutTime } = form.getFieldsValue()
	console.log('')
	console.log(checkoutDate, checkoutTime)
	const formIsComplete = !!checkoutDate && !!checkoutTime
	console.log('formIsComplete: ' + formIsComplete)
	console.log('invalid: ' + formIsComplete)

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
