import React from 'react'
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router';
import Header from './Header';
import { getDatabase, ref, child, get } from "firebase/database";
import parse from 'html-react-parser'
const DocumentacionDetalle = () => {

var texto = window.location.href;
var posicionCaracter = texto.indexOf("#");
var documento = texto.substring(posicionCaracter+1, texto.length)  
  const {vertical} = useParams()
  const [selectedItem, setSelectedItem] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [toSearch, setToSearch] =useState([])

  const [id, setId] = useState(window.location.href)
  const [ifr, setIfr] = useState("")
  const [contentHtml, setContentHtml] = useState("a")
  const [categorias, setCategorias] = useState([])
  const [subCategorias, setSubCategorias] = useState([])
  const dbRef = ref(getDatabase());



  const obtenerDocumentos = (id, url, content) =>{
    console.log(content)
    if (url!=null && url!=undefined && url!=""){
      setIfr(url)

    }else{
      setIfr("")
      setContentHtml(String(content))
    }
    setSelectedItem(id)
    console.log(selectedItem)
  }
  const getCategorias = async ()=>{
  await get(child(dbRef, `documentacion/`)).then((snapshot) => {
    var newCategorias = []
    snapshot.forEach(el=>{
     newCategorias.push(el.val().ref)
     setCategorias(newCategorias)
     if (vertical.replace(/-/g, ' ')==el.val().ref.replace(/-/g, ' ')){
      obtenerDocumentos(el.val().ref, el.val().url)
    }
    })
  }).catch((error) => {
    console.error(error);
  });
  }
    
  const getSubCategorias = async ()=>{
    let categoria = vertical.replace(/-/g, " ")
await get(child(dbRef, `documentacion/${categoria}`)).then((snapshot) => {
          var newCategorias = []
        snapshot.forEach(el=>{
           newCategorias.push({nombre : el.val().ref, url: el.val().url, content: el.val().content})
        
           setSubCategorias(newCategorias)

           if (documento.replace(/-/g, ' ')==el.val().ref.replace(/-/g, ' ')){
            obtenerDocumentos(el.val().ref, el.val().url, el.val().content)
           }
        })


      }).catch((error) => {
       console.error(error);
      });
  }
  const buscarDocumentacion = async () =>{
    try {
      await get(child(dbRef, `documentacion/`)).then((snapshot) => {
        let documentos = []
        snapshot.forEach(el=>{
         Object.entries(el.val()).forEach(([key, value])=>{
          if (value.ref!=undefined){
            documentos.push({nombre: value.ref})
          }
         })
        })
        setToSearch(documentos)
      })
     
    } catch(e){
      console.log(e)
    }
    }
   
  useEffect(()=>{
    getCategorias()
    getSubCategorias()
  },[])

  

    return (
   <div>
        <div className="topbar">
           <div className="search">
             <input onChange={buscarDocumentacion()} type="text" placeholder="buscar documentacion..." onChange={(e)=>setSearchTerm(e.target.value)} />
           <div className="result">
      {
         toSearch.filter((val)=>{
          if (searchTerm==""){
            return ""
          } else if (val.nombre.toLowerCase().includes(searchTerm)){
            console.log(val.nombre)
            return val
          } else{
            return ""
          }
        }).map((el)=>(
          <p className="">{el.nombre}</p>
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
                <li className={vertical.replace(/-/g, " ") ==el? 'selected-item' : ''}>
                  <a href={'/documentacion/'+el.replace(/ /g, "-")}>{String(el).toUpperCase()}</a>
                <ol>
                  {
                    vertical.replace(/-/g, " ") ==el ?
                  subCategorias.map(el1=>(
                    <li className={el1.nombre==selectedItem? 'selected-item' : ''}>{<Link onClick={()=>obtenerDocumentos(el1.nombre, el1.url, el1.content)} to={'/documentacion/'+el.replace(/ /g, "-")+'/#' + String(el1.nombre).replace(/ /g, "-")}>{el1.nombre}</Link>}</li>
                  )): ''}
                </ol>
                </li>
              ))}
            </ul>
          </nav>
         
         
           <div className="consulta-detalle">
           {ifr!="" ? 
          <iframe src={ifr} height="100%" width="100%" title="Iframe Example"></iframe>
          :
          <div>
            {parse(contentHtml)}
          </div> 
          }

    </div>
        </div>

       
        </div>
    )
}

export default DocumentacionDetalle