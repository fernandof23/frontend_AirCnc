import React, {useState} from 'react'
import api from '../../services/api'


export default function Login({history}){
    //pegando o e-mail do form... usando o useState
    const[email, setEmail] = useState('')

    //quando der o submit do form.. fazer essa função
    async function handleSubmit(event){
        //preventDefault garante que ao clicar no button submit, o sistema nao tentara me mover para outra url
        event.preventDefault()
        //agora vamos enviar para a api o nosso e-mail, para fazer o cadastro, e pegar o ID no retorno
        const response = await api.post('/users', {email:email})
        const {_id} = response.data
        localStorage.setItem('user', _id)   
        
        history.push('/dashboard')       
        
    }

    return(
        <> 
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL: *</label>
            <input type="email"
            id="email"
            placeholder="Seu Melhor E-mail"
            //função onChange que pega o e-mail e entrega pro meu useState
            onChange = {event => setEmail(event.target.value)}/>
            <button className="btn">Entrar</button>
            
            
            </form>
        </>
    )
}