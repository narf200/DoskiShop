import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getItemsForBasket,
  switchPrice,
  getTotalAmount,
  removeFromCart,
  addToCart
} from '../redux/reducers/infobase'

const Basket = () => {
  const cart = useSelector((store) => store.infobase.cart)
  const items = useSelector((store) => store.infobase.items)
  const currency = useSelector((store) => store.infobase.currency)
  const exchangeRate = useSelector((store) => store.infobase.exchangeRate)
  const dispatch = useDispatch()

  return Object.keys(cart).length === 0 ? (
    <div className="flex justify-center bg-grey-200 text-center text-4xl font-bold py-64">
      Sorry, your cart is empty...
    </div>
  ) : (
    <div className="flex flex-col px-48">
      <table className="table-auto">
        <thead>
          <tr className="text-2xl font-bold text-center">
            <th className="w-1/10 px-1 py-2"> Фото </th>
            <th className="w-6/10 px-1 py-2">Описание</th>
            <th className="w-1/10 px-1 py-2">Цена</th>
            <th className="w-1/10 px-1 py-2">Сумма</th>
            <th className="w-1/10 px-1 py-2">Количество</th>
          </tr>
        </thead>
        <tbody>
          {getItemsForBasket(cart, items).map((it) => {
            return (
              <tr
                key={it.id}
                className="h-32 text-xl font-bold text-center border-2 border-gray-500"
              >
                <td className="text-center border px-4 py-2 ">
                  <img
                    id="product__image"
                    alt="img"
                    className="object-contain justify-center h-32 w-48"
                    src={it.image}
                  />
                </td>
                <td id="product__title" className="border px-4 py-2">
                  {it.title}
                </td>
                <td id="product__price" className="border px-4 py-2">
                  {switchPrice(currency, it.price, exchangeRate)}
                </td>
                <td id="product__total_price" className="border px-4 py-2">
                  {switchPrice(currency, it.totalPrice, exchangeRate)}
                </td>
                <td className="border px-4 py-2">
                  <button
                    id="product__remove"
                    type="button"
                    className="border-2 border-gray-700 bg-gray-400 font-bold m-4 px-2"
                    onClick={() => dispatch(removeFromCart(it.id))}
                  >
                    -
                  </button>
                  {it.amount}
                  <button
                    type="button"
                    className="border-2 border-gray-700 bg-gray-400 font-bold m-4 px-2"
                    onClick={() => dispatch(addToCart(it.id))}
                  >
                    +
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex justify-end text-2xl font-bold px-12">
        Сумма: {getTotalAmount(cart, items, currency, exchangeRate)}
      </div>
    </div>
  )
}

Basket.propTypes = {}

export default React.memo(Basket)
