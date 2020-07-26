import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateCurrentCurrensy,
  setSortStatus,
  getTotalAmount,
  getTotalItemsInCart
} from '../redux/reducers/infobase'

import ItemBar from './items-bar'

const Header = () => {
  const cart = useSelector((store) => store.infobase.cart)
  const items = useSelector((store) => store.infobase.items)
  const currency = useSelector((store) => store.infobase.currency)
  const exchangeRate = useSelector((store) => store.infobase.exchangeRate)
  const sortStatus = useSelector((store) => store.infobase.sortStatus)

  const dispatch = useDispatch()

  return (
    <div className="flex flex-col">
      <div>
        <nav className="bg-gray-100 border rounded-b-sm border-6 border-gray-400 shadow-lg ">
          <div className="flex items-center flex-row flex-no-wrap justify-between px-3">
            <Link id="brand-name" to="/" className="italic text-3xl font-bold text-black">
              Doski-shop
            </Link>
            <div className="flex flex-row items-center ">
              {' '}
              Сортировать по
              <div className="flex text-lg text-black flex-row">
                {['Цене', 'Названию'].map((it) => {
                  return (
                    <button
                      key={it}
                      id="sort-price"
                      type="button"
                      className={`flex p-1 px-2 ${sortStatus === it ? 'underline' : ''}`}
                      onClick={() => dispatch(setSortStatus(it))}
                    >
                      {it}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex text-lg text-black flex-row md:hidden">
              {['EUR', 'CAD', 'USD'].map((it) => {
                return (
                  <button
                    key={it}
                    type="button"
                    className={`flex p-1 px-2 ${currency === it ? 'underline' : ''}`}
                    onClick={() => dispatch(updateCurrentCurrensy(it))}
                  >
                    {it}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-end text-black flex-row content-center">
              <Link id="order-count" to="/basket">
                <img alt="cart" src="images/cart.png" />
              </Link>
              <div className="flex flex-col content-center px-2">
                <div className="flex justify-center">
                  {getTotalAmount(cart, items, currency, exchangeRate)}
                </div>
                <div className="flex justify-center">
                  {getTotalItemsInCart(cart) <= 1
                    ? `${getTotalItemsInCart(cart)} item`
                    : `${getTotalItemsInCart(cart)} items`}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex h-8">
        <ItemBar />
      </div>
    </div>
  )
}

export default React.memo(Header)
