import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import './home.css';

import {auth} from '../../firebaseConnection';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from "react-toastify";

function Home(){

  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('')

  const navigate = useNavigate();

async  function handleLogin(e){
    e.preventDefault()

    if(email !== '' && password !==''){
      await signInWithEmailAndPassword(auth, email, password)
      .then(() =>{
        navigate('/admin', {replace: true})
        toast.success('Logado com sucesso')
      })
      .catch((error) =>{
        //lidar com error
        toast.error('Algo deu errado!')
      })

    }else{
      alert('Preenche tudo ai zé cu')
    }
  } 
  return(
    <div className="container">
      <h1 className="title">Bem-vindo à To-Do List</h1>
      <span className="subtitle">Organize suas tarefas de forma simples e eficiente</span>

      <form className="auth-container" onSubmit={handleLogin}>
        <label className="label">Email</label>
        <input 
          type="text" 
          placeholder="Digite seu email"
          value={email}
          onChange={ (e) => setEmail(e.target.value)}
          />

        <label className="label">Senha</label>
        <input 
          type="password" 
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
          />

        <button type="submit">Acessar</button>
      </form>
      <Link to='/register' className="navgation"> 
      Não possui uma conta ?</Link>
    </div>
  )
}


export default Home;