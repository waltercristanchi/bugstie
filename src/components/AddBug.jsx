import React from 'react'
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {db, storage, reference, uBytes} from '../firebase-config'
import { getDatabase, ref, set } from "firebase/database";
import { getDownloadURL } from '@firebase/storage';
import Header from './Header';
const AddBug = () => {

    const [nombre, setNombre]=useState([])
    const [codigoError, setCodigoError]=useState([])
    const [descripcion, setDescripcion]=useState([])
    const [causas, setCausas]=useState([])
    const [sentencia, setSentencia]=useState([])
    const [solucion, setSolucion]=useState([])

    const [imgUrl, setImgUrl] = useState(null)
    const [ticket, setTicket] = useState(null)
    const db = getDatabase();


    const uploadImage = async ()=>{
       const archivo = imgUrl
       const archivoRef = reference(storage, `imagenes/${archivo.name}`)
       await uBytes(archivoRef, archivo)
       const urlDescarga = getDownloadURL(archivoRef)
 
       console.log(await urlDescarga)

     


       addNewBug(await urlDescarga)
    }
    const addNewBug = async (imgUrl) =>{
      try {
await  set(ref(db, 'users/' + codigoError), {
    nombre: nombre,
    codigo_error: codigoError,
    descripcion : descripcion,
    causas: causas,
    sentencia: sentencia,
    solucion: solucion,
    imgUrl: imgUrl,
    ultima_actualizacion: Date.now()
    
  })
  .then(() => {
    console.log("correcto")
    window.location.href = "/errores"
   })
   .catch((error) => {
    console.log(error)
   });
      } catch(e){
        console.log(e)
      }
}

    return (
      <div>
           <div className="addBug">
         <h4>Añadir un nuevo bug</h4>   
        <input placeholder="Nombre" onChange={(event) =>{
          setNombre(event.target.value)
        }}></input>
         <input placeholder="Codigo de error" onChange={(event) =>{
          setCodigoError(event.target.value)
        }}></input>
         <input placeholder="Descripcion" onChange={(event) =>{
          setDescripcion(event.target.value)
        }}></input>
        <label htmlFor="imgInput">Imagen del error</label>
           <input name="imgInput" id="imgInput" type="file" placeholder="imagen" onChange={(event) =>{
          setImgUrl(event.target.files[0])
        }}></input>
         <input placeholder="Causas" onChange={(event) =>{
          setCausas(event.target.value)
        }}></input>
         <input placeholder="Sentencia Sql" onChange={(event) =>{
          setSentencia(event.target.value)
        }}></input>
            <input placeholder="Solucion" onChange={(event) =>{
          setSolucion(event.target.value)
        }}></input>
            <label htmlFor="imgInput">Ticket</label>
           <input name="ticketInput" id="ticketInput" type="file" placeholder="Ticket" onChange={(event) =>{
          setTicket(event.target.files[0])
        }}></input>
        <button className="button" onClick={uploadImage}>Añadir Bug </button>
  
      </div>  
      </div>
     
    )
}

export default AddBug
