module.exports = {
    // get message records from db
    show: function (req,res) {
        Message.findAll().then(Message => {res.json(Message);});
    },
    //  get message by id 
    showo: function (req,res) {
        const id = req.params.id;
        Message.find({where: { id: id }}).then(owner => {res.json(owner);});
    },

};

