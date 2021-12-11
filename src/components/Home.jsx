import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import Header from './Header'
const Home = (props) => {
const [path, setPath] = useState('/')

useEffect(()=>{
 

  }, [])

    


    return (
      <div>
         
      <div className="induccion-section">
        
          <div className="posts">
              <div className="posts-header">
                <h2>Información util</h2>
              
                  <div className="induccion-search">
                    <input type="text" placeholder='buscar...' />
                  </div>
              </div>
              <div className="card-grid">
                <div className="card">
                    <h3>Jira</h3>
                    <p>Introducción a Jira</p>
                    <span>By: user</span>
                </div>
                <div className="card">
                    <h3>Jira</h3>
                    <p>Como cargar un ticket</p>
                    <span>By: user</span>
                </div>
                <div className="card">
                    <h3>Jira</h3>
                    <p>Como cargar una dt</p>
                    <span>By: user</span>
                </div>
                <div className="card">
                    <h3>Documentación</h3>
                    <p>Como cargar documentacion</p>
                    <span>By: user</span>
                </div>
                <div className="card">
                    <h3>Errores</h3>
                    <p>Como descargar un archivo sql</p>
                    <span>By: user</span>
                </div>
              </div>
          </div>
      </div>
      </div>
    )

    }
export default Home
