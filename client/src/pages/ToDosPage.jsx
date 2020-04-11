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
    console.log('fetchLinks');
    try {
      const fetched = await request('/api/toDos', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setToDos(fetched)
    } catch (e) {}
  }, [token, request])
  //
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
          <Link to={'/toDos/create/'}>Добавить задание</Link>
          <ToDosList toDos={toDos} />
        </Fragment>
      )}
    </Fragment>
  )
};
