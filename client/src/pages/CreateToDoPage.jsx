import React, { useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from "react-router-dom";

export const CreateToDoPage = () => {
  const history = useHistory()
  const {request} = useHttp()
  const [toDo, setToDo] = useState({
    title: '', description: '', dateExecution: ''
  })
  const {token} = useContext(AuthContext)

  useEffect(() => {
    window.M.updateTextFields() // make inputs active
  }, [])

  const changeHandler = event => {
    setToDo({ ...toDo, [event.target.name]: event.target.value })
  }

  const createToDo = async () => {
    console.log('createToDo');
    try {
      await request('/api/toDos/create', 'POST', toDo, {
        Authorization: `Bearer ${token}`
      })
      history.push(`/toDos`)
    } catch (e) {}
  }

  return (
    <div className="row">
      <h2>Создать задание</h2>
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
            onClick={createToDo}
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  )
};
