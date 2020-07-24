import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getItems, getExchangeRates } from '../redux/reducers/infobase'

import Header from './header'
import Main from './main-page'
import Basket from './basket-page'
import Logs from './logs-page'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItems())
    dispatch(getExchangeRates())
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Main />} />
        <Route exact path="/basket" component={() => <Basket />} />
        <Route exact path="/logs" component={() => <Logs />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
