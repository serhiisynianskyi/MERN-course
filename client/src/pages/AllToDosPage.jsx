import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {ToDosList} from '../components/ToDosList'
import {Link} from "react-router-dom";

export const AllToDosPage = () => {
  const [toDos, setToDos] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [owner, setOwner] = useState('')

  const fetchTodos = useCallback(async () => {
    try {
      console.log('fetchAllTodos');
      const fetched = await request('/api/toDos/allToDos', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setToDos(fetched.records)
      setOwner(fetched.owner)
    } catch (e) {}
  }, [token, request])

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
          <h2>Список всех пользователей</h2>
          <ToDosList toDos={toDos} owner={owner}/>
        </Fragment>
      )}
    </Fragment>
  )
};
