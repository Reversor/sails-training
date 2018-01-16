module.exports = function queue(sails) {

  return {
    put: (req) => {
      let queue = {
        req: JSON.stringify(req),
        status: 'NEW',
      };
      return Queue.create(queue);
    },
    getNew: () => {
      return Queue.findOne({
        where: {
          status: 'NEW'
        }});
    },
    setStatus: (queue, status) => {
      queue.status = status;
      return queue.save();
      // return queue.update({status: status}, {where: {id: queue.id}});
    }
  };
};
