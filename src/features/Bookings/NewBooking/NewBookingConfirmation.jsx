import { useState } from 'react'
import { Space, Flex, Button, Descriptions, Divider, Statistic } from 'antd'
import { writtenOutDateTime } from 'src/utils/dataTransformation'
import { useSettings } from 'src/hooks/useSettingsQuery'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'

export const BookingConfirmation = (props) => {
	const { data: settings } = useSettings()
	const { formData, guestDetails, submitBooking, backButtonAction } = props
	const [isLoading, setLoading] = useState(false)

	const kickOffFormSubmission = () => {
		setLoading(true)
		submitBooking()
	}

	return (
		<ErrorBoundary>
			<Space direction="vertical">
				<Descriptions size="small" className="mt-4" column={1}>
					<Descriptions.Item label="Guest Name">
						{guestDetails?.firstName} {guestDetails?.lastName}
					</Descriptions.Item>
					<Descriptions.Item label="License #">
						{guestDetails?.licenseNumber}
					</Descriptions.Item>
					<Descriptions.Item label="Check In">
						{writtenOutDateTime(formData?.checkinDate)}
					</Descriptions.Item>
					<Descriptions.Item label="Check Out">
						{writtenOutDateTime(formData?.checkoutDate)}
					</Descriptions.Item>
					<Descriptions.Item label="Payment">
						Mock Payment
					</Descriptions.Item>
				</Descriptions>
				<Divider className="m-0" />
				<Flex justify="space-between">
					<Descriptions column={1}>
						<Descriptions.Item label="Rate">
							${settings?.properties?.roomRate} x{' '}
							{formData?.billing.days}
						</Descriptions.Item>
					</Descriptions>
					<Statistic
						title="Total"
						className="text-right mb-8"
						value={`$${
							settings?.properties?.roomRate *
							formData?.billing.days
						}`}
					/>
				</Flex>
			</Space>
			<Flex justify="space-between">
				<Button onClick={backButtonAction}>Back</Button>
				<Button
					type="primary"
					onClick={kickOffFormSubmission}
					loading={isLoading}>
					Confirm Booking
				</Button>
			</Flex>
		</ErrorBoundary>
	)
}
