import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, switchPrice, switchSortItems } from '../redux/reducers/infobase'

const Main = () => {
  const items = useSelector((store) => store.infobase.items)
  const currency = useSelector((store) => store.infobase.currency)
  const exchangeRate = useSelector((store) => store.infobase.exchangeRate)
  const sortStatus = useSelector((store) => store.infobase.sortStatus)
  const cart = useSelector((store) => store.infobase.cart)

  const dispatch = useDispatch()

  return (
    <div className="flex flex-row flex-wrap bg-gray-200  content-around justify-around">
      {switchSortItems(sortStatus, items).map((it) => {
        return (
          <div key={it.id} className="flex flex-col  px-4 py-4">
            <div className="flex flex-col box-content bg-white  w-64 h-64 border-2 border-gray-400 rounded">
              <img
                id="card__image"
                alt="img"
                src={it.image}
                className="flex h-32 box-content  p-1 flex-no-wrap self-center"
              />
              <div className="flex flex-col">
                <div id="card__title" className="text-center font-bold py-1">
                  {it.title}
                </div>
                <div id="card__price" className="text-center font-bold py-1">
                  {switchPrice(currency, it.price, exchangeRate)}
                </div>
              </div>
              <div className="flex flex-row justify-between px-16">
                <button
                  type="button"
                  className="border-2 font-bold border-solid border-gray-700 bg-gray-400 px-2"
                  onClick={() =>
                    cart[it.id] !== undefined ? dispatch(removeFromCart(it.id)) : null
                  }
                >
                  -
                </button>
                {typeof cart !== 'undefined' ? cart[it.id] : ''}
                <button
                  type="button"
                  className="border-2 font-bold border-solid border-gray-700 bg-gray-400 px-2"
                  onClick={() => dispatch(addToCart(it.id))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Main.propTypes = {}

export default Main
