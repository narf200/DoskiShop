import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, switchPrice, switchSortItems } from '../redux/reducers/infobase'

const Main = () => {
  const items = useSelector((store) => store.infobase.items)
  const currency = useSelector((store) => store.infobase.currency)
  const exchangeRate = useSelector((store) => store.infobase.exchangeRate)
  const sortStatus = useSelector((store) => store.infobase.sortStatus)
  const cart = useSelector((store) => store.infobase.cart)

  const dispatch = useDispatch()

  return (
    <div className="flex flex-row flex-wrap bg-white  content-around justify-around ">
      {switchSortItems(sortStatus, items).map((it) => {
        return (
          <div key={it.id} className="flex flex-col  px-4 py-4 ">
            <div className="flex flex-col box-content bg-white  w-64 h-64 border border-gray-300 border-opacity-25 rounded shadow">
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
              <div className="flex flex-row justify-between px-24">
                {typeof cart !== 'undefined' ? cart[it.id] : ''}
                <button
                  type="button"
                  className="border-2 font-bold hover:text-black hover:bg-gray-700 border-solid border-gray-700 bg-gray-400 focus:outline-none px-2 rounded-lg"
                  onClick={() => dispatch(addToCart(it.id))}
                >
                  купить
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
