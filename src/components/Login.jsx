


import React, { useState } from 'react'

const Errores = (props) => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


    return (
     
        <div className="login">
            <label htmlFor="">Iniciar Sesión</label>
            <input type="text" placeholder="email" name="email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={()=>props.login(email, password)}>Loguearse</button>

        </div>
    )
}

export default Errores