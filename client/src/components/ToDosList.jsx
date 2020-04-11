import React from 'react'
import {Link} from 'react-router-dom'

export const ToDosList = ({ toDos }) => {
  if (!toDos.length) {
    return <p className="center">Дел нет, займитесь чем-то</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>Задание</th>
        <th>Описание</th>
        <th>Статус</th>
        <th>Дата создание</th>
        <th>Срок выполнения</th>
      </tr>
      </thead>

      <tbody>
      { toDos.map((toDo, index) => {
        return (
          <tr key={toDo._id}>
            <td>{toDo.title}</td>
            <td>{toDo.description}</td>
            <td>{toDo.status}</td>
            <td>{toDo.dateCreation}</td>
            <td>{toDo.dateCreation}</td>
            <td>
              <button className="waves-effect waves-teal btn-flat">
                <Link to={`/toDos/${toDo._id}`}>Редактировать</Link>
              </button>
            </td>
            <td>
              <button className="waves-effect waves-teal btn-flat">Удалить</button>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
