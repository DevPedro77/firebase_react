import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './home.css';

function Home(){

  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('')
  return(
    <div className="container">
      <h1 className="title">Bem-vindo à To-Do List</h1>
      <span className="subtitle">Organize suas tarefas de forma simples e eficiente</span>

      <form className="auth-container">
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