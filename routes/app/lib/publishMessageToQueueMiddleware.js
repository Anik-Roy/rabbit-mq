const amqp = require('amqplib/callback_api');
const queue = 'notification';

/**
 * @name storeMessageToQueueMiddleware
 * @param {string} req.body
 * @param {Response} res
 * @returns {Promise<Response>}
 */
async function storeMessageToQueueMiddleware(req, res) {
  const users = [
    {
      platform_user_id: '633fd8ea2dbcfe23c7fa63ef',
    },
    {
      platform_user_id: '630dce0ed5ee9f1651de4ac6',
    },
    {
      platform_user_id: '633e96591da359080e0f1308',
    },
  ];

  try {
    amqp.connect('amqp://localhost', function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        const data = req.body;

        channel.assertQueue(queue, {
          durable: false,
        });

        // Array.from(new Array(5)).map((_, i) => {
        //   channel.sendToQueue(
        //     queue,
        //     Buffer.from(JSON.stringify({ index: i, ...data }))
        //   );
        //   console.log('message published to queue~!', i);
        // });
        users.map((user, i) => {
          channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify({ index: i, ...data, userId: user.platform_user_id }))
          );
          console.log('message published to queue~!', user.platform_user_id);
        });
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    });
    res.send('message published!');
  } catch (error) {
    return res
      .status((error && error.response && error.response.status) || 500)
      .send(error.response);
  }
}

module.exports = storeMessageToQueueMiddleware;
