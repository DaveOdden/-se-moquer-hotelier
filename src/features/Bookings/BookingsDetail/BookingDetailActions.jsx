import { useState } from 'react'
import { Row, Col, Button, Popover, Space } from 'antd'

export const BookingDetailActions = (props) => {
	const { id, deleteBooking, setEditingCheckoutDate, setEditingRoom } = props
	const [showConfirmation, setShowConfirmation] = useState(false)

	const changeCheckoutDate = () => setEditingCheckoutDate(true)
	const changeRoom = () => setEditingRoom(true)
	const cancelBooking = () => deleteBooking(id)

	return (
		<>
			<Row className="my-3">
				<Col span={12} align="left">
					<Button className="w-full" onClick={changeCheckoutDate}>
						Change Checkout
					</Button>
				</Col>
				<Col span={12} align="left">
					<Button className="w-full" onClick={changeRoom}>
						Change Room
					</Button>
				</Col>
			</Row>
			<Popover
				title="Are You Sure?"
				trigger="click"
				open={showConfirmation}
				content={
					<Space>
						<Button onClick={() => setShowConfirmation(false)}>
							No
						</Button>
						<Button danger type="primary" onClick={cancelBooking}>
							Yes
						</Button>
					</Space>
				}>
				<Button
					className="w-full"
					onClick={() => setShowConfirmation(true)}
					danger>
					Cancel Booking
				</Button>
			</Popover>
		</>
	)
}
