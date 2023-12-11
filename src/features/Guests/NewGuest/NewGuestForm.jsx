import { Space, Form, Input, Button } from 'antd'

export const NewGuestForm = (props) => {
	return (
		<Form id="guestsForm" className="mt-6" onFinish={props.submitFn}>
			<Form.Item name="firstName" label="First Name">
				<Input placeholder="John" />
			</Form.Item>
			<Form.Item name="lastName" label="Last Name">
				<Input placeholder="Smith" />
			</Form.Item>
			<Form.Item name="email" label="Email">
				<Input placeholder="johnsmith@yahoo.com" />
			</Form.Item>
			<Form.Item name="phone" label="Phone">
				<Input placeholder="(515) 555-1234" />
			</Form.Item>
			<Form.Item name="dob" label="Date of Birth">
				<Input placeholder="YYYY-MM-DD" />
			</Form.Item>
			<Form.Item name="address1" label="Address 1">
				<Input placeholder="" />
			</Form.Item>
			<Form.Item name="address2" label="Address 2">
				<Input placeholder="" />
			</Form.Item>

			<Space>
				<Form.Item name="city" label="City">
					<Input placeholder="City" />
				</Form.Item>
				<Form.Item name="state" label="State">
					<Input placeholder="State" />
				</Form.Item>
				<Form.Item name="zip" label="Zip Code">
					<Input placeholder="Zip Code" />
				</Form.Item>
			</Space>

			<Form.Item name="licenseNumber" label="Licence #">
				<Input placeholder="000000000001" />
			</Form.Item>
			<Form.Item name="notes">
				<Input.TextArea placeholder="Notes" />
			</Form.Item>
			<Form.Item className="mb-0 text-right">
				<Button type="primary" key="submit" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}
