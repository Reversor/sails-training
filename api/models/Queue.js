module.exports = {
  attributes: {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    date: {
      type: Sequelize.DATE,
    },
    req: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    }
  }
};
