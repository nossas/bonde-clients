import { Command } from 'commander';
import * as db from './db';
import { queue } from './queue';

const program = new Command();
program.version('0.0.1');


// Add nested commands using `.command()`.
const brew = program.command('brew');
brew
  .command('tea')
  .action(async () => {
    await db.check();
    const Model = db.model();
    // queue.send("createmessages");

    const formEntries = await db.getActions(8, 'form', Model.FormEntry, Model)
    console.log(`There are ${(formEntries.count)} form entries`);

    formEntries.rows.forEach((c: any) => {
      c.mobilizations.forEach((m: any) => {
        m.blocks.forEach((b: any) => {
          b.widgets.forEach((w: any) => {
            w.form_entries.forEach((fe: any) => {
              const job = queue.createJob(({
                id: "",
                community_id: c.id,
                community_name: c.name,
                mobilization_id: m.id,
                mobilization_name: m.name,
                activist_id: "",
                activist_email: "",
                activist_ip: "",
                activist_first_name: "",
                activist_last_name: "",
                activist_fullname: "",
                activist_city: "",
                activist_state: "",
                activist_phone: "",
                widget_id: w.id,
                action_id: fe.id,
                action_type: "form",
                action_data: "",
                action_created: fe.created_at,
                donation_value: "",
                donation_recurring: "",
                donation_status: "",
                pressure_targets_count: "",
                form_custom_field_value: ""
              }));
              job.save();

              job.on('succeeded', (result: any) => {
                console.log(`Received result for job ${job.id}:` ,result);
              });
            });
          });
        });
      });
    });

    const pressures = await db.getActions(8, 'pressure', Model.PressureByEmail, Model)
    console.log(`There are ${(pressures.count)} pressures`);

    const pressuresPhone = await db.getActions(8, 'pressure-phone', Model.PressureByPhone, Model)
    console.log(`There are ${(pressuresPhone.count)} pressures phone`);

    const donations = await db.getActions(8, 'donation', Model.Donation, Model)
    console.log(`There are ${(donations.count)} donations`);

  });
;
brew
  .command('coffee')
  .action(() => {
    console.log('brew coffee');
  });

// Add nested commands using `.addCommand().
// The command could be created separately in another module.
function makeHeatCommand() {
  const heat = new Command('heat');
  heat
    .command('jug')
    .action(() => {
      console.log('heat jug');
    });
  heat
    .command('pot')
    .action(() => {
      console.log('heat pot');
    });
  return heat;
}
program.addCommand(makeHeatCommand());

program.parse(process.argv);
