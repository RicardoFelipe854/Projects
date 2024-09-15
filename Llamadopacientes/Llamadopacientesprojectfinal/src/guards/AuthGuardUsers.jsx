import { stateLogin } from "../models/StateLogin";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../routes/Routes";


export const AuthGuardUsers = () => {
  alert('Soy AuthGuardUsers');
  return stateLogin.logueadoUser || stateLogin.logueadoAdmin ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN} />
}

export default AuthGuardUsers;