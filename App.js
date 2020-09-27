import React, { useContext, useState } from 'react'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {TodoState} from "./src/context/todo/TodoState"
import MainLayer from "./src/MainLayer";
import {ScreenState} from "./src/context/screen/ScreenState";
import { Alert } from 'react-native'
import { TodoContext } from './src/context/todo/TodoContext'

const loadApplication = async () => {
	await Font.loadAsync({
		'roboto-regular': require('./assets/font/Roboto-Regular.ttf'),
		'roboto-bold': require('./assets/font/Roboto-Bold.ttf'),
	})
}

export default function App() {
	let [isReady, setIsReady] = useState(false)
	if (!isReady) {
		return <AppLoading startAsync={loadApplication}
											 onFinish={() => setIsReady(true)}
		/>
	}


	return (
		<ScreenState>
			<TodoState>
				<MainLayer/>
			</TodoState>
		</ScreenState>
	);
}
