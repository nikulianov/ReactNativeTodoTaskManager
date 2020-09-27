import React, { useContext, useReducer } from 'react'
import { TodoContext } from './TodoContext'
import {
  ADD_TASK,
  CLEAR_ERROR,
  DELETE_TASK, FETCH_TODOS,
  HIDE_LOADER,
  SAVE_TASK,
  SHOW_ERROR,
  SHOW_LOADER,
  TodoReducer
} from './TodoReducer'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/ScreenContext'
import { Http } from '../../http'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loader: false,
    error: false,
  }

  const [ state, dispatch ] = useReducer(TodoReducer, initialState)
  let {changeTodoId}=useContext(ScreenContext)
  const showLoader = () => dispatch({ type: SHOW_LOADER })
  const hideLoader = () => dispatch({ type: HIDE_LOADER })
  const showError = error => dispatch({ type: SHOW_ERROR, error })
  const clearError = () => dispatch({ type: CLEAR_ERROR })

  const saveTask = async(id, title) => {
    clearError()
    try{
      await Http.patch(`https://todoreactnative-64fc7.firebaseio.com/todos/${id}.json`, {value:title})
      dispatch({ type: SAVE_TASK, id, value: title, })
    }catch (e) {
      showError('Что-то пошло не так, пожалуйста, попробуйте попытку познее')
    }
  }

  const deleteTask = (id) => {
    Alert.alert(
      'Удаление элемента',
      'Вы уверены что хотите удалить этот Task?',
      [
        {
          text: 'Отменить',
          style: 'cancel',
        },
        {
          text: 'Уверен',
          style:'destructive',
          onPress: async () => {
            changeTodoId(null)
            await Http.delete(`https://todoreactnative-64fc7.firebaseio.com/todos/${id}.json`)
            dispatch({ type: DELETE_TASK, id })
          }
        },
      ],
      { cancelable: false }
    )
  }

  const addTask = async (value) => {
    clearError()
    try {
      let data = await Http.post('https://todoreactnative-64fc7.firebaseio.com/todos.json',{ value })
      dispatch({ type: ADD_TASK, value, id: data.name })
    }catch (e) {
      showError('Что-то пошло не так, пожалуйста, попробуйте попытку познее')
    }

  }

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try{
      let data = await Http.get('https://todoreactnative-64fc7.firebaseio.com/todos.json')
      let todos = Object.keys(data).map(key => ({ ...data[ key ], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    }catch (e) {
      showError('Что-то пошло не так, пожалуйста, попробуйте попытку познее')
    }finally {
      hideLoader()
    }
  }

  return <TodoContext.Provider value={{
    todos: state.todos,
    saveTask,
    deleteTask,
    addTask,
    fetchTodos,
    loader: state.loader,
    error: state.error,
    clearError
  }}>{children}</TodoContext.Provider>
}