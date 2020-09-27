import React, {useReducer} from 'react'
import {ScreenContext} from "./ScreenContext";
import {CHANGE_TODO_ID, ScreenReducer} from "./ScreenReducer";

export const ScreenState = ({children}) =>{
	const initialState = {
		todoId:null
	}

	const [state,dispatch] = useReducer(ScreenReducer,initialState)

	const changeTodoId = (id)=>{
		dispatch({
			type:CHANGE_TODO_ID,
			id,
		})
	}

	return <ScreenContext.Provider value = {{
		todoId:state.todoId,
		changeTodoId
	}}>{children}</ScreenContext.Provider>
}