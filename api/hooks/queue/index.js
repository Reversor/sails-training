module.exports = function queue(sails) {

  return {
    put: (req) => {
      let queue = {
        date: Date.now(),
        req: req,
        status: 'NEW',
      };
      return Queue.create(queue);
    },
    getNew: () => {
      return Queue.min('date',{
        where: {
          status: 'NEW',
        }
      });
    },
    setNew: (queue) => {
      return queue.update({status: 'NEW'});
    },
    setPerformed: (queue) => {
      return queue.update({status: 'PERFORMED'});
    },
    setInProcessed: (queue) => {
      return queue.update({status: 'PROCESSING'});
    }
  };
};
