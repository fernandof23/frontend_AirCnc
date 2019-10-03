import React from 'react'

// importando o gerenciados das rotas!!
import {BrowserRouter, Switch, Route} from 'react-router-dom'


//importando os modulos de paginas que criei no pages
import Login from './pages/Login'
import New from './pages/New'
import Dashboard from './pages/Dashboard'

//montando a estrutura das rotas.. para definir aonde vai puxar tudo que preciso!

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/new' component={New}/>
        </Switch>
        </BrowserRouter>
    )
}
