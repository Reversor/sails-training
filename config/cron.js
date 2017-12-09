module.exports.cron = {
    myFirstJob: {
      schedule: '* * * * * *',
      onTick: function () {
        // sails.request('/add');
        // console.log('Added');
      }
    }
  };