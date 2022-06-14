module.exports = (sequelize, Sequelize) => {
  const Trans = sequelize.define("trans", {

    name: {
      type: Sequelize.STRING

    },
    dateTrans: {
      type: Sequelize.STRING
    },
    monto: {
      type: Sequelize.STRING
    }
  })
  return Trans;
};