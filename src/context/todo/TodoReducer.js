export const SAVE_TASK="SAVE_TASK"
export const DELETE_TASK="DELETE_TASK"
export const ADD_TASK="ADD_TASK"

export const SHOW_LOADER="SHOW_LOADER"
export const HIDE_LOADER="HIDE_LOADER"
export const SHOW_ERROR="SHOW_ERROR"
export const CLEAR_ERROR="CLEAR_ERROR"
export const FETCH_TODOS="FETCH_TODOS"

let handlers = {
	[SAVE_TASK]:(state,action)=>({...state,todos:state.todos.map(m=>{
		if(m.id === action.id){
			m.value = action.value
		}
		return m
		})}),
	[DELETE_TASK]:(state,action)=>({...state,todos:state.todos.filter(task => task.id !== action.id)}),
	[ADD_TASK]:(state,action)=>({...state,todos:[...state.todos,{value:action.value,id:action.id}]}),
	[SHOW_LOADER]:state=>({...state,loader:true}),
  [HIDE_LOADER]:state=>({...state,loader:false}),
  [SHOW_ERROR]:(state,{error})=>({...state,error}),
  [CLEAR_ERROR]:(state)=>({...state,error:false}),
  [FETCH_TODOS]:(state,{todos})=>({...state,todos}),
	DEFAULT: state => state
}

export const TodoReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT
	return handler(state, action)
}