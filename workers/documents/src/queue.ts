const Queue = require('bee-queue');
const redis = require('redis');
import { client as elkClient } from './docs';

export const queue = new Queue('example', {
  redis: redis.createClient(process.env.REDIS_URL || "redis://127.0.0.1:6379"),
});

// Process jobs from as many servers or processes as you like
queue.process(async (job: any) => {
  console.log(`Processing job`, job.data);
  return await elkClient.index({
    index: 'bonde-actions',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: job.data
  });
  // return ;
});
