import axios from 'axios'

const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
const DATA_BASE = '@@DATA_BASE'
const EXCHANGE_RATE = '@@EXCHANGE_RATE'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const SET_SORT = 'SET_SORT'

const initialState = {
  currency: 'EUR',
  items: [],
  exchangeRate: {},
  cart: {},
  sortStatus: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.currency
      }
    case DATA_BASE:
      return {
        ...state,
        items: action.items
      }
    case EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.exchangeRate
      }
    case SET_SORT:
      return {
        ...state,
        sortStatus: action.sortStatus
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.id]: (state.cart[action.id] || 0) + 1
        }
      }
    case REMOVE_FROM_CART: {
      const newCart = {
        ...state.cart,
        [action.id]: state.cart[action.id] - 1
      }
      if (newCart[action.id] <= 0) {
        delete newCart[action.id]
      }
      return {
        ...state,
        cart: newCart
      }
    }
    default:
      return state
  }
}

export function updateCurrentCurrensy(currency) {
  const date = +new Date()
  return { type: CHANGE_CURRENCY, currency, date }
}

export function setSortStatus(sortStatus) {
  const date = +new Date()
  return { type: SET_SORT, sortStatus, date }
}

export function getItems() {
  return function f(dispatch) {
    axios('/api/v1/database').then(({ data }) => {
      dispatch({ type: DATA_BASE, items: data })
    })
  }
}

export function getExchangeRates() {
  return async function f(dispatch) {
    await axios('/api/v1/currency').then(({ data }) => {
      dispatch({ type: EXCHANGE_RATE, exchangeRate: data })
    })
  }
}

export function addToCart(id) {
  const date = +new Date()
  return { type: ADD_TO_CART, id, date }
}

export function removeFromCart(id) {
  const date = +new Date()
  return { type: REMOVE_FROM_CART, id, date }
}

export function switchPrice(param, price, exchangeRate) {
  switch (param) {
    case 'USD':
      return `${(price * exchangeRate.USD).toFixed(2)} $`
    case 'CAD':
      return `${(price * exchangeRate.CAD).toFixed(2)} С$`
    default:
      return `${price.toFixed(2)} €`
  }
}

export function getTotalAmount(cart, data, currency, exchangeRate) {
  if (typeof cart !== 'undefined' && typeof data !== 'undefined') {
    const arrKeys = Object.keys(cart)
    const amount = arrKeys.reduce((acc, rec) => {
      return acc + data.find((el) => el.id === rec).price * cart[rec]
    }, 0)
    return switchPrice(currency, amount, exchangeRate)
  }
  const zero = 0
  return zero.toFixed(2)
}

export function getTotalItemsInCart(cart) {
  if (typeof cart !== 'undefined') {
    return Object.values(cart).reduce((acc, rec) => {
      return acc + rec
    }, 0)
  }
  return 0
}

export function switchSortItems(param, array) {
  switch (param) {
    case 'Price':
      return array.sort((a, b) => b.price - a.price)
    case 'A-Z':
      return array.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
        return 0
      })
    default:
      return array
  }
}

export function getItemsForBasket(cart, data) {
  return Object.keys(cart).reduce((acc, rec) => {
    const item = data.find((el) => el.id === rec)
    return [
      ...acc,
      {
        id: rec,
        title: item.title,
        price: item.price,
        totalPrice: item.price * cart[rec],
        amount: cart[rec],
        image: item.image
      }
    ]
  }, [])
}
