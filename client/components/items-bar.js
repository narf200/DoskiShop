import React from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

const ItemsBar = () => {
  // const cart = useSelector((store) => store.infobase.cart)
  // const items = useSelector((store) => store.infobase.items)
  // const currency = useSelector((store) => store.infobase.currency)
  // const exchangeRate = useSelector((store) => store.infobase.exchangeRate)
  // const sortStatus = useSelector((store) => store.infobase.sortStatus)

  // const dispatch = useDispatch()

  return (
    <nav className="bg-gray-200 px-3  w-full">
      <div className="flex  flex-row items-top  justify-between">
        <Link id="brand-name" to="/" className="font-mono text-xl font-bold  text-black">
          Деки
        </Link>
        <Link id="brand-name" to="/wheels-page" className="font-mono text-xl font-bold text-black">
          Колеса
        </Link>
        <Link id="brand-name" to="/" className="font-mono text-xl font-bold text-black">
          Подвески
        </Link>
        <Link id="brand-name" to="/" className="font-mono text-xl font-bold text-black">
          Шкурки
        </Link>
      </div>
    </nav>
  )
}

export default React.memo(ItemsBar)
