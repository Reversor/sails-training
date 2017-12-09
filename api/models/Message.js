module.exports = {
  
    attributes: {
        Name: {type: Sequelize.STRING},         
        text: {type: Sequelize.STRING},
        cur_d: {type: Sequelize.STRING},
        likes: {type: Sequelize.INTEGER}
      },
    associations: function () {
      },
    options: {
          charset: 'utf8',
          collate: 'utf8_general_ci',
          freezeTableName: false,
          tableName: 'messages',
      }
  
  
  };
  
  