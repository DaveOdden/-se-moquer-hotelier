import { useState } from 'react'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import { Space, Flex } from 'antd'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { Properties } from './Properties'
import { useSettings } from 'src/hooks/useSettingsQuery'

export const Settings = () => {
	const settings = useSettings()
	const [toastNotification, setToastNotification] = useState({
		message: null,
		type: null,
	})

	return (
		<ErrorBoundary>
			<FeatureWrapper
				toastNotification={toastNotification}
				subHeaderProps={{
					featureName: 'Settings',
					recordCount: 0,
					newRecordBtn: false,
				}}>
				<Flex justify="center" className="h-full bg-zinc-100">
					<Space size="middle" direction="vertical" className="flex w-settings-card mt-16">
						<Properties settings={settings} />
					</Space>
				</Flex>
			</FeatureWrapper>
		</ErrorBoundary>
	)
}
