const Queue = require('bee-queue');

export const queue = new Queue('example');

// Process jobs from as many servers or processes as you like
queue.process(function (job: any, done: any) {
  console.log(`Processing job`, job.data);
  return done(null, job.data);
});

// {
//     id: text,
//     community_id: number,
//     community_name: text,
//     mobilization_id: number,
//     mobilization_name: text,
//     activist_id: number,
//     activist_email: text,
//     activist_ip: text,
//     activist_first_name: text,
//     activist_last_name: text,
//     activist_fullname: text,
//     activist_city: text,
//     activist_state: text,
//     activist_phone: text,
//     widget_id: number,
//     action_id: number,
//     action_type: text,
//     action_data: text,
//     action_created: date,
//     donation_value: number,
//     donation_recurring: number,
//     donation_status: text,
//     pressure_targets_count: number,
//     form_custom_field_value: text
// }