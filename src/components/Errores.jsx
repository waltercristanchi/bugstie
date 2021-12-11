


import React from 'react'
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
 import { getDatabase, ref, child, get } from "firebase/database";

 const Errores = () => {
    const [bugs, setBugs]=useState([])
    const [searchTerm, setSearchTerm] = useState("")  
    const [toSearch, setToSearch] =useState([])

    const dbRef = ref(getDatabase());
    const getBugs = async ()=>{ 
      try{
        await get(child(dbRef, `users/`)).then((snapshot) => {
          var newBugs = []
          console.log(snapshot.val())
          snapshot.forEach(el=>{
            console.log(el)
           newBugs.push(
             {
               nombre: el.val().nombre,
                codigo_error: el.val().codigo_error,
               descripcion: el.val().descripcion,
               ultima_actualizacion: el.val().ultima_actualizacion
             }
    
           )
          })
           setBugs(newBugs)
          }).catch((error) => {
            console.error(error);
          });
      } catch(e){
        console.log(e)
      }


    }
    const buscarErrores = async () =>{
      await get(child(dbRef, `users/`)).then((snapshot) => {
        let documentos = []
        snapshot.forEach(el=>{
         Object.entries(el.val()).forEach(([key, value])=>{
          if (value.ref!=undefined){
            documentos.push({nombre: value.ref, pertenece_a: value.pertenece_a})
          }
         })
        })
        setToSearch(documentos)
      }).then(()=>{
        console.log("correcto")
      }).catch((error)=>{
        console.error(error)
      })
     
    }

  
    useEffect(()=>{
      getBugs()      
    }, [searchTerm])
  

    return (
     
    <div className="bugs-container">
         <div className="topbar">
      <div className="search">
     <input onChange={buscarErrores()} type="text" placeholder="buscar documentacion..." onChange={(e)=>setSearchTerm(e.target.value)} />
    <div className="result">
    {bugs.filter((val)=>{
        if (searchTerm==""){
          return ''
        } else if (val.nombre.toLowerCase().includes(searchTerm.toLowerCase())||val.codigo_error.toLowerCase().includes(searchTerm.toLowerCase())){
          console.log(val.nombre)
          return val
        }
      }).map((bug)=>(
       <Link to={'/bug/' + bug.codigo_error}>{bug.nombre}<br/></Link>

    ))
}
    </div>

   </div>
   <a href="/bug/addBug">Añadir Error +</a>

   </div>
  
     <div className="errors-filter">
       <label htmlFor="select-errors-filter">Filtrar por codigo de error:</label>
       <select name="select-errors-filter" className="select-errors-filter" id="">
         <option value="Todos">Todos</option>
         <option value="">Error 500</option>
         <option value="">Error 404</option>
         <option value="">Error 400</option>
         <option value="">Error 505</option>
       </select>
     </div>
     <table id="customers">

      <tr>
        <th>Nombre</th>
       <th>Codigo de Error</th>
        <th>Descripcion</th>
        <th>Usuario Asignado</th>
        <th>Usuario que reporta</th>
       <th>Ultima Actualizacion</th>
    </tr>

   
{bugs.map((bug)=>(

<tr>
<td><Link to={'/bug/'+bug.codigo_error}>{bug.nombre}</Link></td>
  <td><Link to={'/bug/'+bug.codigo_error}>{bug.codigo_error}</Link></td>
  <td>{bug.descripcion}</td>
  <td></td>
  <td></td>
  <td>{bug.ultima_actualizacion}</td>
</tr>
))}
     </table>

    </div>
    )
}

export default Errores