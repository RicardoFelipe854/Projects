//Debe llenar datos basicos para el llamado del paciente (Triages /allTriages) y llamar a triages (INGRESA EL PACIENTE A LA APP Y LO LLAMA A TRIAGE CON LOS DATOS INGRESADOS EN HOSVITAL)
import { sanitizeInputLetter, sanitizeInputNumbers } from "../models/sanitizeInput";
import { triageUrgencias } from "../models/Consultorios";
import React, { useState } from "react";
import io from "socket.io-client";

const socket = io('http://localhost:3001'); // Ajusta la URL según tu configuración del backend

function FillPacientes() {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documentoId, setDocumentoId] = useState('');
  const [sexo, setSexo] = useState('');
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [apellidoPaciente, setApellidoPaciente] = useState('');
  const [consultorioTriage, setConsultorioTriage] = useState('');
  const [nivelTriage, setNivelTriage] = useState('');

  const enviarPacienteTv = () => {
    //console.log(nombrePaciente);
    socket.emit('nuevoPacienteTv', { nombre: nombrePaciente + " " + apellidoPaciente, cedula: documentoId, consultorio: consultorioTriage, levelTriage: nivelTriage });
  };

  const guardarPaciente = () => {
    socket.emit('pacienteNuevo', { tipoDocumento: tipoDocumento, documentoId: documentoId, sexo: sexo, nombre: nombrePaciente, apellido: apellidoPaciente, consultorio: consultorioTriage, triage: nivelTriage } );
  }

  return (
    <div className="absolute left-0 mt-10 mb-10 flex h-full w-full justify-center px-40 ">
      <div className="flex flex-col h-full w-full rounded-t-xl px-40 border border-custom-orange shadow-2xl bg-custom-orange">
        <div className="flex w-full h-auto items-center justify-center my-5">
          <span className="tracking-wide text-slate-950 font-bold text-lg">
            TRIAGE URGENCIAS
          </span>
        </div>

        <div className="flex w-full h-auto items-center">
          <span className="tracking-wide text-slate-950 font-semibold text-base pl-10">
            Llene los datos del paciente:{" "}
          </span>
        </div>

        <div className="flex flex-col w-full h-auto border border-gray-200 rounded-xl p-5 bg-custom-orangeLight">
          <div className="flex w-auto h-auto ">
            <span className="mr-1 whitespace-nowrap">Tipo de Documento: </span>
            <select
              className="flex w-full items-center justify-center rounded-full border border-gray-200 hover:border-blue-300 active:border-blue-500 focus:border-blue-400 transition ease-in-out duration-200"
              name="tipo_documento"
              id="tipo_documento"
              onChange={(e) => setTipoDocumento(e.target.value)}
            >
              <option>Seleccione * </option>
              <option>Cedula De Ciudadania </option>
              <option>Tarjeta De Identidad </option>
            </select>
            <span className="mr-1 ml-3 whitespace-nowrap">
              Número de Documento:{" "}
            </span>
            <input
              className="flex w-full items-center justify-center rounded-full border border-gray-200 hover:border-blue-300 active:border-blue-500 focus:border-blue-400 transition ease-in-out duration-200"
              name="tipo_documento"
              id="tipo_documento"
              onInput={(e) => sanitizeInputLetter(e.target)}
              onChange={(e) => setDocumentoId(e.target.value)}
            />
          </div>
          <div className="flex w-auto h-auto my-5">
            <span className="mr-1 whitespace-nowrap">Sexo: </span>
            <select
              className="flex w-30 items-center justify-center rounded-full border border-gray-200 hover:border-blue-300 active:border-blue-500 focus:border-blue-400 transition ease-in-out duration-200"
              name="tipo_documento"
              id="tipo_documento"
              onChange={(e) => setSexo(e.target.value)} >
              <option>Seleccione * </option>
              <option>Masculino </option>
              <option>Femenino </option>
            </select>
          </div>
          <div className="flex w-auto h-auto justify-around">
            <span className="flex w-full ml-4 mr-1 whitespace-nowrap">
              Nombres
            </span>
            <span className="flex w-full ml-6 mr-1 whitespace-nowrap">
              Apellidos
            </span>
          </div>
          <div className="flex w-auto h-auto justify-around">
            <input
              type="text"
              className="flex w-full items-center justify-center mr-1 rounded-full border border-gray-200 hover:border-blue-300 active:border-blue-500 focus:border-blue-400 transition ease-in-out duration-200"
              name="tipo_documento"
              id="tipo_documento"
              placeholder="Nombres"
              onInput={(e) => sanitizeInputNumbers(e.target)}
              onChange={(e) => setNombrePaciente(e.target.value)} />
            <input
              type="text"
              className="flex w-full items-center justify-center ml-1 rounded-full border border-gray-200 hover:border-blue-300 active:border-blue-500 focus:border-blue-400 transition ease-in-out duration-200"
              name="tipo_documento"
              id="tipo_documento"
              placeholder="Apellidos"
              onInput={(e) => sanitizeInputNumbers(e.target)}
              onChange={(e) => setApellidoPaciente(e.target.value)} />
          </div>
          <div className="mt-2">
            <span>Llamar a: </span>
            <select
              className="flex w-full items-center justify-center rounded-full border border-gray-200 hover:border-blue-300 active:border-blue-500 focus:border-blue-400 transition ease-in-out duration-200"
              onChange={(e) => setConsultorioTriage(e.target.value)} >
              <option>Seleccione * </option>
              {triageUrgencias.map((consultorio, index) => (
                <option key={`consultorio-${index}`} value={consultorio}>
                  {consultorio}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full h-auto items-center justify-center my-10">
          <button
            className="flex w-auto h-auto px-10 py-2 rounded-full border border-red-600 bg-red-600 text-slate-50 hover:border-green-600 hover:bg-green-600 hover:text-white active:border-blue-500 active:bg-blue-400 transition ease-in-out duration-200"
            onClick={enviarPacienteTv} >
            <span className="tracking-wide font-semibold text-base">
              Llamar
            </span>
          </button>
        </div>

        <div className="flex w-full h-auto items-center">
          <span className="tracking-wide text-slate-950 font-semibold text-base pl-10">
            Asignar Triage:{" "}
          </span>
        </div>

        <div className="flex flex-col w-full h-auto border border-gray-200 rounded-xl p-5 bg-custom-orangeLight">
          <div className="w-auto h-auto">
            <span className="flex mr-1 mt-4 font-bold whitespace-nowrap" > Asegurese de seleccionar el nivel de Triage, una vez ingrese otro paciente * </span>
            <div className="flex" >
              <span className="mr-1 mt-4 whitespace-nowrap">Triage</span>
              <select
                className="flex w-full mt-4 items-center justify-center rounded-full border border-gray-200 hover:border-blue-300 active:border-blue-500 focus:border-blue-400 transition ease-in-out duration-200"
                name="tipo_documento"
                id="tipo_documento"
                onChange={(e) => setNivelTriage(e.target.value)} >
                <option>Seleccione * </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex w-full h-auto items-center justify-center my-10">
          <button
            className="flex w-auto h-auto px-10 py-2 rounded-full border border-red-600 bg-red-600 text-slate-50 hover:border-green-600 hover:bg-green-600 hover:text-white active:border-blue-500 active:bg-blue-400 transition ease-in-out duration-200"
            onClick={guardarPaciente} >
            <span className="tracking-wide font-semibold text-base">
              Guardar
            </span>
          </button>
        </div>
      </div>
    </div>
  );

}

export default FillPacientes;