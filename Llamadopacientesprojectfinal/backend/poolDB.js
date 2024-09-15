const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'llamadopacientes'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MYSQL database: ', err);
    return;
  } else {
    console.log('Connected to MYSQL database');
  }
});

//Funciones

function getAllConsultorios(callback) {
  const query = `SELECT Consultorios.*, Servicio.nombre_servicio
        FROM Consultorios
        JOIN Servicio ON Consultorios.id_servicio = Servicio.id`;

  db.query(query, (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

function addConsultorio(consultorioData, callback) {
  // Desestructuramos los datos del consultorio
  const { nombre_consultorio, nombre_servicio } = consultorioData;

  // Verificamos si el servicio existe antes de agregar el consultorio
  const checkServiceQuery = `SELECT id FROM Servicio WHERE nombre_servicio = ?`;

  db.query(checkServiceQuery, [nombre_servicio], (error, serviceResults) => {
    if (error) {
      console.error('Error al verificar la existencia del servicio:', error);
      callback(error, null);
      return;
    }

    if (serviceResults.length === 0) {
      // Si no se encuentra el servicio, devolvemos un error
      const errorMessage = 'El servicio especificado no existe.';
      console.error(errorMessage);
      callback(errorMessage, null);
      return;
    }

    const id_servicio = serviceResults[0].id;

    // Si el servicio existe, procedemos a agregar el consultorio
    const addConsultorioQuery = `INSERT INTO Consultorios (nombre_consultorio, id_servicio) VALUES (?, ?)`;

    db.query(addConsultorioQuery, [nombre_consultorio, id_servicio], (addError, addResults) => {
      if (addError) {
        console.error('Error al agregar consultorio:', addError);
        callback(addError, null);
        return;
      }

      // Consultamos el nuevo consultorio para devolverlo como resultado
      const newConsultorioQuery = `SELECT Consultorios.*, Servicio.nombre_servicio
        FROM Consultorios
        JOIN Servicio ON Consultorios.id_servicio = Servicio.id
        WHERE Consultorios.id = ?`;

      db.query(newConsultorioQuery, [addResults.insertId], (newConsultorioError, newConsultorioResults) => {
        if (newConsultorioError) {
          console.error('Error al consultar el nuevo consultorio:', newConsultorioError);
          callback(newConsultorioError, null);
          return;
        }

        callback(null, newConsultorioResults[0]);
      });
    });
  });
}

function modifyConsultorio(modificadoConsultorio, callback) {
  const { nombre_servicio, nombre_consultorio, nombre_consultorioNuevo } = modificadoConsultorio;

  // Validaciones en la función de la query
  if (!nombre_servicio || !nombre_consultorio || !nombre_consultorioNuevo) {
    callback({ message: 'Se requieren todos los campos para modificar el consultorio.' }, null);
    return;
  }

  // Realiza las validaciones y lógica de modificación según tus requerimientos
  // ...

  const modifyConsultorioQuery = `
    UPDATE Consultorios
    SET nombre_consultorio = ?
    WHERE id_servicio IN (
      SELECT id
      FROM Servicio
      WHERE nombre_servicio = ?
    ) AND nombre_consultorio = ?;`;

  db.query(modifyConsultorioQuery, [nombre_consultorioNuevo, nombre_servicio, nombre_consultorio], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }

    // Puedes agregar más lógica aquí si es necesario

    callback(null, results);
  });
}

function cachePacienteTriage(nuevoPaciente, callback) {
  const { nombre, documentoId, consultorio, } = nuevoPaciente;

  // Validaciones en la función de la query
  if ( !nombre || !documentoId || !consultorio ) {
    callback({ message: 'Se requieren todos los campos para agregar un paciente. Triage' }, null);
    return;
  }

  const agregarPacienteQuery = `
    INSERT INTO cache_pacientes (nombre_paciente, cedula, consultorio_llamado)
    VALUES (?, ?, ?);`;

  db.query(agregarPacienteQuery, [nombre, documentoId, consultorio], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }

    // Puedes agregar más lógica aquí si es necesario

    callback(null, results);
  });
}

function cachePaciente(nuevoPaciente, callback) {
  const { nombre, documentoId, consultorio, nivelTriage } = nuevoPaciente;

  // Validaciones en la función de la query
  if (!nombre || !documentoId || !consultorio || !nivelTriage) {
    callback({ message: 'Se requieren todos los campos para agregar un paciente.' }, null);
    return;
  }

  const agregarPacienteQuery = `
    INSERT INTO cache_pacientes (nombre_paciente, cedula, consultorio_llamado, nivel_triage)
    VALUES (?, ?, ?, ?);`;

  db.query(agregarPacienteQuery, [nombre, documentoId, consultorio, nivelTriage], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }

    // Puedes agregar más lógica aquí si es necesario

    callback(null, results);
  });
}

module.exports = {
  db,
  getAllConsultorios,
  addConsultorio,
  modifyConsultorio,
  cachePaciente,
  cachePacienteTriage
};