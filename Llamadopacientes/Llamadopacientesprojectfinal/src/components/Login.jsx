import huellaLogin from '../images/huella-Login.png'
import { sanitizeInput } from "../models/sanitizeInput";
import React, {useState, useEffect} from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import {userVerify, userVerifyAdmin} from "../models/userVerify";
import {stateLogin} from "../models/StateLogin";
import { consultorios } from "../models/Consultorios";

function Login() {
  const[username,setUsername] = useState('');
  const[password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlerClick = () => {
    if (userVerifyAdmin(username, password)) {
      alert('Logeo Admin correctamente!');
      stateLogin.logueadoAdmin = true;
      stateLogin.username = username;
      console.log(stateLogin.username);
      console.log(stateLogin.logueadoAdmin);
      if (stateLogin.logueadoAdmin) {
        navigate('/Admin');
      }
    } else if (userVerify(username, password)) {
      alert('Logeo correctamente!');
      stateLogin.logueadoUser = true;
      stateLogin.username = username;
      console.log(stateLogin.username);
      console.log(stateLogin.logueadoUser);
      if (stateLogin.logueadoUser) {
        navigate('/HubUrgentCareV2');
      }
    } else {
      alert('Credenciales incorrectas!');
      stateLogin.logueadoUser = false;
      stateLogin.logueadoAdmin = false;
      console.log(stateLogin.logueadoUser, stateLogin.logueadoAdmin);
      navigate('/login');
    }
  }
    //alert('Esta funcionando');

  const handlerChange = (e) => {
    if(e.target.name == 'username') {
      setUsername(e.target.value);
    } else if(e.target.name == 'password') {
      setPassword(e.target.value);
    }
  }

  return (
    < >
    <div className="flex justify-center items-center mt-32">
      <div className="w-2/6 bg-sky-200 p-4 border rounded-lg">
        <form className="text-center">
          <input
            className="border p-2 w-full mb-3 rounded-lg"
            type= "text"
            name= "username"
            placeholder= "Username"
            onInput= {(e) => sanitizeInput(e.target)}
            onChange= {handlerChange}
          />
          <input
            className="border p-2 w-full mb-3 rounded-lg"
            type= "password"
            name= "password"
            placeholder= "Password"
            onInput= {(e) => sanitizeInput(e.target)}
            onChange= {handlerChange}
          />
          <div className="mb-2 mt-2 text-2xl font-inknut-antiqua">Login</div>
          <button className="border w-full bg-red-500 hover:bg-green-600 transition-colors p-2 rounded-lg"
                  onClick={handlerClick}>
            <div className="flex justify-center items-center">
              <img className="w-9 h-9" src={huellaLogin} />
            </div>
          </button>
        </form>
      </div>
    </div>
    < />
  );
}

export default Login;