module.exports = {
    // get last tweet
    tweet: function (req,res) {
        var tw=sails.hooks.tw.tweetq();
        res.json(tw.statuses[0]);
    },
    // show all authors
    show: function (req,res) {
        Author.findAll().then(Author => {res.json(Author);});
    },
    // show author by id
    showo: function (req,res) {
        const id = req.params.id;
        Author.find({where: { id: id }}).then(owner => {res.json(owner);});
    },

};

