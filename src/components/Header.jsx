import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
const [path, setPath] = useState('/')
const navigate = useNavigate();

useEffect(()=>{
  if (window.location.href.includes('/documentacion')){
      setPath('/documentacion')
  } else if (window.location.href.includes('/errores') || window.location.href.includes('/bug')){
        setPath('/errores')
    }
    
     else{
            setPath('/')
        
    }
  

  })

    


    return (
        <header>
        
                <nav className="main-nav">
                {window.location.href.includes('/bug')? 
        <span onClick={() => navigate(-1)}>&#10094;</span> :
        <span></span>
        }
        <ul>
          <li   className={path=="/" ? 'selected-item' : ''}>  <Link onClick={()=>setPath('/')} to="/">Inicio</Link>
          </li>
          <li className={path=="/documentacion" ? 'selected-item' : ''}>  <Link onClick={()=>setPath('/documentacion')} to="/documentacion">Documentación</Link>
          </li>
          <li className={path=="/errores" ? 'selected-item' : ''}>  <Link onClick={()=>setPath('/errores')} to="/errores">Errores</Link>
          </li>
          <li><button onClick={()=>props.logout()}>Salir</button></li>
        </ul>

        
      </nav>
        </header>
    )

    }
export default Header
