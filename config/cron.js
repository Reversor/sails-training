module.exports.cron = {
    myFirstJob: {
      schedule: '* * * * * *',
      onTick: function () {
        // console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
        // console.log('----Cron Job Started-----');
        // sails.request('/add');
  },
  queueJob: {
    schedule: '* * * * * *',
    start: true,
    onTick: () => {
      let queue = sails.hooks.queue;
      let current = queue.getNew();
      if (current) {
        current = queue.setInProcessed(current);
        sails.hooks.tw.tweets(current.req.q, current.req.num)
          .then((success)=> {
            if (success) {
              queue.setPerformed(current);
            } else {
              queue.setNew(current);
            }
          });
      }
    },
    runOnInit: true,
  }
};
