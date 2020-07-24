import axios from 'axios'

const GET_LOGS = '@@GET_LOGS'
const initialState = {
  list: []
}

export default (state = initialState, action) => {
  if (action.type.indexOf('@@') !== 0) {
    fetch('/api/v1/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action)
    })
  }
  if (action.type === GET_LOGS) {
    return {
      ...state,
      list: action.list
    }
  }
  return {
    ...state,
    list: [...state.list, action]
  }
}

export function getLogs() {
  return async function f(dispatch) {
    await axios('/api/v1/logs').then(({ data }) => {
      dispatch({ type: GET_LOGS, list: data })
    })
  }
}

export function getStringLogsForRender(data, products) {
  const newArr = data.reduce((acc, rec) => {
    const item = products.find((el) => el.id === rec.id)
    if (rec.type === 'ADD_TO_CART' && typeof item !== 'undefined') {
      return [...acc, `${new Date(rec.date)}: add ${item.title} to the backet`]
    }
    if (rec.type === 'REMOVE_FROM_CART' && typeof item !== 'undefined') {
      return [...acc, `${new Date(rec.date)}: remove ${item.title} from the backet`]
    }
    if (rec.type === 'CHANGE_CURRENCY') {
      return [...acc, `${new Date(rec.date)}: change currency to ${rec.currency}`]
    }
    if (rec.type === 'SET_SORT') {
      return [...acc, `${new Date(rec.date)}: sort by ${rec.sortStatus}`]
    }
    return acc
  }, [])
  return newArr
}
