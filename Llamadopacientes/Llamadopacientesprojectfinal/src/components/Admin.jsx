import { consultoriosGineco,
  consultoriosUrgencias,
  procedimientoUrgencias,
  triageUrgencias } from "../models/Consultorios";
import React, { useEffect, useState } from "react";
import Botoneditar from "../images/Botoneditar.png";
import Botonagregar from "../images/Botonagregar.png";
import CardConsultoriosMed from "./Cards/CardConsultoriosMed";
import CardConsultoriosGineco from "./Cards/CardConsultoriosGineco";
import CardConsultoriosProcedimientos from "./Cards/CardConsultoriosProcedimientos";
import CardConsultoriosTriage from "./Cards/CardConsultoriosTriage";
import { fetchData, addConsultorio, modifyConsultorio } from "../services/apiConsumption";
import { sanitizeInput } from "../models/sanitizeInput";
//import axios from 'axios';

function Admin() {
  const [addMode, setAddMode] = useState(false); //Activate add mode
  const [editMode, setEditMode] = useState(false); //Activate edit mode
  const [consultorioType, setConsultorioType] = useState(''); //Tipo de active mode
  //Establecer datos de edicion:
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedConsultorio, setSelectedConsultorio] = useState('');
  const [consultorioName, setConsultorioName] = useState('');

  useEffect(() => {
    // Método para obtener la información del backend
    fetchData()
      .then((data) => {
        console.log('Datos cargados con exito:', data)
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error)
      })
  }, []);

  const activateEditMode = (type) => {
    setConsultorioType(type);
    setEditMode(true);
  }

  const activateAddMode = (type) => {
    setAddMode(true);
    setConsultorioType(type);
  }

  const handleSave = () => {
    const modificadoConsultorio = {
      nombre_servicio: selectedGroup,
      nombre_consultorio: selectedConsultorio,
      nombre_consultorioNuevo: consultorioName,
    }

      modifyConsultorio(modificadoConsultorio)
        .then((consultorioModificado) => {
          console.log('Consultorio agregado:', consultorioModificado);
          alert("Consultorio Modificado");
        })
        .catch((error) => {
          console.error('Error al agregar consultorio:', error);
          alert("Error, verifique la consola.");
        })
    setEditMode(false);
  }

  const handleSaveAdd = () => {
    const nuevoConsultorio = {
      nombre_consultorio: consultorioName,
      nombre_servicio: selectedGroup, // Reemplaza con el ID del servicio correspondiente
      // Otros campos del consultorio si es necesario
    };

      addConsultorio(nuevoConsultorio)
        .then((consultorioAgregado) => {
          // Manejar el consultorio agregado si es necesario
          console.log('Consultorio agregado:', consultorioAgregado);
          alert("Consultorio Agregado");
        })
        .catch((error) => {
          // Manejar el error si ocurre
          console.error('Error al agregar consultorio:', error);
          alert("Error, verifique la consola.");
        });
    setAddMode(false);
  }

  const addModeView = () => {
    return (
      <React.Fragment>
        {addMode && consultorioType === "ModeAdd" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-4/5 rounded-3xl opacity-90 border border-amber-300 p-10 bg-amber-200">
            <label className="mx-96 my-10 text-3xl font-inknut-antiqua flex hover:text-custom-pink hover:underline">
              Agregar
            </label>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Seleccione la categoría a la que corresponde:{" "}
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="border p-2 mt-3 rounded-lg" >
                <option>Seleccione *</option>
                <option>Urgencias</option>
                <option>Ginecologia</option>
                <option>Triage</option>
                <option>Procedimientos</option>
              </select>
            </div>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Nombre del consultorio nuevo:{" "}
              </label>
              <input
                type="text"
                value={consultorioName}
                onInput={(e) => sanitizeInput(e.target)}
                onChange={(e) => setConsultorioName(e.target.value)}
                className="border p-2 rounded-lg m-4"
              />
            </div>
            <button
              onClick={handleSaveAdd}
              className="transform hover:scale-105 transition-transform duration-300 bg-green-600 text-white p-2 rounded-lg mx-96 flex items-center" >
              {" "}
              Guardar{" "}
            </button>
          </div>
        )}
      </React.Fragment>
    );
  };

  const UrgenciasList = consultoriosUrgencias.map((v, index) => {
    console.log("UrgenciasList");
    console.log(index);
    return (
      <React.Fragment key={`urgencia-${index}`}>
        <CardConsultoriosMed title={v} />

        {editMode && consultorioType === "UrgenciasMed" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-4/5 rounded-3xl opacity-60 border border-custom-sky-blue p-10 bg-custom-blueLight">
            <label className="mx-96 my-10 text-3xl font-inknut-antiqua flex hover:text-custom-sky-blue hover:underline">
              Editar
            </label>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Editar en categoría:{" "}
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="border p-2 mt-3 rounded-lg"
              >
                <option>Seleccione *</option>
                <option>Ginecologia</option>
              </select>
            </div>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Editar consultorio:{" "}
              </label>
              <select
                value={selectedConsultorio}
                onChange={(e) => setSelectedConsultorio(e.target.value)}
                className="border p-2 mt-3 rounded-lg"
              >
                <option>Seleccione *</option>
                {consultoriosGineco.map((consultorio, index) => (
                  <option key={`consultorio-${index}`} value={consultorio}>
                    {consultorio}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Cambiar a:{" "}
              </label>
              <input
                type="text"
                value={consultorioName}
                onInput={(e) => sanitizeInput(e.target)}
                onChange={(e) => setConsultorioName(e.target.value)}
                className="border p-2 rounded-lg m-4"
              />
            </div>
            <button
              onClick={handleSave}
              className="transform hover:scale-105 transition-transform duration-300 bg-green-600 text-white p-2 rounded-lg mx-96 flex items-center"
            >
              {" "}
              Guardar{" "}
            </button>
          </div>
        )}
      </React.Fragment>
    );
  });
  const GinecoList = consultoriosGineco.map((v, index) => {
    return (
      <React.Fragment key={`gineco-${index}`}>
        <CardConsultoriosGineco title={v} />

        {editMode && consultorioType === "Ginecologia" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-4/5 rounded-3xl opacity-60 border border-custom-pink p-10 bg-custom-pinkLight">
            <label className="mx-96 my-10 text-3xl font-inknut-antiqua flex hover:text-custom-pink hover:underline">
              Editar
            </label>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Editar en categoría:{" "}
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="border p-2 mt-3 rounded-lg"
              >
                <option>Seleccione *</option>
                <option>Ginecologia</option>
              </select>
            </div>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Editar consultorio:{" "}
              </label>
              <select
                value={selectedConsultorio}
                onChange={(e) => setSelectedConsultorio(e.target.value)}
                className="border p-2 mt-3 rounded-lg"
              >
                <option>Seleccione *</option>
                {consultoriosGineco.map((consultorio, index) => (
                  <option key={`consultorio-${index}`} value={consultorio}>
                    {consultorio}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Cambiar a:{" "}
              </label>
              <input
                type="text"
                value={consultorioName}
                onInput={(e) => sanitizeInput(e.target)}
                onChange={(e) => setConsultorioName(e.target.value)}
                className="border p-2 rounded-lg m-4"
              />
            </div>
            <button
              onClick={handleSave}
              className="transform hover:scale-105 transition-transform duration-300 bg-green-600 text-white p-2 rounded-lg mx-96 flex items-center"
            >
              {" "}
              Guardar{" "}
            </button>
          </div>
        )}
      </React.Fragment>
    );
  });
  const TriageList = triageUrgencias.map((v, index) => {
    return (
      <React.Fragment key={`triage-${index}`}>
        <CardConsultoriosTriage title={v} />
        {editMode && consultorioType === "Triage" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-4/5 rounded-3xl opacity-60 border border-custom-orange p-10 bg-custom-orangeLight">
            <label className="mx-96 my-10 text-3xl font-inknut-antiqua flex hover:text-custom-orange hover:underline">
              Editar
            </label>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Editar en categoría:{" "}
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="border p-2 mt-3 rounded-lg" >
                <option>Seleccione * </option>
                <option>Triage</option>
              </select>
            </div>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Editar consultorio:{" "}
              </label>
              <select
                value={selectedConsultorio}
                onChange={(e) => setSelectedConsultorio(e.target.value)}
                className="border p-2 mt-3 rounded-lg" >
                <option>Seleccione *</option>
                {triageUrgencias.map((consultorio, index) => (
                  <option key={`consultorio-${index}`} value={consultorio}>
                    {consultorio}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Cambiar a:{" "}
              </label>
              <input
                type="text"
                value={consultorioName}
                onInput={(e) => sanitizeInput(e.target)}
                onChange={(e) => setConsultorioName(e.target.value)}
                className="border p-2 rounded-lg m-4"
              />
            </div>
            <button
              onClick={handleSave}
              className="transform hover:scale-105 transition-transform duration-300 bg-green-600 text-white p-2 rounded-lg mx-96 flex items-center"
            >
              {" "}
              Guardar{" "}
            </button>
          </div>
        )}
      </React.Fragment>
    );
  });
  const ProcedimientosList = procedimientoUrgencias.map((v, index) => {
    return (
      <React.Fragment key={`procedimientos-${index}`}>
        <CardConsultoriosProcedimientos title={v} />

        {editMode && consultorioType === "Procedimientos" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-4/5 rounded-3xl opacity-95 border border-custom-green p-10 bg-custom-greenLight">
            <label className="mx-96 my-10 text-3xl font-inknut-antiqua flex hover:text-custom-green hover:underline">
              Editar
            </label>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Editar en categoría:{" "}
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="border p-2 mt-3 rounded-lg" >
                <option>Seleccione * </option>
                <option>Procedimientos</option>
              </select>
            </div>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Editar consultorio:{" "}
              </label>
              <select
                value={selectedConsultorio}
                onChange={(e) => setSelectedConsultorio(e.target.value)}
                className="border p-2 mt-3 rounded-lg" >
                <option>Seleccione *</option>
                {procedimientoUrgencias.map((consultorio, index) => (
                  <option key={`consultorio-${index}`} value={consultorio}>
                    {consultorio}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-5 mx-60 flex items-center ">
              <label className="mr-2 text-3xl font-inknut-antiqua">
                Cambiar a:{" "}
              </label>
              <input
                type="text"
                value={consultorioName}
                onInput={(e) => sanitizeInput(e.target)}
                onChange={(e) => setConsultorioName(e.target.value)}
                className="border p-2 rounded-lg m-4"
              />
            </div>
            <button
              onClick={handleSave}
              className="transform hover:scale-105 transition-transform duration-300 bg-green-600 text-white p-2 rounded-lg mx-96 flex items-center">
              {" "}
              Guardar{" "}
            </button>
          </div>
        )}
      </React.Fragment>
    );
  });

  console.log("Consultorios Urgencias:", consultoriosUrgencias);
  console.log("Consultorios Gineco:", consultoriosGineco);
  console.log("Triage Urgencias:", triageUrgencias);
  console.log("Procedimientos Urgencias:", procedimientoUrgencias);
  return(
    < >
      <span className="flex justify-center mt-3 text-2xl font-inknut-antiqua "> Administrador De Consultorios </span>

      <button className="bg-green-600 hover:bg-green-400 text-white font-bold ml-8 my-2 py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
              onClick={() => activateEditMode()}>
        <div className="flex justify-center items-center font-inknut-antiqua">
          Cargar Consultorios
        </div>
      </button>

      <div
        className="mx-6 mt-5 text-2xl font-inknut-antiqua underline hover:underline-offset-8 hover:text-custom-sky-blue "> CONSULTORIOS
        MEDICOS
      </div>
      <div
        className="border border-b mx-6 my-4 p-2 rounded-lg underline bg-custom-blueLight hover:underline-offset-4 text-2xl font-inknut-antiqua">
        <div className=""> {UrgenciasList} </div>
      </div>
      <button className=" w-11/12 mx-14 my-auto bg-custom-sky-blue hover:bg-green-600 transition-colors p-2 rounded-lg "
              onClick={() => activateEditMode('UrgenciasMed')}>
        <div className="flex justify-center items-center">
          <img className="w-9 h-9" src={Botoneditar} />
        </div>
      </button>

      <div
        className="mx-6 mt-6 text-2xl font-inknut-antiqua underline hover:underline-offset-8 hover:text-custom-pink "> CONSULTORIOS
        GINECOLOGIA
      </div>
      <div
        className="border border-b mx-6 my-4 p-2 rounded-lg underline bg-custom-pinkLight hover:underline-offset-4 text-2xl font-inknut-antiqua">
        <div className=""> {GinecoList} </div>
      </div>
      <button className=" w-11/12 mx-14 my-auto bg-custom-pink hover:bg-green-600 transition-colors p-2 rounded-lg "
              onClick={() => activateEditMode('Ginecologia')}>
        <div className="flex justify-center items-center">
          <img className="w-9 h-9" src={Botoneditar} />
        </div>
      </button>

      <div
        className="mx-6 mt-6 text-2xl font-inknut-antiqua underline hover:underline-offset-8 hover:text-custom-orange "> CONSULTORIOS
        TRIAGES
      </div>
      <div
        className="border border-b mx-6 my-4 p-2 rounded-lg underline bg-custom-orangeLight hover:underline-offset-4 text-2xl font-inknut-antiqua">
        <div className=""> {TriageList} </div>
      </div>
      <button className=" w-11/12 mx-14 my-auto bg-custom-orange hover:bg-green-600 transition-colors p-2 rounded-lg "
              onClick={() => activateEditMode('Triage')}>
        <div className="flex justify-center items-center">
          <img className="w-9 h-9" src={Botoneditar} />
        </div>
      </button>

      <div
        className="mx-6 mt-6 text-2xl font-inknut-antiqua underline hover:underline-offset-8 hover:text-custom-green "> CONSULTORIOS
        PROCEDIMIENTOS
      </div>
      <div
        className="border border-b mx-6 my-4 p-2 rounded-lg underline bg-custom-greenLight hover:underline-offset-4 text-2xl font-inknut-antiqua">
        <div className=""> {ProcedimientosList} </div>
      </div>
      <button className=" w-11/12 mx-14 my-auto bg-custom-green hover:bg-green-600 transition-colors p-2 rounded-lg "
              onClick={() => activateEditMode('Procedimientos')}>
        <div className="flex justify-center items-center">
          <img className="w-9 h-9" src={Botoneditar} />
        </div>
      </button>

      <div
        className="mx-6 mt-6 text-2xl font-inknut-antiqua underline hover:underline-offset-8 hover:text-amber-300 ">
        AGREGAR CONSULTORIO
      </div>

      <button className=" w-11/12 mx-14 my-4 bg-amber-200 hover:bg-amber-300 transition-colors p-2 rounded-lg "
              onClick={() => activateAddMode('ModeAdd')}>
        <div className="flex justify-center items-center">
          <img className="w-11 h-11" src={Botonagregar} />
        </div>
      </button>
      <div
        className="mx-6 my-4 p-2 text-2xl font-inknut-antiqua">
        <div className=""> {addModeView()} </div>
      </div>

    < />
  );
};

export default Admin;

//<Navigate replace to={'HubUrgentCareV1'} />