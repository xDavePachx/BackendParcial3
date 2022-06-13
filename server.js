const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const db = require('./models');
const User = db.user;

app.get('/test', (request, response) => {
  console.log('solicitud', request)
  const respuesta = {respuesta1: 'Hola mundo'}
  response.status(200).json({ respuesta: 'uno', clave2: 2000, nombres: true, holagente: respuesta})


})

app.post('/login', async (request, response) => {
  console.log('Datos entrantes',request.body)
  const email = request.body.email
  const password = request.body.password

  if (email === undefined || email === ''){
    response.status(500).json({error: true, message: 'Correo requerido'})
    return
  }
  
  if(password === undefined || password === ''){
    response.status(500).json({error: true, message: 'Contraseña requerida'})
    return
  }

  const user = await User.findOne({where: {email: email}});
  console.log('usuario', user) 
  console.log('email', email)
  if (user === null){
    response.status(500).json({error: true, message: 'este usuario no existe '})
    return
  }

  if (password !== user.dataValues.password){
    response.status(500).json({error: true, message: 'la contraseña no es valida' })
    return
  }
  
  response.status(200).json({error: false, message: 'Se ingreso correctamente'})


})



app.post('/register', async (request, response) => {
  console.log('Datos entrantes', request.body)
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password

  if(name === undefined || name === ''){
    response.status(500).json({error: true, message: 'Nombre es requerido'})
    return
  }
  
  if (email === undefined || email === ''){
    response.status(500).json({error: true, message: 'El correo es requerido'})
    return
  }
  
  if (password === undefined || password === ''){
    response.status(500).json({error: true, message: 'La contraseña es requerida'})
    return
  }

  const user = {
    name: name,
    email: email,
    password: password
  }

  

  const newUser = await User.create(user);
  if(newUser === null){
    response.status(500).json({error: true, message: error})
    return
  }
  console.log('Enviando respuesta exitosa')
  response.status(200).json({error: false, message: 'Se a registrado con exito', data: data})

  console.log('Si llegamos abajo')


})



// ejecutar modelos en la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log('Sync Database');
});


app.listen(port, () => {
  console.log(`Aplicacion corriendo en http://localhost:${port}`);
});
