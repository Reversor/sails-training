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



module.exports = {
    add: function (req,res) {
        client.get("search/tweets.json?q=keddr&count="+page, (error, tweets, response) => {
            tw=tweets;})
        const name= tw.statuses[0].user.screen_name;
        const aid=  tw.statuses[0].user.id_str;
        const lnk=  tw.statuses[0].user.url;
        const fr=   tw.statuses[0].user.friends_count;
        const av=   tw.statuses[0].user.profile_image_url;
        const t=    tw.statuses[0].text;
        const tt=   {mes: t};
        const cd=   tw.statuses[0].created_at;
        const lk=   tw.statuses[0].favorite_count;
        if (tw.statuses[0].retweeted_status !== undefined) {
            const n=    tw.statuses[0].retweeted_status.user.screen_name;
            const t1=   tw.statuses[0].retweeted_status.text;
            const cd1=  tw.statuses[0].retweeted_status.created_at;
            const lk1=  tw.statuses[0].retweeted_status.favorite_count;
            const rtw=  tw.statuses[0].retweeted_status.retweet_count;
            console.log('retweeeeeeetss!!!!!!!!!!!!!!!!!');
        }else{var n='',t1='',cd1='',lk1=0,rtw=0;}
        Cron.findOne({where:{id: 1 }}).then(cron =>{console.log($log=cron.mes)});
        var check=$log;
        var a=sails.hooks.abc;
        console.log(a);
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
    show: function (req,res) {
        Message.findAll().then(Message => {res.json(Message);});
    },
    showo: function (req,res) {
        const id = req.params.id;
        Message.find({where: { id: id }}).then(owner => {res.json(owner);});
    },

};

