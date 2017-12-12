module.exports = {
    // get last tweet json
    tweet: function (req,res) {
        var tw=sails.hooks.tw.tweetq();
        res.json(tw.statuses[0]);
    },
    // get all posts
    show: function (req,res) {
        Post.findAll().then(Post => {res.json(Post);});
    },
    // get post by id
    showo: function (req,res) {
        const id = req.params.id;
        Post.find({where: { id: id }}).then(owner => {res.json(owner);});
    },

};

