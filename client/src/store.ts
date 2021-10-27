import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit'
import { createStore } from 'redux'

import { Data } from './reducer/index';

const reducerAll = combineReducers({
  ...Data
})
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

let store:any=null;

if((process.env.NODE_ENV==="production")){
  store = createStore(reducerAll)
}else{
  store = createStore(reducerAll,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}





// Create App Selector and Dispatch for App.
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export { store,useAppDispatch,useAppSelector };