module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Davidpacheco126",
  DB: "parcial3",
  dialect: "mysql",
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
};
