module.exports = {
  attributes: {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    req: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    }
  }
};
