import { Space, Form, Input, Button } from 'antd'

export const EditGuestForm = (props) => {
	const { formData, formStatus, formSubmit } = props

	const submitForm = (editedFormData) => formSubmit(formData._id, editedFormData)

	return (
		<Form id="guestsForm" onFinish={submitForm} initialValues={formData}>
			<Form.Item name="firstName" label="First Name" disabled={formStatus.loading}>
				<Input placeholder="e.g. John" disabled={formStatus.loading} />
			</Form.Item>
			<Form.Item name="lastName" label="Last Name" disabled={formStatus.loading}>
				<Input placeholder="Last Name" disabled={formStatus.loading} />
			</Form.Item>
			<Form.Item name="email" label="Email" disabled={formStatus.loading}>
				<Input placeholder="Email" disabled={formStatus.loading} />
			</Form.Item>
			<Form.Item name="phone" label="Phone" disabled={formStatus.loading}>
				<Input placeholder="Phone" disabled={formStatus.loading} />
			</Form.Item>
			<Form.Item name="dob" label="Date of Birth" disabled={formStatus.loading}>
				<Input placeholder="Date of Birth" disabled={formStatus.loading} />
			</Form.Item>
			<Form.Item name={['address', 'street']} label="Street Address" disabled={formStatus.loading}>
				<Input
					placeholder="Street Address"
					value={formData.address.street}
					disabled={formStatus.loading}
				/>
			</Form.Item>

			<Space>
				<Form.Item name={['address', 'city']} label="City" disabled={formStatus.loading}>
					<Input placeholder="City" value={formData.address.city} disabled={formStatus.loading} />
				</Form.Item>
				<Form.Item name={['address', 'state']} label="State" disabled={formStatus.loading}>
					<Input placeholder="State" value={formData.address.state} disabled={formStatus.loading} />
				</Form.Item>
				<Form.Item name={['address', 'zip']} label="Zip Code" disabled={formStatus.loading}>
					<Input
						placeholder="Zip Code"
						value={formData.address.zip}
						disabled={formStatus.loading}
					/>
				</Form.Item>
			</Space>

			<Form.Item name="licenseNumber" disabled={formStatus.loading}>
				<Input placeholder="License Number" disabled={formStatus.loading} />
			</Form.Item>
			<Form.Item name="notes" disabled={formStatus.loading}>
				<Input.TextArea placeholder="Notes" disabled={formStatus.loading} />
			</Form.Item>
			<Form.Item disabled={formStatus.loading} className="mb-0 text-right">
				<Button type="primary" key="submit" htmlType="submit" disabled={formStatus.loading}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}
