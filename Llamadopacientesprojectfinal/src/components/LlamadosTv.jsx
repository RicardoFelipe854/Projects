import React, { useEffect, useState } from 'react';
import { cachePacientes } from "../services/apiConsumption";
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Ajusta la URL según tu configuración del backend

/*class SpeechSynthesis extends React.Component {
  componentDidMount() {
    const utterance = new SpeechSynthesisUtterance("Modulo de voz");
    speechSynthesis.speak(utterance);
  }

}*/

function LlamadosTv () {
  const [pacientes, setPacientes] = useState([]);
  const [ultimoPaciente, setUltimoPaciente] = useState(null);

  const handleCachePacientes = (Pacientes) => {
    const paciente = {
      nombre: Pacientes[0].nombre,
      documentoId: Pacientes[0].cedula,
      consultorio: Pacientes[0].consultorio,
      nivelTriage: Pacientes[0].levelTriage
    };
    console.log(paciente);

    cachePacientes(paciente)
      .then((pacienteCache) => {
        console.log('Consultorio agregado:', pacienteCache);
      })
      .catch((error) => {
        console.error('Error al agregar consultorio:', error);
        alert("Error, verifique la consola.");
      })

  };

  useEffect(() => {
    /*const speechExample = new SpeechSynthesis();
    speechExample.componentDidMount();*/

    // Escucha eventos de actualización de pacientes
    socket.on('actualizarPacientesTv', (nuevosPacientes) => {
      const nuevoUltimoPaciente = nuevosPacientes[0].nombre;
      const consultorio = nuevosPacientes[0].consultorio;
      console.log("nuevoUltimoPaciente" + nuevoUltimoPaciente);
      console.log("ultimoPaciente" + ultimoPaciente);
      if (nuevoUltimoPaciente !== ultimoPaciente){
        setPacientes(nuevosPacientes);
        setUltimoPaciente(nuevoUltimoPaciente);

        const utterance = new SpeechSynthesisUtterance(`Paciente ${nuevoUltimoPaciente} llamado a: ${consultorio}`);
        speechSynthesis.speak(utterance);
        handleCachePacientes(nuevosPacientes);
      }
    });

    return () => {
      // Desconecta el socket cuando el componente se desmonta
      //socket.off('actualizarPacientes', handleActualizarPacientes);
      // socket.disconnect();
    };
  }, [] );

  useEffect(() => {
    console.log("Pacientes actualizados:", pacientes);
  }, [pacientes] );

  return (
    < >
      <div className="h-full w-full p-5">
        <div className="flex h-full w-full flex-col">
          <div
            className="flex h- w-full items-center divide-x py-6 border border-gray-300 bg-white divide-gray-300 rounded-3xl shadow-md">
            <div className="flex w-2/5 items-center justify-center">
              <span className="text-3xl font-bold tracking-wide text-slate-500">Paciente</span>
            </div>
            <div className="flex flex-grow items-center justify-center">
              <span className="text-3xl font-bold tracking-wide text-slate-500">Llamado a</span>
            </div>
          </div>

          <div className="grid-flow-dense h-full w-full">
            { pacientes.map((elemento, index) => (

            <div key={index} className="mt-5 flex h-20 w-full items-center divide-x divide-white rounded-xl border border-custom-sky-blue bg-custom-sky-blue shadow-md">
              <div className="flex w-2/5 items-center justify-center">
                <span className="text text-center text-2xl font-semibold tracking-wide text-white"> { elemento.nombre } </span>
              </div>
              <div className="flex flex-grow items-center justify-center">
                <span className="text-center text-2xl font-semibold tracking-wide text-white"> { elemento.consultorio } </span>
              </div>
            </div>

              ))
            }
          </div>
        </div>
      </div>
    < />
  );
}

export default LlamadosTv;