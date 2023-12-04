import { useState, useEffect } from 'react'
import { Drawer, Card } from 'antd'
import { BookingDetailContent } from 'src/features/Bookings/BookingsDetail/BookingDetailContent'
import { BookingDetailActions } from 'src/features/Bookings/BookingsDetail/BookingDetailActions'
import { EditRoom } from 'src/features/Bookings/EditBooking/EditRoom'
import { EditCheckoutDate } from 'src/features/Bookings/EditBooking/EditCheckoutDate'
// import { useBooking } from 'src/hooks/useBookingsQuery'

export const BookingDetail = (props) => {
	const {
		bookingId,
		fullBookingDetails,
		updateBooking,
		deleteBooking,
		formStatus,
		resetEditForm,
		showDrawer,
		hideDrawer,
	} = props
	// const booking = useBooking(bookingId)
	const [isEditingCheckout, setEditingCheckoutDate] = useState(false)
	const [isEditingRoom, setEditingRoom] = useState(false)

	const onClose = () => {
		setEditingCheckoutDate(false)
		setEditingRoom(false)
		hideDrawer()
	}

	return (
		<Drawer
			title="Booking Information"
			placement="right"
			open={showDrawer()}
			onClose={onClose}
			getContainer={false}>
			<BookingDetailContent data={fullBookingDetails} />

			{!isEditingCheckout && !isEditingRoom && (
				<BookingDetailActions
					id={bookingId}
					deleteBooking={deleteBooking}
					setEditingCheckoutDate={setEditingCheckoutDate}
					setEditingRoom={setEditingRoom}
				/>
			)}

			{isEditingCheckout && (
				<Card size="small" className="mb-24" title="Edit Checkout Date">
					<EditCheckoutDate
						data={fullBookingDetails}
						updateBooking={updateBooking}
						formStatus={formStatus}
						resetEditForm={resetEditForm}
						setEditing={setEditingCheckoutDate}
					/>
				</Card>
			)}

			{isEditingRoom && (
				<Card size="small" className="mb-24" title="Edit Room">
					<EditRoom
						data={fullBookingDetails}
						updateBooking={updateBooking}
						formStatus={formStatus}
						resetEditForm={resetEditForm}
						setEditing={setEditingRoom}
					/>
				</Card>
			)}
		</Drawer>
	)
}
