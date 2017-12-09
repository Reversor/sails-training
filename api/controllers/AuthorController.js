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

