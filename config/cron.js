module.exports.cron = {
    myFirstJob: {
      schedule: '* * * * * *',
      onTick: function () {
        console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
        console.log('----Cron Job Started-----');
        sails.request('/add');
        console.log('----Cron Job Stopped-----');
      }
    }
  };