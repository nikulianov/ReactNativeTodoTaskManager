import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {AppText} from "../ui/AppText";

export default function Task({openTodo,item,deleteTask}) {
	return (
		<TouchableOpacity activeOpacity={0.3} onPress={()=>openTodo(item.id)} onLongPress={()=>deleteTask(item.id)}>
			<View style={styles.task}>
				<AppText style={styles.text}>{item.value}</AppText>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	task: {
		padding:10,
		borderWidth:1,
		borderColor:'#ccc',
		flexDirection:'row',
		alignItems:'center',
		marginBottom:10,
		borderRadius:5,
	},
	text:{
		width:'75%',
		fontSize:18,
	},
	button:{
		width:100,
		backgroundColor:'#ccc',
		padding:5,
	}

});
