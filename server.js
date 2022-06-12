const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const db = require('./models');

app.get('/test', (request, response) => {
  console.log('solicitud', request)
  const respuesta = {respuesta1: 'Hola mundo'}
  response.status(200).json({ respuesta: 'uno', clave2: 2000, nombres: true, holagente: respuesta})


})

app.post('/login', (request, response) => {
  console.log('Datos entrantes',request.body)
  const email = request.body.email
  const password = request.body.password

  if (email === undefined || email === ''){
    response.status(500).json({error: true, message: 'Correo requerido'})
  }else if(password === undefined || password === ''){
    response.status(500).json({error: true, message: 'Contraseña requerida'})
  }else{
    response.status(200).json({error: false, message: 'Se ingreso correctamente'})
  }
})

app.post('/register', (request, response) => {
  console.log('Datos entrantes', request.body)
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password

  if(name === undefined || name === ''){
    response.status(500).json({error: true, message: 'Nombre es requerido'})
  }else if (email === undefined || email === ''){
    response.status(500).json({error: true, message: 'El correo es requerido'})
  }else if (password === undefined || password === ''){
    response.status(500).json({error: true, message: 'La contraseña es requerida'})
  }else{
    response.status(200).json({error: false, message: 'Se a registrado con exito'})
  }
})



// ejecutar modelos en la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log('Sync Database');
});


app.listen(port, () => {
  console.log(`Aplicacion corriendo en http://localhost:${port}`);
});
