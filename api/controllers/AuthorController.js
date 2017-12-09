/**
 * AuthorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var Twitter = require('twitter');
var page = 125;
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

client.get("search/tweets.json?q=keddr&count="+page, (error, tweets, response) => {
    tw=tweets;})

module.exports = {
    tweet: function (req,res) {
        res.json(tw.statuses[0]);
    },
    show: function (req,res) {
        Author.findAll().then(Author => {res.json(Author);});
    },
    showo: function (req,res) {
        const id = req.params.id;
        Author.find({where: { id: id }}).then(owner => {res.json(owner);});
    },

};

