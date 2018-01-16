module.exports.cron = {
  myFirstJob: {
    schedule: '* * * * * *',
    onTick: function () {
      // console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
      // console.log('----Cron Job Started-----');
      // sails.request('/add');
    },
  },
  queueJob: {
    schedule: '* * * * * *',
    start: true,
    onTick: () => {
      let queue = sails.hooks.queue;
      queue.getNew().then((current) => {
        if (current) {
          queue.setStatus(current, 'PROCESSING').then(() => {
            let req = JSON.parse(current.dataValues.req);
            sails.hooks.tw.tweetq(req.q, req.num).then((res) => {
              console.log('request done');
              queue.setStatus(current, 'PERFORMED');
            }).catch((err) => {
              console.log(err);
              queue.setStatus(current, 'NEW');
            });
          }).catch((err) => {
            console.log(err);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    runOnInit: true,
  },
  anotherJob: {
    schedule: '* * * * * *',
    start: true,
    onTick: () => {
      sails.hooks.queue.put({q: '%23rt', num: Math.round(Math.random()*10 + 1)}).then((res) => {
      }).catch((err) => {
        console.log(err);
      });
    },
    runOnInit: true
  }
};
