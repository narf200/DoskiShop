import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLogs, getStringLogsForRender } from '../redux/reducers/logs'

const Logs = () => {
  const list = useSelector((store) => store.logs.list)
  const items = useSelector((store) => store.infobase.items)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLogs())
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {getStringLogsForRender(list, items).map((it) => {
        return (
          <div key={it} className="flex justify-center px-24">
            <div className="border-2 border-gray-400 py-5 px-5 m-1 w-full">{it}</div>
          </div>
        )
      })}
    </div>
  )
}

Logs.propTypes = {}

export default React.memo(Logs)
