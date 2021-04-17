const express = require("express");
const Queue = require("bull");
const { Client } = require("pg");
const QueryStream = require("pg-query-stream");
const JSONStream = require("JSONStream");
const es = require("event-stream");

const client = new Client();
client.connect();

// Serve on PORT on Heroku and on localhost:5000 locally
let PORT = process.env.PORT || "5000";
// Connect to a local redis intance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const app = express();

// Create / Connect to a named work queue
let workQueue = new Queue("work", REDIS_URL);

// Serve the two static assets
app.get("/", (req, res) => res.sendFile("index.html", { root: __dirname }));
app.get("/client.js", (req, res) =>
  res.sendFile("client.js", { root: __dirname })
);

// Kick off a new job by adding it to the work queue
app.post("/job", async (req, res) => {
  // This would be where you could pass arguments to the job
  // Ex: workQueue.add({ url: 'https://www.heroku.com' })
  // Docs: https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
  let job = await typeQueueActivists.add();
  res.json({ id: job.id });
});

// Allows the client to query the state of a background job
app.get("/actions/:year", async (req, res) => {
  let year = req.params.year;
  const query = new QueryStream(
    "SELECT * FROM activists where created_at > $1 and created_at < $2",
    [`01-01-${year} 00:00:00`, `12-31-${year} 23:59:59`]
  );
  const stream = client.query(query);
  //release the client when the stream is finished
  stream.on("end", () => console.log("terminou..."));

  stream
    .pipe(JSONStream.stringify())
    .pipe(JSONStream.parse("*"))
    .pipe(
      es.map((data, callback) => {
        let hello = async (data) => {
          return await workQueue.add(data, { removeOnComplete: true });
        };

        hello(data)
          .then((data) => {
            callback(null, JSON.stringify(data));
          })
          .catch((r) => {
            console.log(`ERROR ADD QUEUE: ${r}`);
          });
      })
    )
    .pipe(res);
});

// You can listen to global events to get notified when jobs are processed
workQueue.on("global:completed", (jobId, result) => {
  console.log(`Job completed with result ${result}`);
});

app.listen(PORT, () => console.log("Server started!"));
