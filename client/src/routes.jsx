import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import {ToDosPage} from './pages/ToDosPage'
import {CreateToDoPage} from './pages/CreateToDoPage'
import {AllToDosPage} from './pages/AllToDosPage'
import {EditToDoPage} from './pages/EditToDoPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/toDos" exact>
          <ToDosPage />
        </Route>
        <Route path="/toDos/create" exact>
          <CreateToDoPage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/toDos/allToDos">
          <AllToDosPage />
        </Route>
        <Route path="/toDos/:id">
          <EditToDoPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
