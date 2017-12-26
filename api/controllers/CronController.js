module.exports = {
  // post records into db
  add: function (req, res) {
    sails.hooks.tw.tweeta();
    res.ok('ok');
  },
  // get last tweet
  tweet: function (req, res) {
    sails.hooks.tw.tweetq().then((tw) => {
      res.json(tw.statuses[0]);
    });

  },
  // get tweets
  tweets: function (req, res) {
    let query = req.query;
    if (query) {
      sails.hooks.queue.put(req.parameters).then(
        () => {
          res.json({ msg: 'Add to queue'});
        }
      );
    } else {
      res.json({ error: 'Bad request'});
    }
  }
};

