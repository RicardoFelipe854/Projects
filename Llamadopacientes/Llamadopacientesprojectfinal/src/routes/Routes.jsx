import HubUrgentCare from '../components/HubUrgentCare';
import FillPacientes from "../components/FillPacientes";
import CallConsultorios from "../components/CallConsultorios";
import Not from '../components/Not';
import Admin from "../components/Admin";
import React from 'react';
import { Route, Routes } from "react-router-dom";

export const PublicRoutes = {
  LOGIN: 'login',
  LLAMADOSTV: 'llamados-tv'
};

export const PrivateRoutesUser = {
  HUBURGENTCAREUSER: 'HubUrgentCareV2',
  FILLPACIENTES: 'HubUrgentCareV2/fillPacientes',
  CALLCONSULTORIOS: 'HubUrgentCareV2/callConsultorios'
};

export const PrivateRoutesAdmin = {
  ADMIN: 'Admin',
  HUBURGENTCAREADMIN: 'Admin/HubUrgentCareV1',
  FILLPACIENTES: 'Admin/HubUrgentCareV1/fillPacientes',
  CALLCONSULTORIOS: 'Admin/HubUrgentCareV1/callConsultorios'
};
