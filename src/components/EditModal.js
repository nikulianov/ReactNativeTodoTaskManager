import React,{useState} from 'react'
import {View, Button, TextInput, Modal,StyleSheet,Alert} from "react-native";
import THEME from "../theme";
import {AppButton} from "../ui/AppButton";

export default EditModal = ({editModal, close,text,saveTask,todoId}) => {
	let [title,setTitle] =useState(text)

	const save=async()=>{
		if(title.trim().length <3){
			return Alert.alert('Необходимо ввести название, где больше 3-х симоволов,' +
				`Сейчас ${title.trim().length} символа(ов)`)
		}
		await saveTask(todoId,title)
		close()
	}

	return (
		<Modal animationType="slide" visible={editModal}>
			<View style={styles.wrap}>
				<TextInput placeholder='Введите текст'
									 style={styles.input}
									 value={title}
									 onChangeText={setTitle}
									 autoCapitalize='none'
									 autoCorrect={false}
									 maxLength={64}
				/>
				<View style={styles.buttons}>
					<View style={styles.button}>
						<AppButton onPress={close} background={THEME.default}>
							Отмена
						</AppButton>
					</View>
					<View style={styles.button}>
						<AppButton onPress={save} background={THEME.primary}>
							Сохранить
						</AppButton>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	wrap: {
		padding:15,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop:20,
		width:'100%'
	},
	button: {
		width: '40%'
	},
	input:{
		width:'100%',
		padding:8,
		borderBottomWidth:2,
		borderColor:THEME.primary
	}
})