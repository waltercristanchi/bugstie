import React from 'react'
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router';
 import {db} from '../firebase-config'
 import { getDatabase, ref, child, get } from "firebase/database";

import {collection, getDocs, addDoc, query, where} from 'firebase/firestore'
import Header from './Header';
const Bug = () => {
  const {id} = useParams()
  const dbRef = ref(getDatabase());  
    const [bugs, setBugs]=useState([])
    const getBugs = async ()=>{
      try {
             
  await get(child(dbRef, `users/${id.replace(/-/g, "") }`)).then((snapshot) => {
    var newBugs = []
    for(var i =0; i<1; i++){
      newBugs.push(
        {
          nombre: snapshot.val().nombre,
          codigo_error: snapshot.val().codigo_error,
          descripcion: snapshot.val().descripcion,
          ultima_actualizacion: snapshot.val().ultima_actualizacion,
          imgUrl: snapshot.val().imgUrl
        }
    
      )
    }
   console.log(newBugs)
   setBugs(newBugs)
  }).catch((error) => {
    console.error(error);
  });
  
      } catch(e){
        console.log(e)
      }
    }
  
  
  
  
    useEffect(()=>{
      getBugs()
  
    }, [])
  

    return (
        <div>
        {bugs.map((bug)=>(
           <div className="bug">
                <div className="bug-header">
                <h2>{bug.nombre}</h2>
                 <span>Sistema de Admision</span>
                </div>
                <p>Codigo de error: <b>{bug.codigo_error}</b></p>
                <p>Descripcion: <b>{bug.descripcion}</b></p>
                <div className="bugImgContainer">
                    <span>Imagen de referencia</span>
                    <img width="50%" height="50%" src={bug.imgUrl} alt="" />
                </div>
                <p>Posible causa: <b> {bug.codigo_error}</b></p>
                <p>Sentencia para replicar el error:<b>{bug.sentencia_consulta}</b></p>
                <p>Sentencia para solucionar el error: </p>
               <p>Documentacion de referencia:</p>
               <a target="_blank" href={bug.ticketUrl}>Descargar Ticket</a>
               <a href="">Documentación:</a>

           </div>
        ))}
       
        </div>
    )
}

export default Bug
