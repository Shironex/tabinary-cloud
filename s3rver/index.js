const fs = require("fs");
const S3rver = require("s3rver");
const corsConfig = require.resolve('./cors.xml');

new S3rver({
  port: 4569,
  address: "0.0.0.0",
  silent: false,
  directory: "./",
  configureBuckets: [
    {
      name: "storage",
      configs: [fs.readFileSync(corsConfig)],
    },
  ],
}).run();


//? Eventy do zrobienia na potem typu Put object / update etc
// const s3Events = fromEvent(instance, 'event');
// s3Events.subscribe((event) => console.log(event));
// s3Events
//   .pipe(filter((event) => event.Records[0].eventName == 'ObjectCreated:Copy'))
//   .subscribe((event) => console.log(event));