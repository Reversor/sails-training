const {Readable,Writable,Transform} = require('stream');

class ReadArray extends Readable{
    constructor(arrayData,opt={}){
        super(opt)
        this._arrayData=arrayData;
        this.on('data',(chunk)=>{console.log('chunk')});
        this.on('end',()=>{console.log('end')});
    }

    _read(){
        let data=this._arrayData.shift();
        if(data){
            this.push(data);
        }else{
            this.push(null);
        }
    }
}


class WriteArray extends Writable{
    constructor(opt={}){
        super(opt)
        this.on('finish',(chunk)=>{console.log('done')});
    }

    _write(chunk,encoding,done){
            console.log('message added')
            Message.create(chunk.a)
            console.log('author added')
            Author.create(chunk.b)
            console.log('retweeet')
            Post.create(chunk.c)
            Cron.update({mes: chunk.a.text}, {where: { id: 1 } })
        done();
    }
}

class TransformArray extends Transform{
    constructor(opt={}){
        super(opt)
        this.on('finish',(chunk)=>{console.log('transformed')});
    }

    _transform(chunk,encoding,done){
            if(chunk.retweeted_status !== undefined){
                this.push({
                    a:{Name: chunk.user.screen_name, text: chunk.text, cur_d: chunk.created_at, likes: chunk.favorite_count, mes_id: chunk.id, au_id: chunk.user.id_str},
                    b:{Name: chunk.user.screen_name, au_id: chunk.user.id_str, link: chunk.user.url, av: chunk.user.profile_image_url, friends: chunk.user.friends_count},
                    c:{Name: chunk.retweeted_status.user.screen_name, text: chunk.retweeted_status.text, cur_d: chunk.retweeted_status.created_at, likes: chunk.retweeted_status.favorite_count, retw: chunk.retweet_count, mes_id: chunk.id}});
            }
        done();
    }
}

module.exports = function tw(sails) {
    // Twitter api variables     
       var Twitter = require('twitter');
       var num = 5;
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
            return geet(q,num).then((tww)=> {
                return tww;
            });
           
          },

          tweeta: function() {
            client.get("search/tweets.json?q="+q+"&count="+num, (error, tweets, response) => {
                let opts = {objectMode:true};
                // console.log(tweets);
                if(!tweets.errors){
                            const R = new ReadArray(tweets.statuses,opts); 
                            const W = new WriteArray(opts); 
                            const T = new TransformArray(opts);
                            R.pipe(T).pipe(W);
                }                            
            })
          }
       };
           

        function geet (q,num) {
            return new Promise((resolve, reject) =>{
                client.get("search/tweets.json?q="+q+"&count="+num, (error, tweets, response) => {
                    resolve(tweets)
                })
            })
               
        }
    };
        