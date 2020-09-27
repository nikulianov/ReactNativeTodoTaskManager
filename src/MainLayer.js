import React, {useState, useEffect, useContext,useCallback} from 'react';
import { StyleSheet, View, Alert, Platform, Dimensions, Text } from 'react-native'

import Main from "./screens/Main";
import TodoContent from "./screens/TodoContent";
import {AppTextBold} from "./ui/AppTextBold";
import THEME from "./theme";
import {TodoContext} from "./context/todo/TodoContext";
import {ScreenContext} from "./context/screen/ScreenContext"
import { AppButton } from './ui/AppButton'


export default function MainLayer() {
	let {deleteTask,fetchTodos,error}=useContext(TodoContext)
	let {todoId}=useContext(ScreenContext)
	let [wrapperWidth,setWrapperWidth]=useState(Dimensions.get('window').width)

	const loadingTodos = useCallback(async()=>await fetchTodos(),[fetchTodos])

	useEffect(()=>{
    loadingTodos()
	},[])

  useEffect(()=>{
    const updateWidth = ()=>{
      setWrapperWidth(Dimensions.get('window').width)
    }

    Dimensions.addEventListener('change',updateWidth)

    return ()=>{
      Dimensions.removeEventListener('change',updateWidth)
    }

  })

  if(error){
   return <View style={styles.errorContent}>
		 <Text style={styles.textError}>{error}</Text>
		 <AppButton onPress={loadingTodos}>Повторить</AppButton>
	 </View>
  }

	return (
		<View style={styles.main}>
			<View style={{...styles.header,...Platform.select({
					ios:styles.headerIos,
					android:styles.headerAndroind
				})}}>
				<AppTextBold style={{color:Platform.OS === 'ios'?'#ccc':'#000'}}>Task Manager</AppTextBold>
			</View>
			<View style={{...styles.wrapperContent,width:wrapperWidth}}>
				{todoId? <TodoContent deleteTask={deleteTask}/> : <Main deleteTask={deleteTask}/>}
			</View>
		</View>

	);
}

const styles = StyleSheet.create({
	wrapperContent:{
		padding:THEME.PADDING_APP,
		flex:1
	},
	header: {
		height: 60,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 10,
	},
	headerAndroind:{
		backgroundColor:THEME.primary
	},
	headerIos:{
		borderBottomWidth:1,
		borderBottomColor:THEME.primary
	},
	main:{
		flex:1
	},
  errorContent:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
  textError:{
    color:'#cc3925',
		fontSize:20,
		marginBottom:10,
		textAlign:'center'
  }


})