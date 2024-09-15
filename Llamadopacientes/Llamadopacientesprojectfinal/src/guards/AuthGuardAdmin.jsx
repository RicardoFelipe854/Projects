import { stateLogin } from "../models/StateLogin";
import {PublicRoutes} from "../routes/Routes";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuardAdmin = () => {
  alert('Soy AuthGuardAdmin');
  return stateLogin.logueadoAdmin ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN} /> ;
}

export default AuthGuardAdmin;