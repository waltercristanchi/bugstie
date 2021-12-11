import './App.css';
import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Link

} from 'react-router-dom'
import Home from './components/Home'
import Bug from './components/Bug'
import AddBug from './components/AddBug';
import Login from './components/Login';


import Documentacion from './components/Documentacion';
import DocumentacionDetalle from './components/DocumentacionDetalle';
import AddDocumentacion from './components/AddDocumentacion';
import Errores from './components/Errores';
import Header from './components/Header';

import { useState } from 'react';
import {getAuth} from "firebase/auth";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
function App() {
  const auth = getAuth()
  const [user, setUser] = useState({})
  onAuthStateChanged (auth, (currentUser)=>{
    setUser(currentUser)
    console.log(user)
  })

  const login = async (email, password) =>{
    try{
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    // Signed in
    const user = userCredential.user;
    console.log(user)
    window.location.reload()
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    if (errorMessage == "Firebase: Error (auth/invalid-email)."){
      alert("El email ingresado es invalido o no tiene acceso a la app")
    } else if (errorMessage =="Firebase: Error (auth/wrong-password)."){
      alert("La contraseña ingresada no es correcta")
    } else{
      alert("Ha ocurrido un error")
    }
  });

    } catch(e){
      console.log(e)
    }
  }
  const logout = async () =>{
    try{
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
    catch(e){
      console.log(e)
    }
  }
  console.log(user)
    return (
    <Router>
    <div className="App">
    <Header logout={logout}/>
      <Routes>
        <Route exact path="/" element={user!=null ? <Home/> : <Login login={login}/>}/>
        <Route path="/bug/:id" element={user!=null ? <Bug/> : <Login login={login}/>}/>
        <Route path ="/bug/addBug" element={user!=null ? <AddBug logout={logout}/> : <Login login={login}/>}/>
        <Route path="/documentacion" element={user!=null ? <Documentacion logout={logout}/> : <Login login={login}/>}/>
        <Route path="/documentacion/:vertical" element={user!=null ? <DocumentacionDetalle logout={logout}/> : <Login login={login}/>}/>
        <Route path="/documentacion/subir-documentacion" element={user!=null ? <AddDocumentacion logout={logout}/> : <Login login={login}/>}/>
        <Route path="/errores" element={user!=null ? <Errores logout={logout}/> : <Login login={login}/>}/>
        <Route path='/login' element={<Login login={login}/>} />
      </Routes>

    </div>
    </Router>
  );
}

export default App;
