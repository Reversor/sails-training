/**
 * Author.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
        tableName: 'authors',
    }


};

