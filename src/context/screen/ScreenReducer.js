export const CHANGE_TODO_ID="CHANGE_TODO_ID"

let handlers = {
	[CHANGE_TODO_ID]:(state,action)=>({...state,todoId:action.id}),
	DEFAULT: state => state
}

export const ScreenReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT
	return handler(state, action)
}