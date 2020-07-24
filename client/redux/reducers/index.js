import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import infobase from './infobase'
import logs from './logs'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    infobase,
    logs
  })

export default createRootReducer
