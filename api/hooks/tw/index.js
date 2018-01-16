const {Readable, Writable, Transform} = require('stream');

class ReadArray extends Readable {
  constructor(arrayData, opt = {}) {
    super(opt)
    this._arrayData = arrayData;
    this.on('data', (chunk) => {
      console.log('chunk')
    });
    this.on('end', () => {
      console.log('end')
    });
  }

  _read() {
    let data = this._arrayData.shift();
    if (data) {
      this.push(data);
    } else {
      this.push(null);
    }
  }
}


class WriteArray extends Writable {
  constructor(opt = {}) {
    super(opt)
    this.on('finish', (chunk) => {
      console.log('done')
    });
  }

  _write(chunk, encoding, done) {
    console.log('author added')
    Author.findOrCreate({where: {Author_id: chunk.b.Author_id}, defaults: chunk.b})
    console.log('message added')
    // Message.create(chunk.a)
    Message.findOrCreate({where: {Message_id: chunk.a.Message_id}, defaults: chunk.a})
    console.log('retweeet added')
    Post.findOrCreate({where: {Text: chunk.c.Text}, defaults: chunk.c})
    Cron.update({mes: chunk.a.text}, {where: {id: 1}})
    done();
  }
}

class TransformArray extends Transform {
  constructor(opt = {}) {
    super(opt)
    this.on('finish', (chunk) => {
      console.log('transformed')
    });
  }

  _transform(chunk, encoding, done) {
    if (chunk.retweeted_status !== undefined) {
      this.push({
        a: {
          Name: chunk.user.screen_name,
          Text: chunk.text,
          Created_at: chunk.created_at,
          Likes: chunk.favorite_count,
          Message_id: chunk.id,
          Author_id: chunk.user.id_str
        },
        b: {
          Name: chunk.user.screen_name,
          Author_id: chunk.user.id_str,
          Link: chunk.user.url,
          Avatar: chunk.user.profile_image_url,
          Friends_Count: chunk.user.friends_count
        },
        c: {
          Name: chunk.retweeted_status.user.screen_name,
          Text: chunk.retweeted_status.text,
          Created_at: chunk.retweeted_status.created_at,
          Likes: chunk.retweeted_status.favorite_count,
          Retweet_count: chunk.retweet_count,
          Message_id: chunk.id
        }
      });
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
    consumer_key: 'KMnQ0DrjhUousVBDaH8WuzJ6q',
    consumer_secret: 'fg9cC90G8gqdA9GyY4GPttrANyJBy8JI1XxdzA5UAGZgXME6tX',
    access_token_key: '2450273389-dn9lXWZ1hcsd7qFGlg2iSqsnSVUDbTDQ5QhrLOD',
    access_token_secret: 'U2bXYixYsgNwD5SteyrANVP3VTwarIppiEK07KItSgvyC'
  });

  return {
    tweetq: function (q, num) {
      return geet(q, num);
    },

    tweets: (q, num) => {
      client.get('search/tweets.json?q=' + q + '&count=' + num, (error, tweets, response) => {
        let opts = {objectMode: true};
        // console.log(tweets);
        if (!tweets.errors) {
          const R = new ReadArray(tweets.statuses, opts);
          const W = new WriteArray(opts);
          const T = new TransformArray(opts);
          R.pipe(T).pipe(W);
          return true;
        }
        return false;
      });
    },

    tweeta: function () {
      client.get('search/tweets.json?q=' + q + '&count=' + num, (error, tweets, response) => {
        let opts = {objectMode: true};
        // console.log(tweets);
        if (!tweets.errors) {
          const R = new ReadArray(tweets.statuses, opts);
          const W = new WriteArray(opts);
          const T = new TransformArray(opts);
          R.pipe(T).pipe(W);
        }
      });
    }
  };


  function geet(q, num) {
    return new Promise((resolve, reject) => {
      client.get("search/tweets.json?q=" + q + "&count=" + num, (error, tweets, response) => {
        resolve(tweets);
      });
    });

  }
};
