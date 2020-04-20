import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory, useParams} from "react-router-dom";

export const EditToDoPage = () => {
  const history = useHistory()
  const {request} = useHttp()

  const [toDo, setToDo] = useState({
    title: '', description: '', dateExecution: ''
  })
  const toDoID = useParams().id;
  const {token} = useContext(AuthContext)
  useEffect(() => {
    window.M.updateTextFields() // make inputs active
  }, [])

  const changeHandler = event => {
    setToDo({ ...toDo, [event.target.name]: event.target.value })
  }

  const editToDo = async () => {
    try {
      await request(`/api/toDos/${toDoID}`, 'POST', toDo, {
        Authorization: `Bearer ${token}`
      })
      history.push(`/toDos`)
    } catch (e) {}
  }

  const fetchTodo = useCallback(async () => {
    try {
      const response = await request(`/api/toDos/${toDoID}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setToDo({ title: response.title, description: response.description, dateExecution: response.dateExecution })
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchTodo()
  }, [fetchTodo])

  return (
    <div className="row">
      <h2>Редактировать задание</h2>
      <div className="card blue darken-1">
        <div className="card-content white-text">
          <div className="input-field">
            <input
              placeholder="Введите название"
              id="title"
              type="text"
              name="title"
              className="yellow-input"
              value={toDo.title}
              onChange={changeHandler}
            />
            <label htmlFor="title" className="white-text">Название задание</label>
          </div>
          <div className="input-field">
            <textarea
              id="description"
              className="materialize-textarea yellow-input"
              placeholder="Введите описание"
              name="description"
              value={toDo.description}
              onChange={changeHandler}
            />
            <label htmlFor="description" className="white-text">Описание</label>
          </div>
          <div className="input-field">
            <input
              type="date"
              id="date"
              name="dateExecution"
              value={toDo.dateExecution}
              min={Date.now()}
              onChange={changeHandler}
            />
            <label htmlFor="description" className="white-text">Крайняя дата выполнения</label>
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn yellow darken-4"
            onClick={editToDo}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
};
