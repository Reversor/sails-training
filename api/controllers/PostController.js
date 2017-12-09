module.exports = {
    tweet: function (req,res) {
        res.json(tw.statuses[0]);
    },
    show: function (req,res) {
        Post.findAll().then(Post => {res.json(Post);});
    },
    showo: function (req,res) {
        const id = req.params.id;
        Post.find({where: { id: id }}).then(owner => {res.json(owner);});
    },

};

