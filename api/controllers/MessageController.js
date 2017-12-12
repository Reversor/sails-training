module.exports = {
    // post records into db
    add: function (req,res) {
        // call twitter api
        var tw=sails.hooks.tw.tweetq();
        // var for twitter json
        const name= tw.statuses[0].user.screen_name;
        const aid=  tw.statuses[0].user.id_str;
        const lnk=  tw.statuses[0].user.url;
        const fr=   tw.statuses[0].user.friends_count;
        const av=   tw.statuses[0].user.profile_image_url;
        const t=    tw.statuses[0].text;
        const tt=   {mes: t};
        const cd=   tw.statuses[0].created_at;
        const lk=   tw.statuses[0].favorite_count;
        // check retweets not null
        if (tw.statuses[0].retweeted_status !== undefined) {
            var n=    tw.statuses[0].retweeted_status.user.screen_name;
            var t1=   tw.statuses[0].retweeted_status.text;
            var cd1=  tw.statuses[0].retweeted_status.created_at;
            var lk1=  tw.statuses[0].retweeted_status.favorite_count;
            var rtw=  tw.statuses[0].retweeted_status.retweet_count;
            console.log('retweeeeeeetss!!!!!!!!!!!!!!!!!');
        }else{var n=t1=cd1=lk1=rtw=null;}
        // get message from cron job
        Cron.findOne({where:{id: 1 }}).then(cron =>{console.log($log=cron.mes)});
        var check=$log;
        // check if it exist in db
        if(t !== check){
            Post.create({Name: n,text: t1,cur_d: cd1,likes: lk1,retw: rtw}),
            Message.create({Name: name,text: t,cur_d: cd,likes: lk}),
            Author.create({Name: name,au_id: aid,link: lnk,av: av,friends: fr}),
            Cron.update(tt, {where: { id: 1 } }),
            console.log('ADDED'); 
            console.log('----------------------------------------------------');        
        }
        res.ok('ok');
    },
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

