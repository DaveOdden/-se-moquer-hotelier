import { useContext } from 'react'
import { Flex, Button, Typography } from 'antd'
const { Text } = Typography
import { CurrentModalState } from './NewBookingContainer'

export const NewGuestPrompt = () => {
	const { setCurrentView } = useContext(CurrentModalState)

	return (
		<Flex align="center" justify="space-between">
			<Text className="inline-block text-xs">
				<span className="font-bold">
					This guest is not in our system.
				</span>
				<div>
					Register this individual to start the booking process.
				</div>
			</Text>
			<Button
				type="primary"
				onClick={() => setCurrentView('newGuestForm')}>
				Create New Guest
			</Button>
		</Flex>
	)
}
