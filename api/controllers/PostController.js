module.exports = {
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

