import { getChannel } from "./rabbit.js";

export const sendToQueue = async (message) => {
  const channel = getChannel();

  const queue = "order_queue";


  await channel.assertQueue(queue, { durable: true });

channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(message))
  );
};