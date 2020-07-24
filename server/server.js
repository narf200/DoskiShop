import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'
import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()
const { readFile, writeFile, unlink } = require('fs').promises

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const getLogs = async () => {
  const result = readFile(`${__dirname}/logs.json`, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    .catch(() => [])
  return result
}

const saveLogs = async (users) => {
  const result = writeFile(`${__dirname}/logs.json`, JSON.stringify(users), { encoding: 'utf8' })
  return result
}

server.get('/api/v1/currency', async (req, res) => {
  const currency = await axios('https://api.exchangeratesapi.io/latest?symbols=USD,CAD').then(
    ({ data }) => data.rates
  )
  res.json(currency)
})

server.get('/api/v1/database', async (req, res) => {
  const dataBase = await readFile(`${__dirname}/data.json`, { encoding: 'utf8' }).then((data) =>
    JSON.parse(data)
  )
  res.json(dataBase.slice(0, 24))
})

server.get('/api/v1/logs', async (req, res) => {
  const logs = await readFile(`${__dirname}/logs.json`, { encoding: 'utf8' }).then((data) =>
    JSON.parse(data)
  )
  res.json(logs)
})

server.delete('/api/v1/logs', (req, res) => {
  unlink(`${__dirname}/logs.json`)
  res.json('ok')
})

server.post('/api/v1/logs', async (req, res) => {
  const log = req.body
  const logs = await getLogs()
  await saveLogs([...logs, log])
  res.json({ status: 'ok' })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
