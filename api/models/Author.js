module.exports = {

  attributes: {
      Name: {type: Sequelize.STRING},         
      Author_id: {type: Sequelize.STRING},
      Link: {type: Sequelize.STRING},
      Avatar: {type: Sequelize.STRING},
      Friends_Count: {type: Sequelize.INTEGER},
    },
  associations: function () {
    },
  options: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        freezeTableName: false,
    }


};

