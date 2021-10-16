import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {compose, createStore} from 'redux'

import {Data} from './reducer/index';

const reducerAll=combineReducers({
    ...Data
  })
  declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION__?: any;
    }
}

const store = createStore(reducerAll,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

// store.subscribe(() => )

console.log(store)



type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch


export {store};



export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector