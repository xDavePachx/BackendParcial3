const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const db = require('./models');
const User = db.user;
const Trans = db.trans;
const cors = require('cors');
const { trans } = require('./models');
const corsOptions = {origin: '*'};
app.use(cors(corsOptions));


//este solo era prueba para ver si habia conexion 
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
    response.status(500).json({error: true, message: 'error creando usuarios'})
    return
  }
  console.log('Enviando respuesta exitosa')
  response.status(200).json({error: false, message: 'Se a registrado con exito', data: newUser})

  console.log('Si llegamos abajo')

})

app.get('/list-users', async (request, response) =>{
  const users = await User.findAll()

  if(users === null){
    response.status(500).json({error: true, message: 'Fallo consultando usuarios'})
    return
  }

  response.status(200).json({error: false, data: users})

})


app.get('/listar-transacciones', async (request, response) => {
  const trans = await Trans.findAll()

  if(trans === null){
    response.status(500).json({error: true, message: 'Fallo consulta de transacciones'})
    return
  }

  response.status(200).json({error: false, data: trans})
})

app.post('/realizar-transaccion', async (request, response) => {
  console.log('Datos entrantes', request.body)
  const name = request.body.name
  const dateTrans = request.body.dateTrans
  const monto = request.body.monto

  if(name === undefined || name === ''){
    response.status(500).json({error: true, message: 'Nombre es requerido'})
    return
  }
  
  if (dateTrans === undefined || dateTrans === ''){
    response.status(500).json({error: true, message: 'La fecha es requerida'})
    return
  }
  
  if (monto === undefined || monto === ''){
    response.status(500).json({error: true, message: 'El monto es requerido'})
    return
  }

  const trans = {
    name: name,
    dateTrans: dateTrans,
    monto: monto
  }

  

  const newTrans = await Trans.create(trans);
  if(newTrans === null){
    response.status(500).json({error: true, message: 'Error creando transaccion'})
    return
  }
  console.log('Enviando respuesta exitosa')
  response.status(200).json({error: false, message: 'Se a realizado con exito', data: newTrans})

  //confirmacion en consola
  console.log('Si llegamos abajo')

})

app.delete('/delete-user/:id', async (request, response) => {
  console.log('viene en parametros', request.params)
  const userId = request.params.id


  if (userId === undefined || userId === ''){
    response.status(500).json({error: true, message: 'id requerido'})
    return
  }
  if (typeof(parseInt(userId, 10)) !== 'number'){
    response.status(500).json({error:true, message: 'id debe ser de tipo numero'})
    return

  }
  
  

  const deleteResponse = await User.destroy({
    where: {
      id: userId
    }

  });
  console.log('eliminacion', deleteResponse)


  if (deleteResponse === null) {
    response.status(500).json({error: true, message: 'Error al eliminar usuario'})
    return
  }

  if (deleteResponse === 0 ) {
    response.status(500).json({error: true, message: 'Este usuario ya fue eliminado'})
    return
  }
  if (deleteResponse === 1) {
    response.status(200).json({error: false, message: 'Se elimino correctamente'})
  }
})

app.delete('/delete-transaccion/:id', async (request, response) => {
  console.log('viene en parametros', request.params)
  const transId = request.params.id

  if (transId === undefined || transId === ''){
    response.status(500).json({error:true, message: 'id requerido'})
    return
  }

  if (typeof(parseInt(transId, 10)) !== 'number'){
    response.status(500).json({error:true, message: 'id debe ser de tipo numero'})
    return

  }

  const deleteResponse = await Trans.destroy({
    where: {
      id: transId
    }

  });
  console.log('eliminacion', deleteResponse)

  if (deleteResponse === null) {
    response.status(500).json({error:true, message: 'Error al eliminar transaccion'})
    return
  }
  
  if (deleteResponse === 0) {
    response.status(500).json({error: true, message: 'Esta transaccion ya fue eliminado'})
    return
  }

  if (deleteResponse === 1 ) {
    response.status(200).json({error: false, message: 'Se elimino correctamente'})
  }
});



// ejecutar modelos en la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log('Sync Database');
});





app.listen(port, () => {
  console.log(`Aplicacion corriendo en http://localhost:${port}`);
});
