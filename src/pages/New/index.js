import React, {useState, useMemo} from 'react'
import './new.css'
import api from '../../services/api'
import camera from '../../assets/camera.svg'

export default function New({history}){
    const [company, setcompany] =  useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)


    //pegando a foto e criando um preview, e incluindo ele via CSS
    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    },[thumbnail])

    async function handlerSubmit(event){
        event.preventDefault();

        //para enviar arquivos, por fora de jason, precisamos criar um FormData e ir dando append nos arquivos
        const data = new FormData()

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('price', price)
        data.append('techs', techs)


        const user_id =  localStorage.getItem('user')
        await api.post('/spots',data, {headers:{user_id}})
        
        history.push('/dashboard')

    }
    
    return(
        <form onSubmit={handlerSubmit}>
            <label id="thumbnail" style={{backgroundImage:`url(${preview})`}} className={thumbnail ? 'has-thumbnail' : ''}> 
                <input type='file' onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt='Entrada Spot'></img>
            </label>
            <label htmlFor="company">Empresa *</label>
            <input 
                id='company'
                placeholder="Sua empresa favorita"
                value = {company}
                onChange={event => setcompany(event.target.value)}
            />
            <label htmlFor='techs'>Tecnologias *<span>(separado por virgula)</span></label>
            <input
                id="techs"
                placeholder="Sua Tecnologia"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor='price'>Preço: <span>(Em branco caso seja Gratuito)</span></label>
            <input
                id='price'
                placeholder='Valor por dia'
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button className="btn">Cadastrar</button>
            
            
            
        </form>
    )
}