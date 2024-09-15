import axios from 'axios';
import Consultorios from "../models/Consultorios";
let setConsultoriosData;

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/consultorios');
    setConsultoriosData= response.data;
    Consultorios(setConsultoriosData);
    //console.log('Consultorios Data:', setConsultoriosData);
    return setConsultoriosData
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }

};

export const addConsultorio = async (consultorioData) => {
  try {
    const response = await axios.post('http://localhost:3001/api/consultorioAdd', consultorioData);
    console.log('Consultorio agregado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al agregar consultorio:', error);
    throw error;
  }

};

export const modifyConsultorio = async (consultorioData) => {
  try {
    const response = await axios.put('http://localhost:3001/api/consultorioModify', consultorioData);
    console.log('Consultorio modificado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al agregar consultorio:', error);
    throw error;
  }

}

export const cachePacientes = async (consultoriosData) => {
  try {
    const response = await axios.post('http://localhost:3001/api/cachePacientes', consultoriosData);
    console.log('Consultorio modificado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al agregar consultorio:', error);
    throw error;
  }

}
