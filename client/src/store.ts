import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {createStore} from 'redux'

import {AuthReducer,UserReducer} from './reducer/index';

const reducerAll=combineReducers({
    AuthReducer,
    UserReducer
  })

const store = createStore(reducerAll)

store.subscribe(() => console.log(store.getState()))



type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch


export {store};



export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector