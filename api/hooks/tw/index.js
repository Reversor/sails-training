module.exports = function tw(sails) {
    // Twitter api variables     
       var Twitter = require('twitter');
       var num = 1;
       var q = 'Russia';  
       var tw = {};
    // auth data for twitter api
       var client = new Twitter({
       consumer_key:        'KMnQ0DrjhUousVBDaH8WuzJ6q',
       consumer_secret:     'fg9cC90G8gqdA9GyY4GPttrANyJBy8JI1XxdzA5UAGZgXME6tX',
       access_token_key:    '2450273389-dn9lXWZ1hcsd7qFGlg2iSqsnSVUDbTDQ5QhrLOD',
       access_token_secret: 'U2bXYixYsgNwD5SteyrANVP3VTwarIppiEK07KItSgvyC'
       });
       
       return {
          tweetq: function () {
            geet(q,num);
            return tww;
          },

          tweeta: function() {
            client.get("search/tweets.json?q="+q+"&count="+num, (error, tweets, response) => {
                if(tweets){
                    tw=tweets;
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
                    Cron.findOne({where:{id: 1 }}).then(cron =>{
                        // check if it exist in db
                        if(t !== cron.mes){
                            Post.create({Name: n,text: t1,cur_d: cd1,likes: lk1,retw: rtw}),
                            Message.create({Name: name,text: t,cur_d: cd,likes: lk}),
                            Author.create({Name: name,au_id: aid,link: lnk,av: av,friends: fr}),
                            Cron.update(tt, {where: { id: 1 } }),
                            console.log('ADDED:  '+t); 
                            console.log('----------------------------------------------------');        
                            }
                    });
                }
            })
          }
       };

        // search tweets by query
        async function geet (q,num) {
            client.get("search/tweets.json?q="+q+"&count="+num, (error, tweets, response) => {
                // console.log(Object.keys(response));
                // console.log(response.complete);
                if(response.complete==true){
                    tww=tweets;
                }else{
                    return Promise.reject(new Error('Problem!'));
                }
        });
        return Promise.resolve(tww);
    }
 
    

           
    };