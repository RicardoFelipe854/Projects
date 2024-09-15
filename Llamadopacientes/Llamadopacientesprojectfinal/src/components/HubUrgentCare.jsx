
import React, { useEffect, useState } from "react";
import axios from "axios";
import Consultorios, {
  consultoriosGineco,
  consultoriosUrgencias,
  procedimientoUrgencias,
  triageUrgencias
} from "../models/Consultorios";
import CardConsultoriosMed from "./Cards/CardConsultoriosMed";
import CardConsultoriosGineco from "./Cards/CardConsultoriosGineco";
import CardConsultoriosTriage from "./Cards/CardConsultoriosTriage";
import CardConsultoriosProcedimientos from "./Cards/CardConsultoriosProcedimientos";

function HubUrgentCare() {
  const [addMode, setAddMode] = useState(false); //Activate add mode

  let setConsultoriosData;

  useEffect(() => {
    // Método para obtener la información del backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/consultorios');
        setConsultoriosData= response.data;
        await Consultorios(setConsultoriosData);
        console.log('Consultorios Data:', setConsultoriosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Llamar al método al montar el componente
    fetchData();
  }, []);

  const activateEditMode = () => {
    setAddMode(true);
    alert("CARGAR");
  }

  const UrgenciasList = consultoriosUrgencias.map((v, index) => {
    return (
      <React.Fragment key={`urgencia-${index}`}>
        {addMode && (
          <CardConsultoriosMed title={v} />
          )}
      </React.Fragment>
    );
  });
  const GinecoList = consultoriosGineco.map((v, index) => {
    return (
      <React.Fragment key={`gineco-${index}`}>
        <CardConsultoriosGineco title={v} />
      </React.Fragment>
    );
  });
  const TriageList = triageUrgencias.map((v, index) => {
    return (
      <React.Fragment key={`triage-${index}`}>
        <CardConsultoriosTriage title={v} />
      </React.Fragment>
    );
  });
  const ProcedimientosList = procedimientoUrgencias.map((v, index) => {
    return (
      <React.Fragment key={`procedimientos-${index}`}>
        <CardConsultoriosProcedimientos title={v} />
      </React.Fragment>
    );
  });

  alert('Hub');
  return(
    < >
      <span className="flex justify-center mt-3 text-2xl font-inknut-antiqua "> Hub UrgentCare </span>

      <button
        className="bg-green-600 hover:bg-green-400 text-white font-bold ml-8 my-2 py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        onClick={() => activateEditMode()}>
        <div className="flex justify-center items-center font-inknut-antiqua">
          Cargar Consultorios
        </div>
      </button>

      <div
        className="mx-6 mt-5 text-2xl font-inknut-antiqua underline hover:underline-offset-8 hover:text-custom-sky-blue "> CONSULTORIOS
        MEDICOS
      </div>
      <div className="border border-b mx-6 my-4 p-2 rounded-lg bg-custom-blueLight">
        <div className=""> {UrgenciasList} </div>
      </div>

      <div
        className="mx-6 mt-6 text-2xl font-inknut-antiqua underline hover:underline-offset-8 hover:text-custom-pink "> CONSULTORIOS
        GINECOLOGIA
      </div>
      <div
        className="border border-b mx-6 my-4 p-2 rounded-lg underline bg-custom-pinkLight hover:underline-offset-4 text-2xl font-inknut-antiqua">
        <div className=""> {GinecoList} </div>
      </div>

      <div
        className="mx-6 mt-6 text-2xl font-inknut-antiqua underline hover:underline-offset-8 hover:text-custom-orange "> CONSULTORIOS
        TRIAGES
      </div>
      <div
        className="border border-b mx-6 my-4 p-2 rounded-lg underline bg-custom-orangeLight hover:underline-offset-4 text-2xl font-inknut-antiqua">
        <div className=""> {TriageList} </div>
      </div>

      <div
        className="mx-6 mt-6 text-2xl font-inknut-antiqua underline hover:underline-offset-8 hover:text-custom-green "> CONSULTORIOS
        PROCEDIMIENTOS
      </div>
      <div
        className="border border-b mx-6 my-4 p-2 rounded-lg underline bg-custom-greenLight hover:underline-offset-4 text-2xl font-inknut-antiqua">
        <div className=""> {ProcedimientosList} </div>
      </div>

    < />
  );
}

export default HubUrgentCare;