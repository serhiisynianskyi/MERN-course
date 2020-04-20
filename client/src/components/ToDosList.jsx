import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const ToDosList = ({ toDos, deleteItem, owner }) => {
  const {token} = useContext(AuthContext)
  if (!toDos.length) {
    return <p className="center">Дел нет, займитесь чем-то</p>
  }
  console.log(token);
  console.log('RENDER');
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
      { toDos.map((toDo) => {
        return (
          <tr
            className={(owner && toDo.owner === owner) ? 'blue lighten-3' : ''}
            key={toDo._id}
          >
            <td>{toDo.title}</td>
            <td>{toDo.description}</td>
            <td>{toDo.status}</td>
            <td>{toDo.dateCreation}</td>
            <td>{toDo.dateExecution}</td>
            <td>
              {
                !owner ?
                  (<button className="waves-effect waves-teal btn-flat">
                    <Link to={`/toDos/${toDo._id}`}>Редактировать</Link>
                  </button>) : null
              }
            </td>
            <td>
              {
                !owner ?
                  (<button
                    className="waves-effect waves-teal btn-flat"
                    onClick={() => deleteItem(toDo.code)}
                  >
                    Удалить
                  </button>) : null
              }
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
