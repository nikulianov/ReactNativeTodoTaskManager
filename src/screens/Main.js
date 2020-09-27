import React, {useContext, useState} from 'react'
import {StyleSheet, View, TextInput, Alert, FlatList, Image, Keyboard} from 'react-native';
import Task from "../components/Task";
import { Ionicons } from '@expo/vector-icons';
import {AppButton} from "../ui/AppButton";
import {TodoContext} from "../context/todo/TodoContext";
import {ScreenContext} from "../context/screen/ScreenContext";
import { AppLoader } from '../ui/AppLoader'
export default function Main({setTaskList,deleteTask}){

	let {addTask,todos,loader}=useContext(TodoContext)
	let {changeTodoId}=useContext(ScreenContext)
	let [textValue, setTextValue] = useState('')

	const addNewTask = () => {
		if (textValue.trim()) {
			addTask(textValue)
			setTextValue('')
			Keyboard.dismiss()
		} else {
			Alert.alert('Необходимо ввести задачу')
		}
	}

	const changeTextValue = (value) => {
		setTextValue(value)
	}

  if(loader) return <AppLoader/>
	return <View>
		<View style={styles.buttonContent}>
			<TextInput
				value={textValue}
				onChangeText={changeTextValue}
				placeholder='Введите задачу'
				style={styles.textInput}/>
			<View style={styles.button}>
				<AppButton onPress={addNewTask}>
					<Ionicons name="ios-add-circle-outline" size={24}></Ionicons>
				</AppButton>
			</View>
			{/*<Button onPress={addTask} title='Добавить'/>*/}
		</View>

		<View style={styles.taskContent}>
			{!todos.length ?
				<View style={styles.notFount}>
					<Image
						style={styles.notFountImg}
						source={require('../../assets/nothing.png')}
					/>
				</View>
				:
				<FlatList
					data={todos}
					renderItem={({item}) => <Task deleteTask={deleteTask} openTodo={changeTodoId} item={item} taskList={todos}/>}
					keyExtractor={item => item.id}
				/>
			}

		</View>
	</View>
}

const styles = StyleSheet.create({
	taskContent: {
		height:500,
	},
	textInput: {
		borderBottomWidth: 2,
		borderColor: '#2a59cc',
		padding: 10,
		fontSize: 16,
		fontWeight: 'bold',
		color: '#c1c1c1',
		width: '85%',
	},
	buttonContent: {
		flexDirection: 'row',
		marginBottom:10,
		alignItems:'flex-end',
		justifyContent:'space-between',
	},
	addTusk: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold'
	},
	container: {},
	notFount: {
		height:300,
		alignItems:'center',
		justifyContent:'center',
		padding:10
	},
	notFountImg:{
		width:'100%',
		height:'100%',
		resizeMode:'contain'
	},
	button:{
		width:'13%',
	}
})