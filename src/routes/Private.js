import { useEffect, useState } from "react";
import {auth} from '../firebaseConnection';
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Private({children}){
  const [loading, setloading] =useState(true)
  const [signed, setSigned] =useState(false);

  useEffect(()=>{
    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, (user)=>{

        if(user){
          const dataUser = {
            uid: user.uid,
            email: user.email
          }

          localStorage.setItem('@detailUser', JSON.stringify(dataUser))
          setloading(false)
          setSigned(true)
        } else{
          setloading(false)
          setSigned(false)
        }

      })
    }

    checkLogin();
  },[])

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed){
    toast.warn('Faça login');
    return <Navigate to='/'/>
  }

  return children;
}