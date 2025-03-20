import React, {useState, useEffect} from "react";
import { auth, db} from "../../firebaseConnection";
import { signOut } from "firebase/auth";

import { 
  addDoc,
  collection
} from "firebase/firestore";

import './admin.css'
import { toast } from "react-toastify";

export default function Admin(){
  const [tarefaInput, setTarefaInput] =useState('')
  const [user, setUser] = useState({});

  useEffect(() =>{
    async function loadUser() {
      const userDetail = localStorage.getItem('@detailUser');
      setUser(JSON.parse(userDetail))
    }

    loadUser()
  },[])

  async function handleTarefa(e){
    e.preventDefault()
    if(tarefaInput === '') {
      toast.error('Preencha todos os campos')
      return;
    }

    await addDoc(collection(db, "tarefas"),{
      tarefa: tarefaInput,
      createdAt: new Date(),
      userId: user?.uid
    })
    .then(()=>{
      toast.success(`tarefa: ${tarefaInput}  cadastrada` )
      setTarefaInput('')
    })
    .catch((error)=>{
      toast.error(error + 'error ao cadastrar')
    })


  }

  async function handleLogout() {
    await signOut(auth);
  }
  return(
    <div className="admin-container">
      <h1>Minhas tarefas</h1>

      <form className="form" onSubmit={handleTarefa}>
        <textarea
          placeholder="crie aqui sua tarefa"
          value={tarefaInput}
          onChange={(e)=> setTarefaInput(e.target.value)}

        />
        <button className="btn-register" type="submit">Registrar tarefa</button>
      </form>

      <article className="list">
        <p>Estudar java hoje a noite</p>
        <div>
          <button className="btn-editar">Editar</button>
          <button className="btn-delete">Concluir</button>
        </div>
      </article>

      <button className="btn-sair" onClick={handleLogout}>Sair</button>

    </div>
  )
}