import React from 'react'
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {db, storage, reference, uBytes} from '../firebase-config'
import { getDatabase, ref, set } from "firebase/database";
import {child, get } from "firebase/database";

import { getDownloadURL } from '@firebase/storage';
import Header from './Header';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import parse from 'html-react-parser'
const AddDocumentacion = () => {
    const [isPdfUpload, setIsPdfUpload] = useState(false)
    const [editorContent, setEditorContent] = useState('')
    const [textContent, setTextContent] = useState('')
    const[badgeColor, setBadgeColor] = useState("")
    const[badgeContent, setBadgeContent] = useState("")

    const [nombre, setNombre]=useState([])
    const [categoria, setCategoria]=useState("Admisión y Administración")

    const [imgUrl, setImgUrl] = useState(null)
 

    const uploadImage = async ()=>{
       const archivo = imgUrl
       const archivoRef = reference(storage, `contenido/${archivo.name}`)
       await uBytes(archivoRef, archivo)
       const urlDescarga = getDownloadURL(archivoRef)
 
       console.log(await urlDescarga)

     


       addNewBug(await urlDescarga)
    }
    const addNewBug = async (imgUrl) =>{
 

      const db = getDatabase();
      
  set(ref(db, 'documentacion/' + categoria + '/' + nombre), {
    ref: nombre,
    categoria: categoria,
    url: imgUrl,
    ultima_actualizacion: Date.now()
    
  })
  .then(() => {
    console.log("correcto")
    window.location.href="/documentacion"
   })
   .catch((error) => {
    console.log(error)
   });
}
const uploadDoc = async () =>{
 
        const db = getDatabase();
    
        set(ref(db, 'documentacion/' + categoria + '/' + nombre), {
            ref: nombre,
            pertenece_a: categoria,
            content: editorContent
          
        }).then(()=>{
            console.log("correcto")
            setBadgeColor("green")
            setBadgeContent("La documentación se subio correctamente")
            setTimeout(()=>{
                setBadgeContent("")
            }, 2000)
        })
        .catch((error)=>{
            console.log(error)
        })
       
       
    

}

  useEffect(()=>{

  }, [])


    if (isPdfUpload){
        return (
            <div>
                 <div className="addBug">
               <h4>Añadir Documentacion</h4>   
              <input placeholder="Nombre" onChange={(event) =>{
                setNombre(event.target.value)
              }}></input>
              <label htmlFor="categorial">Categoria</label>
              <select name="categoria" id="categoria"  onChange={(event) =>{
                setCategoria(event.target.value)
              }}>
                  <option value="Admisión y Administración">Admision y Administracion</option>
                  <option value="Sistema de Evaluaciones">Sistema de Evaluaciones</option>
                  <option value="Sistema Algarrobo">Sistema Algarrobo</option>
                  <option value="EPagos">E-Pagos</option>
                  <option value="Tickets">Tickets</option>

              </select>
              <div style={{display : 'flex'}}>
              <label htmlFor="imgInput">Archivo con la documentacion (pdf o html)</label>
                 <input name="imgInput" id="imgInput" type="file" placeholder="imagen" onChange={(event) =>{
                setImgUrl(event.target.files[0])
              }}></input>
              </div>
              
              <button className="button" onClick={uploadImage}>Añadir Documentacion </button>
              <button className="" onClick={()=>setIsPdfUpload(false)}>Editor de texto</button>

        
            </div>  
            </div>
           
          )
    } else {
        return (
            <div className="rich-text-editor">
                <div className={badgeColor=="green" ? "badge badge-green" : "badge badge-red"}>{badgeContent}</div>
                <h2>Subir Documentación</h2>
               <div className="editor">
                <div className="doc-data">
                <label htmlFor="nombre">Nombre de la documentación</label>

                <input placeholder="Nombre" onChange={(event) =>{
                setNombre(event.target.value)
              }}></input>
              <label htmlFor="categorial">Categoria</label>
              <select name="categoria" id="categoria"  onChange={(event) =>{
                setCategoria(event.target.value)
              }}>
                  <option value="Admisión y Administración">Admision y Administracion</option>
                  <option value="Sistema de Evaluaciones">Sistema de Evaluaciones</option>
                  <option value="Sistema Algarrobo">Sistema Algarrobo</option>
                  <option value="EPagos">E-Pagos</option>
                  <option value="Tickets">Tickets</option>

              </select>
                </div>
               <CKEditor 
                editor={ClassicEditor}
                data={editorContent}
                onChange={(event, editor)=>{
                    const data = editor.getData()
                    setEditorContent(data)
                }}
                ></CKEditor>
                <div className={"rich-text-editor_buttons"}>
                <button className="button" onClick={()=>uploadDoc()}>Añadir Documentación</button>
                <button className="" onClick={()=>setIsPdfUpload(true)}>Subir Archivo Pdf</button>

                </div>
               </div>
              
            </div>
        )
    }
   
}

export default AddDocumentacion
