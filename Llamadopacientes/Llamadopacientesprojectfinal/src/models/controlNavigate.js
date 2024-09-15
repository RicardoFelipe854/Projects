import { stateLogin } from "./StateLogin";


export const navigateCall = (arg) => {
  if (stateLogin.logueadoUser) {
    return ('/HubUrgentCareV2/callConsultorios');
  } else if (stateLogin.logueadoAdmin) {
    return ('/Admin/HubUrgentCareV1/callConsultorios');
  } else {
    return ('');
  }
}

export const navigateFill = (arg) => {
  if (stateLogin.logueadoUser) {
    return ('/HubUrgentCareV2/fillPacientes');
  }else if (stateLogin.logueadoAdmin) {
    return ('/Admin/HubUrgentCareV1/fillPacientes');
  } else {
    return ('');
  }
}
