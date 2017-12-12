module.exports = function tw(sails) {
    // Twitter api variables     
       var Twitter = require('twitter');
       var page = 1;
       var limit = 10;
       var offset = 0;
       var tw={};
    // auth data for twitter api
       var client = new Twitter({
       consumer_key: 'KMnQ0DrjhUousVBDaH8WuzJ6q',
       consumer_secret: 'fg9cC90G8gqdA9GyY4GPttrANyJBy8JI1XxdzA5UAGZgXME6tX',
       access_token_key: '2450273389-dn9lXWZ1hcsd7qFGlg2iSqsnSVUDbTDQ5QhrLOD',
       access_token_secret: 'U2bXYixYsgNwD5SteyrANVP3VTwarIppiEK07KItSgvyC'
       });
       
       return {
          // search tweets by query
          tweetq: function () {
            client.get("search/tweets.json?q=russia&count="+page, (error, tweets, response) => {tww=tweets;});
            return tww;
          }
       };
    };