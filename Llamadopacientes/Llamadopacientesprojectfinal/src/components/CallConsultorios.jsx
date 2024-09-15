// Formulario para el llamado de pacientes (Consultorio/allcategories y procedimientos)
import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import {
  consultoriosGineco,
  consultoriosUrgencias,
  procedimientoUrgencias,
} from "../models/Consultorios";

const socket = io('http://localhost:3001'); // Ajusta la URL según tu configuración del backend


function CallConsultorios() {
  const [pacientes, setPacientes] = useState([]); //Array Pacientes
  const [nombrePaciente, setNombrePaciente] = useState(''); //Paciente TV
  const [nombreConsultorio, setNombreConsultorio] = useState(''); //Consultorio TV

  //Datos del paciente para la view de la pagina:
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documentoId, setDocumentoId] = useState('');
  const [sexo, setSexo] = useState('');
  const [nombrePacienteDiv, setNombrePacienteDiv] = useState('');
  const [apellidoPaciente, setApellidoPaciente] = useState('');
  const [nivelTriage, setNivelTriage] = useState('');

  useEffect(() => {
    socket.emit('emitirPacientes', );

    // Escucha eventos de actualización de pacientes
    socket.on('recibirPacientes', (nuevosPacientes) => {
      setPacientes(nuevosPacientes);
    });

    socket.on('recibirPacientesOnLive', (nuevosPacientes) => {
      setPacientes(nuevosPacientes);
      alert("Emit paciente OnLive");
    })

    return () => {
      // Desconecta el socket cuando el componente se desmonta
      //socket.off('actualizarPacientes', handleActualizarPacientes);
      // socket.disconnect();
    };
  }, []);

  const enviarPacienteTv = () => {
    //console.log(nombrePaciente);
    socket.emit('nuevoPacienteTv', { nombre: nombrePaciente + " " + apellidoPaciente, cedula: documentoId, consultorio: nombreConsultorio, levelTriage: nivelTriage } );
  };

  const liberarPaciente = () => {
    console.log(documentoId);
    socket.emit('borrarPaciente', { documentoId: documentoId } );
  }

  const handlerChange = (e) => {

    setNombrePaciente(e.target.value);
    console.log("HandlerChange");
    console.log(e.target.value);

    pacientes.forEach((paciente, index) => {
      if (paciente.nombre === e.target.value) {
        // Hacer algo con el paciente encontrado
        console.log("Paciente encontrado:", paciente);
        alert("ENCONTRADO!");

        setTipoDocumento(paciente.tipoDocumento);
        setDocumentoId(paciente.documentoId);
        setSexo(paciente.sexo);
        setNombrePacienteDiv(paciente.nombre);
        setApellidoPaciente(paciente.apellido);
        setNivelTriage(paciente.triage);
      }
    });

  };

  return (
    < >
      <div className="fixed left-0 mt-10 flex h-full w-full justify-center px-40">
        <div className="flex flex-col h-full w-full rounded-xl px-40 border border-custom-blue bg-custom-blue shadow-2xl">
          <div className="flex w-full h-auto items-center justify-center my-5">
            <span className="tracking-wide text-slate-50 font-bold text-lg">Medicos Urgencias / Procedimientos</span>
          </div>

          <div className="flex w-full h-auto items-center">
            <span className="tracking-wide text-slate-50 font-semibold text-base pl-10">
              Seleccione el paciente
            </span>
          </div>

          <div className="flex flex-col w-full h-auto border bg-custom-blueLight border-custom-blueLight rounded-xl p-5">
            <div className="flex flex-col w-auto h-auto mb-3">
              <span className="mr-1 whitespace-nowrap">*Paciente </span>
              <select
                className="flex w-full items-center justify-center rounded-full border border-black transition ease-in-out duration-200"
                name="tipo_documento"
                id="tipo_documento"
                onChange={handlerChange} >
                <option>Seleccione * </option>
                {pacientes.map((paciente, index) => (
                  <option key={ `Paciente-${index}` } value={ paciente.nombre }>
                    { paciente.nombre + " " + paciente.apellido + " - Triage: " + paciente.triage}
                  </option>
                ))
                }
              </select>
            </div>
            <div className="flex w-auto h-auto mt-8">
              <span className="mr-1 whitespace-nowrap">Tipo de Documento</span>
              <div
                className="flex w-full items-center justify-center rounded-full border border-black bg-white transition ease-in-out duration-200"
                name="tipo_documento"
                id="tipo_documento" >
                { tipoDocumento } </div>
              <span className="mr-1 ml-3 whitespace-nowrap">
                Número de Documento
              </span>
              <div
                className="flex w-full items-center justify-center rounded-full border border-black bg-white transition ease-in-out duration-200"
                name="tipo_documento"
                id="tipo_documento"
              > {documentoId} </div>
            </div>
            <div className="flex w-auto h-auto my-5 justify-center">
              <span className="mr-1 whitespace-nowrap">Sexo</span>
              <div
                className="flex w-36 mr-5 items-center justify-center rounded-full border border-black bg-white transition ease-in-out duration-200"
                name="id_sexo"
                id="tipo_documento"
              > {sexo} </div>

              <span className="mr-1 ml-4 whitespace-nowrap">Triage</span>
              <div
                className="flex w-40 mr-5 items-center justify-center rounded-full border border-black bg-white transition ease-in-out duration-200"
                name="id_triage"
                id="tipo_documento"
              > {nivelTriage} </div>
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
              <div
                className="flex w-full p-2 items-center justify-center rounded-full border border-black bg-white transition ease-in-out duration-200"
                name="name_id"
                id="tipo_documento"
              > {nombrePacienteDiv} </div>
              <div
                className="flex w-full p-2 items-center justify-center ml-1 rounded-full border border-black bg-white transition ease-in-out duration-200"
                name="apellido_id"
                id="tipo_documento"
              > {apellidoPaciente} </div>
            </div>
            <div className="flex flex-col w-auto h-auto mt-3">
              <span className="mr-1 whitespace-nowrap">Llamar a:</span>
              <select
                className="flex w-full p-2 items-center justify-center rounded-full border border-black bg-white transition ease-in-out duration-200"
                name="tipo_documento"
                id="tipo_documento"
                onChange={(e) => setNombreConsultorio(e.target.value)} >
                <option>Seleccione * </option>
                {consultoriosUrgencias.map((consultorio, index) => (
                  <option key={`consultorio-${index}`} value={consultorio}>
                    {consultorio}
                  </option>
                ))}
                {consultoriosGineco.map((consultorio, index) => (
                  <option key={`consultorio-${index}`} value={consultorio}>
                    {consultorio}
                  </option>
                ))}
                {procedimientoUrgencias.map((consultorio, index) => (
                  <option key={`consultorio-${index}`} value={consultorio}>
                    {consultorio}
                  </option>
                ))}
              </select>
              <span className="flex mr-1 mb-2 mt-5 text-slate-950 font-bold whitespace-nowrap">
                {" "}
                *Verifique los datos*{" "}
              </span>
            </div>
          </div>

          <div className="flex w-full h-auto items-center justify-center my-10">
            <button
              className="flex w-auto h-auto px-10 py-2 rounded-full border border-red-600 bg-red-600 text-slate-50 hover:border-green-600 hover:bg-green-600 hover:text-white active:border-blue-500 active:bg-blue-400 transition ease-in-out duration-200"
              onClick={enviarPacienteTv}>
              <span className="tracking-wide font-semibold text-base">
                Llamar
              </span>
            </button>
            <button
              className="flex w-auto h-auto px-10 py-2 rounded-full border border-red-600 bg-red-600 text-slate-50 hover:border-green-600 hover:bg-green-600 hover:text-white active:border-blue-500 active:bg-blue-400 transition ease-in-out duration-200"
              onClick={liberarPaciente}>
              <span className="tracking-wide font-semibold text-base">
                Liberar Paciente
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallConsultorios;