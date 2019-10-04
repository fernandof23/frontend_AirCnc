import React, {useEffect, useState} from 'react' // chamando o useEffect para criar o visualizador
import {Link} from 'react-router-dom'
import api from '../../services/api'
import './dash.css'


export default function Dashboard(){
    //função useState, recebe 2 parametros, e recebe o q retorno do back, no nosso caso um array
    const [spot, setSpot] = useState([])
    //o use effect tem como parametros 2 itens
    //uma função que sera executada
    //e um array de itens que sera monitorado, e sempre que modificados, a função sera executada
    //o useEffect nao precisa ser chamado, ele sempre fica execurando e atualizando
    useEffect(()=>{
        //precisamos buscar nossos spots no banco, e o use effect nao aceita o ASYNC, então criaremos uma função interna com o async
        async function spotLoads(){
            //pegando o id logado no localhost do navegador
            const user_id = localStorage.getItem('user')
            //enviando uma requisição get para a api, passando o usuario no headers
            const response = await api.get('/dashboard', {headers : {user_id}})
            setSpot(response.data)
            
        }
        spotLoads()
    })

    return(
        <>
        <ul className="spot-list">
            {spot.map(spot=>(
                <li key={spot._id}> 
                    <header style={{backgroundImage:`url(${spot.thumbnail_url})`}}/>
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$${spot.price}/dia` : "Gratuito"}</span>
                </li>
            ))}
        </ul>
        {/* A tag link, foi importada do react-router-dom, e serve para guiar para a outra pagina apos clicar no botão */}
        <Link to='/new'>
        <button className="btn">Cadastrar Novo</button>
        </Link>
        </>
    )
}