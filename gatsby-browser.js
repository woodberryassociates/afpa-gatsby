import 'typeface-montserrat'

import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'

export const onClientEntry = () => {
	LogRocket.init(`lp8dfd/alliance-for-patient-access`)
	setupLogRocketReact(LogRocket)
}
