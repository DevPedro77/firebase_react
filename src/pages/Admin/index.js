import React, {useState, useEffect} from "react";
import { auth, db} from "../../firebaseConnection";
import { signOut } from "firebase/auth";

import { 
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import './admin.css'
import { toast } from "react-toastify";

export default function Admin(){
  const [tarefaInput, setTarefaInput] =useState('')
  const [user, setUser] = useState({});
  const [tarefas, setTarefas] =useState([]);
  const [edit, setEdit] =useState({})


  useEffect(() =>{
    async function loadUser() {
      const userDetail = localStorage.getItem('@detailUser');
      console.log(userDetail)
      setUser(JSON.parse(userDetail))

      if(userDetail){
        //buscar tarefas do usuario filtrando pelo id
        const data = JSON.parse(userDetail);
        const tarefaRef = collection(db, "tarefas");
        const q = query(tarefaRef, orderBy("createdAt", "desc"), where("userId", "==", data?.uid)) //query pra buscar
        const unsub = onSnapshot(q, (snapshot)=>{
          let lista = [];

          snapshot.forEach((doc) =>{
            lista.push({
              id: doc?.id,
              tarefa: doc?.data().tarefa,
              userId: doc?.data().userId
            })
          })

          setTarefas(lista)
        })
      }
    }

    loadUser()
  },[])

  async function handleTarefa(e){
    e.preventDefault()
    if(tarefaInput === '') {
      toast.error('Preencha todos os campos')
      return;
    }

    if(edit?.id){
      handleUpdateTarefa()
      return;
    }

    await addDoc(collection(db, "tarefas"),{
      tarefa: tarefaInput,
      createdAt: new Date(),
      userId: user?.uid
    })
    .then(()=>{
      toast.success("Tarefa cadastrada com sucesso!")
      setTarefaInput('')
    })
    .catch((error)=>{
      toast.error(error + 'error ao cadastrar')
    })


  }

  async function handleLogout() {
    await signOut(auth);
  }

  async function handleDelete(id) {
    const docRef = doc(db, "tarefas", id) //sempre referenciando o banco
    await deleteDoc(docRef);
    toast.success('Tarefa concluida')
  }

  async function editTarefa(item){
    setTarefaInput(item.tarefa)
    setEdit(item)
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, "tarefas", edit?.id)
    await updateDoc(docRef,{
      tarefa: tarefaInput
    })
    .then(()=>{
      setEdit({})
      setTarefaInput('')
      toast.success('Sua tarefa foi editada!')
    })
    .catch((error)=>{
      toast.error('Error ao atualizar sua tarefa' + error)
      setTarefaInput('')
    })
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

      
        {Object.keys(edit).length > 0 ? (
          <button className="btn-register" type="submit">Atualizar tarefa</button>
        ): (
          <button className="btn-register" type="submit">Registrar tarefa</button>
        )}
      </form>

    {tarefas.map((item) => (
          <article className="list" key={item.id}>
          <p>{item.tarefa}</p>
          <div>
            <button className="btn-editar" onClick={() => editTarefa(item)}>Editar</button>
            <button className="btn-delete" onClick={() =>handleDelete(item.id)}>Concluir</button>
          </div>
        </article>
    ))}

      <button className="btn-sair" onClick={handleLogout}>Sair</button>

    </div>
  )
}