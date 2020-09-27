import React, {useContext, useState} from 'react'
import { View, StyleSheet, Dimensions} from "react-native";
import AppCart from "../ui/AppCart";
import EditModal from "../components/EditModal";
import {AppText} from "../ui/AppText";
import {AppButton} from "../ui/AppButton";
import { AntDesign,FontAwesome } from '@expo/vector-icons';
import THEME from '../theme'
import {ScreenContext} from "../context/screen/ScreenContext";
import {TodoContext} from "../context/todo/TodoContext";
export default function TodoContent({deleteTask}) {
	let {saveTask,todos}=useContext(TodoContext)
	let {changeTodoId,todoId}=useContext(ScreenContext)

	const todo = todos.find(f=>f.id === todoId)
	let [editModal,setEditModal]=useState(false)

	return(
		<View>
			<EditModal saveTask={saveTask} todoId={todo.id} text={todo.value} editModal={editModal} close={()=>setEditModal(false)}/>
			<AppCart style={styles.cart}>
			<AppText style={styles.title}>{todo.value}</AppText>
				<AppButton onPress={()=>setEditModal(true)}>
					<FontAwesome name="edit" size={24} />
				</AppButton>
			</AppCart>
			<View style={styles.buttons}>
				<View style={styles.button}>
					<AppButton onPress={()=>changeTodoId(null)} background={THEME.default}>
						<AntDesign name='back' size={24}/>
					</AppButton>
				</View>
				<View style={styles.button}>
					<AppButton onPress={()=>deleteTask(todo.id)} color='red' background={THEME.danger}>
						<FontAwesome name='remove' size={24} />
					</AppButton>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	buttons:{
		justifyContent:'space-between',
		flexDirection:'row'
	},
	button:{
		width:Dimensions.get('window').width > 400?170:100
	},
	title:{
		fontSize:18
	},
	cart:{
		padding:10,
		borderRadius:10
	}
})