
export const consultoriosUrgencias = [];
export const consultoriosGineco = [];
export const triageUrgencias = [];
export const procedimientoUrgencias = [];

function Consultorios(setConsultoriosData) {
  console.log("funciona!");
  if (!consultoriosUrgencias.length && !consultoriosGineco.length && !triageUrgencias.length && !procedimientoUrgencias.length) {
    setConsultoriosData.forEach(element => {
      const nameService = element.nombre_servicio;
      const nameConsultorio = element.nombre_consultorio;
      if (nameService == "Urgencias"){
        consultoriosUrgencias.push(nameConsultorio+ " " + element.nombre_servicio);
      } else if (nameService == "Ginecologia") {
        consultoriosGineco.push(nameConsultorio + " " + element.nombre_servicio);
      } else if (nameService == "Triage") {
        triageUrgencias.push(nameConsultorio);
      } else if (nameService == "Procedimientos"){
        procedimientoUrgencias.push(nameConsultorio);
      }
    })
  }
}

export default Consultorios;
