import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {ToDosList} from '../components/ToDosList'
import {Link} from "react-router-dom";

export const ToDosPage = () => {
  const [toDos, setToDos] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchTodos = useCallback(async () => {
    try {
      const fetched = await request('/api/toDos', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setToDos(fetched)
    } catch (e) {}
  }, [token, request])

  const deleteItem = useCallback(async (id) => {
    const fetched = await request('/api/toDos/delete', 'POST', {id}, {
      Authorization: `Bearer ${token}`
    })
    setToDos(fetched)
  }, [toDos])


  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) {
    return <Loader/>
  }

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <h2>Мой список дел</h2>
          <div className="controls">
            <Link to={'/toDos/create/'}>Добавить задание</Link>
            <Link to={'/toDos/allToDos/'}>Список заданий всех пользователей</Link>
          </div>
          <ToDosList toDos={toDos} deleteItem={deleteItem}/>
        </Fragment>
      )}
    </Fragment>
  )
};
