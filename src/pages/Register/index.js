import React, {useState, useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import {auth} from '../../firebaseConnection';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { toast } from "react-toastify";

function Register(){

  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('')

  const navigate = useNavigate();

  async function handleRegister(e){
    e.preventDefault()

    if(email !== '' && password !==''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() =>{
        navigate('/admin', {replace:true})
        toast.success('Conta criada com sucesso!')
      })
      .catch((error) =>{
        toast.error('Algo deu errado!')
      })

    }else{
      alert('Preenche tudo ai zé cu')
    }
  } 
  return(
    <div className="container">
      <h1 className="title">Crie sua nova conta</h1>
      <span className="subtitle">Crie sua conta e organize sua vida</span>

      <form className="auth-container" onSubmit={handleRegister}>
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

        <button type="submit">Cadastrar</button>
      </form>
      <Link to='/' className="navgation">
        Já possui uma conta?
      </Link>
    </div>
  )
}


export default Register;