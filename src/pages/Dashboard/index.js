import React, {useEffect, useState, useMemo} from 'react' // chamando o useEffect para criar o visualizador
import {Link} from 'react-router-dom'
import api from '../../services/api'
import './dash.css'
//Importando no cliente, no front, o socket.io-client, para conectar diretamente com o FrontEnd
import socketio from 'socket.io-client'


export default function Dashboard(){
    //função useState, recebe 2 parametros, e recebe o q retorno do back, no nosso caso um array
    const [spot, setSpot] = useState([])
    //essa request, é a requisição e resposta do socketIO, que recebemos no useEffect
    const [request, setRequest] =  useState([])

    //pegando o usuario que esta logado na seção, e colocando na variavel user_id, que sera passada como parametro no sockeio, para o backend
    const user_id = localStorage.getItem('user')
    
       //Aqui vamos chamar o socketio, passando o ip do nosso backend
    const socket = useMemo(()=> socketio('http://192.168.20.110:3333', {
        query:{user_id},
    }),[user_id])

    useEffect(()=>{
        //aqui estamos escutando o que vem do back end, na variavel booking_request, e entregando para o data
        socket.on('booking_request', data_spot =>{
            setRequest([...request, data_spot])
        })
    },[request, socket])


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

    async function handleApproved(id){
        await api.post(`booking/${id}/approvals`)
        //conferindo se o ID aprovado, é igual o que esta na tela, e se for vdd, ele retira da tela
        setRequest(request.filter(request => request._id !== id))
        console.log("Reserva Confirmada")

    }

    async function handleReject(id){
        await api.post(`booking/${id}/rejects`)
        setRequest(request.filter(request => request._id !== id))
        console.log("Reserva RECUSADA")

    }

    return(
        <>
            <ul className='notification'>
                {request.map(request =>(
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data <strong>{request.date}</strong>
                        </p>
                        <button className="approved" onClick={()=> handleApproved(request._id)}>Aceitar</button>
                        <button className="reject" onClick={()=> handleReject(request._id)} >Rejeitar</button>
                    </li>
                ))}

            </ul>
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