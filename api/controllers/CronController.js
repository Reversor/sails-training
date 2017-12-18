module.exports = {
        // post records into db
        add: function (req,res) {
            sails.hooks.tw.tweeta();
            res.ok('ok');
        },
        // get last tweet
        tweet: function (req,res) {
            sails.hooks.tw.tweetq().then((tw)=>{
                res.json(tw.statuses[0]);
            });
           
        },
};

