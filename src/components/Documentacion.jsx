import React from 'react'
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'

import Header from './Header';
import { getDatabase, ref, child, get,  getChildren} from "firebase/database";

const Documentacion = () => {
  const [vertical, setVertical] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [toSearch, setToSearch] =useState([])
  const [selectedItem, setSelectedItem] = useState("")
  const [id, setId] = useState(window.location.href)
  const [ifr, setIfr] = useState()
  const [categorias, setCategorias] = useState([])
  const getCategorias = ()=>{
   try {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `documentacion/`)).then((snapshot) => {
    var newCategorias = []
    snapshot.forEach(el=>{
      console.log(el.val().ref)
     newCategorias.push(el.val().ref)
    })
    setCategorias(newCategorias)
    
    }).catch((error) => {
    alert("Se ha producido el siiguiente error: " + error)
    });
   } catch(error){
     console.log(error)
   }
  }
const buscarDocumentacion = () =>{
  console.log("hola")
  const dbRef = ref(getDatabase());
  get(child(dbRef, `documentacion/`)).then((snapshot) => {
    let documentos = []
    snapshot.forEach(el=>{
     Object.entries(el.val()).forEach(([key, value])=>{
      if (value.ref!=undefined){
        documentos.push({nombre: value.ref, pertenece_a: value.pertenece_a})
      }
     })
    })
    setToSearch(documentos)
  })
 
}
  const obtenerDocumentos = (id) =>{
    if(id=="equivalencias"){
      setIfr('https://firebasestorage.googleapis.com/v0/b/bugsita-6b03e.appspot.com/o/carga-equivalencias.html?alt=media&token=9debee30-101c-4ff5-a89b-431b8ee36d1b')
      setSelectedItem('equivalencias')
    }
    else if (id=="epagos"){
      setIfr('https://firebasestorage.googleapis.com/v0/b/bugsita-6b03e.appspot.com/o/Pago-Electr%C3%B3nico-Documentaci%C3%B3n-de-Errores-_1__1.html?alt=media&token=55620a7d-5366-4b6e-8467-dd44bb85507a')
      setSelectedItem('epagos')

    }
  }
   
    
 
  useEffect(()=>{
    getCategorias()
  }, [])

  

    return (
        <div>
   <div className="topbar">
      <div className="search">
     <input onChange={buscarDocumentacion()} type="text" placeholder="buscar documentacion..." onChange={(e)=>setSearchTerm(e.target.value)} />
    <div className="result">
      {
         toSearch.filter((val)=>{
          if (searchTerm==""){
            console.log("term ")
            return ""
          } else if (val.nombre.toLowerCase().includes(searchTerm)){
            console.log(val.nombre)
            return val
          } else{
            return ""
          }
        }).map((el)=>(
         el.pertenece_a ? 
         <Link to={'/documentacion/'+ el.pertenece_a.replace(/ /g, "-") + '/#' + el.nombre.replace(/ /g, "-")}>{el.nombre}</Link>
         : 
         <p>{el.nombre}</p>
        ))
      }
    </div>

   </div>
   <a href="/documentacion/subir-documentacion">Añadir Documentación +</a>

   </div>
  
  
          <div className="consultas">
          <nav className="sidebar">
            <ul>
              {categorias.map(el=>(
                <li><Link to={'/documentacion/'+el.replace(/ /g, "-")}>{el.toUpperCase()}</Link></li>
              ))}
            </ul>
          </nav>
                <div className="consultas-faqs">
                <h2>Introduccion
                </h2>
                <p>En esta pagina vas a enonctrar documentacion tanto de los procesos y de la base de datos</p>
                <br />
                <h3>Documentacion mas importante</h3>
                <br />
                <br />
                <h4>Algarrobo</h4>
                <p>Toda la documentacion relacionada al SIS           </p>
                <Link to={'/documentacion/Sistema-Algarrobo'}>--Ver documentacion</Link>
                <h4>Anulacion de Tickets</h4>
                <p>Se muestran todos los requisitos que se necesitan y las condiciones para poder anular un ticket. </p>
                <a href="">--Ver documentacion</a>

                </div>
               
        </div>
             
       
        </div>
    )
}

export default Documentacion