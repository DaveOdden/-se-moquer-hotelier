import { useState } from 'react'
import { Space, Flex, Spin } from 'antd'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { useSettings } from 'src/hooks/useSettingsQuery'
import { Properties } from './Properties'

export const Settings = () => {
	const settings = useSettings()
	const [toastNotification, setToastNotification] = useState({
		message: null,
		type: null,
	})

	return (
		<FeatureWrapper
			subHeaderProps={{
				featureName: 'Settings',
				recordCount: 0,
				newRecordBtn: false,
			}}
			toastNotification={toastNotification}>
			<Flex justify="center" className="h-full bg-zinc-100">
				<Space size="middle" direction="vertical" className="flex w-settings-card mt-16">
					<Properties settings={settings} />
				</Space>
			</Flex>
		</FeatureWrapper>
	)
}
