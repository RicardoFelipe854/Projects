const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // Importa el módulo cors
const app = express();
const server = http.createServer(app);
const db = require('./poolDB'); // Connection db

app.use(express.json());

// Configura el middleware cors
app.use(cors({
  origin: "http://localhost:3000", // Reemplaza con tu origen permitido
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
}));

// Configura Socket.IO con la configuración de CORS
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Reemplaza con tu origen permitido
    methods: ["GET", "POST"]
  }
});

/*const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const db = require('./poolDB');//Connection db
const cors = require('cors');

app.use(express.json());

/*
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

/*
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
  } )
);//reemplazar*/

const pacientesTv = [];
const pacienteArray = [];

const eliminarPacienteTv = () => {
  if (pacientesTv.length > 0) {
    const pacienteEliminado = pacientesTv.pop();
    console.log(`Paciente '${pacienteEliminado.nombre}' eliminado. Nuevos pacientes:`, pacientesTv);
  } else {
    console.log("No hay pacientes para eliminar.");
  }
}

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Escucha eventos de nuevos pacientes
  socket.on('nuevoPacienteTv', (paciente) => {
    pacientesTv.unshift(paciente);
    console.log(pacientesTv);
    console.log(" ");

    const cronometro = setInterval(() => {
      eliminarPacienteTv();
      clearInterval(cronometro); // Detener el cronómetro después de ejecutar la acción
    }, 15 * 60 * 1000);
    // Envía la actualización a todos los clientes conectados
    io.emit('actualizarPacientesTv', pacientesTv);
  } );

  socket.on('pacienteNuevo', (paciente) => {
    pacienteArray.unshift(paciente);
    console.log(pacienteArray);
    console.log(" ");
    io.emit('recibirPacientesOnLive', pacienteArray)
  } );

  socket.on('emitirPacientes', () => {
    io.emit('recibirPacientes', pacienteArray);
  } );

  socket.on('borrarPaciente', (data) => {
    const documentoId = data.documentoId; // Accede a documentoId desde el objeto recibido

    const indicePaciente = pacienteArray.findIndex((paciente) => paciente.documentoId === documentoId);

    if (indicePaciente !== -1) {
      // Si se encuentra el paciente, eliminarlo del array
      pacienteArray.splice(indicePaciente, 1);
      console.log(`Paciente con cédula ${documentoId} eliminado.`);
    } else {
      console.log(`No se encontró ningún paciente con cédula ${documentoId}.`);
    }
  });

  // Maneja la desconexión del usuario
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  } );
});


app.get('/api/consultorios', (req, res) => {
  db.getAllConsultorios((error, results) => {
    if (error) {
      console.error('Error fetching Consultorios:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

// Agregar un nuevo consultorio
app.post('/api/consultorioAdd', (req, res) => {
  const nuevoConsultorio = req.body;

  // Verificamos que se hayan proporcionado los datos necesarios
  if (!nuevoConsultorio.nombre_consultorio || !nuevoConsultorio.nombre_servicio) {
    res.status(400).json({ error: 'Se requieren nombre_consultorio y nombre_servicio para agregar un consultorio.' });
    return;
  }

  // Llamamos a la función para agregar el consultorio
  db.addConsultorio(nuevoConsultorio, (error, nuevoConsultorioAgregado) => {
    if (error) {
      console.error('Error agregando consultorio:', error);
      res.status(500).json({ error: 'Error interno del servidor al agregar el consultorio.' });
      return;
    }

    res.status(201).json(nuevoConsultorioAgregado); // 201 significa "Created"
  });
});

app.put('/api/consultorioModify', (req, res) => {
  const modificadoConsultorio = req.body;

  // Validaciones en la API
  if (!modificadoConsultorio || !modificadoConsultorio.nombre_servicio || !modificadoConsultorio.nombre_consultorio || !modificadoConsultorio.nombre_consultorioNuevo) {
    res.status(400).json({ error: 'Se requieren todos los campos para modificar el consultorio.' });
    return;
  }

  // Llamamos a la función para modificar el consultorio
  db.modifyConsultorio(modificadoConsultorio, (error, consultorioModificado) => {
    if (error) {
      console.error('Error modificando consultorio:', error);
      res.status(500).json({ error: 'Error interno del servidor al modificar el consultorio.' });
      return;
    }

    res.json(consultorioModificado);
  });
} );

app.post('/api/cachePacientes', (req, res) => {
  const nuevoPaciente = req.body;

  // Validaciones en la API
  if (!nuevoPaciente.nivelTriage) {
    db.cachePacienteTriage(nuevoPaciente, (error, pacienteAgregado) => {
      if (error) {
        console.error('Error agregando paciente:', error);
        res.status(500).json({ error: 'Error interno del servidor al agregar el paciente.' });
        return;
      }

      res.status(201).json(pacienteAgregado); // 201 significa "Created"
    });
  } else if (!nuevoPaciente || !nuevoPaciente.nombre || !nuevoPaciente.documentoId || !nuevoPaciente.consultorio) {
    res.status(400).json({ error: 'Se requieren todos los campos para agregar un paciente.' });
    return;
  } else {
    // Llamamos a la función para agregar el paciente
    db.cachePaciente(nuevoPaciente, (error, pacienteAgregado) => {
      if (error) {
        console.error('Error agregando paciente:', error);
        res.status(500).json({ error: 'Error interno del servidor al agregar el paciente.' });
        return;
      }

      res.status(201).json(pacienteAgregado); // 201 significa "Created"
    });
  }
});


const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor backend iniciado en http://localhost:${PORT}`);
});
