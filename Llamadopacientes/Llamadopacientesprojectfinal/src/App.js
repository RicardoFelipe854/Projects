import React, { Component, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthGuardAdmin } from "./guards/AuthGuardAdmin";
import { AuthGuardUsers } from "./guards/AuthGuardUsers";
import { PrivateRoutesAdmin, PrivateRoutesUser, PublicRoutes } from "./routes/Routes";
import HubUrgentView from "./views/HubUrgentView";
import AdminView from "./views/AdminView";
import LoginView from "./views/LoginView";
import FillPacientesView from "./views/FillPacientesView";
import CallConsultoriosView from "./views/CallConsultoriosView";
import {
  consultoriosGineco,
  consultoriosUrgencias,
  procedimientoUrgencias,
  triageUrgencias
} from "./models/Consultorios";
import LlamadosView from "./views/LlamadosView";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/'); //Nota: Busca la ruta que se indica
  }, []);
  return (
    < >
      <div className="App">
          <Routes>
            <Route path= "/" element={ <LoginView />} />
            <Route path= '*' element= {< > Error 404: NOT FOUND < />} />
            <Route path={PublicRoutes.LOGIN} element={<LoginView />} />
            <Route path={PublicRoutes.LLAMADOSTV} element={<LlamadosView />} />
            <Route element={ <AuthGuardAdmin /> } >
              <Route path={PrivateRoutesAdmin.ADMIN} element={<AdminView/>} />
              <Route path= {PrivateRoutesAdmin.HUBURGENTCAREADMIN} element={ <HubUrgentView/> } />
              <Route path= {PrivateRoutesAdmin.FILLPACIENTES} element= {<FillPacientesView />} />
              <Route path= {PrivateRoutesAdmin.CALLCONSULTORIOS} element={<CallConsultoriosView />} />
            </Route>
            <Route element={ <AuthGuardUsers /> } >
              <Route path={PrivateRoutesUser.HUBURGENTCAREUSER} element={ <HubUrgentView /> } />
              <Route path={PrivateRoutesUser.FILLPACIENTES} element={ <FillPacientesView /> } />
              <Route path={PrivateRoutesUser.CALLCONSULTORIOS} element={ <CallConsultoriosView /> } />
            </Route>
          </Routes>
      </div>
    < />
  );

};

export default App;
