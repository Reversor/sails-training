module.exports = {
  
    attributes: {
        Name: {type: Sequelize.STRING},         
        Text: {type: Sequelize.STRING},
        Created_at: {type: Sequelize.STRING},
        Likes: {type: Sequelize.INTEGER},
        Retweet_count: {type: Sequelize.INTEGER},
        Message_id: {type: Sequelize.STRING}
      },
    associations: function () {
      },
    options: {
          charset: 'utf8',
          collate: 'utf8_general_ci',
          freezeTableName: false
      }
  
  
  };
  
  