module.exports = {

  attributes: {
      Name: {type: Sequelize.STRING},         
      au_id: {type: Sequelize.STRING},
      link: {type: Sequelize.STRING},
      av: {type: Sequelize.STRING},
      friends: {type: Sequelize.INTEGER},
    },
  associations: function () {
    },
  options: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        freezeTableName: false,
    }


};

