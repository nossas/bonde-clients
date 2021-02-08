import { Command } from 'commander';
import * as db from './db';
import { queue } from './queue';
// import { client as elkClient } from './docs';

const program = new Command();
program.version('0.0.1');


// Add nested commands using `.command()`.
const sync = program.command('sync');
sync
  .command('form')
  .action(async () => {
    await db.check();
    const Model = db.model();

    const formEntries = await db.getActions(8, 'form', Model.FormEntry, Model)
    console.log(`There are ${(formEntries.count)} form entries`);

    formEntries.rows.forEach((c: any) => {
      c.mobilizations.forEach((m: any) => {
        m.blocks.forEach((b: any) => {
          b.widgets.forEach((w: any) => {
            w.form_entries.forEach((fe: any) => {
              const preparedFields: any = []
              JSON.parse(fe.fields).forEach((field:any) => {
                preparedFields['form_' + field.label.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')] = (field.value !== undefined) ? field.value.toLowerCase() : "";
              });
              const job = queue.createJob(({
                id: "",
                community_id: c.id,
                community_name: c.name,
                mobilization_id: m.id,
                mobilization_name: m.name,
                activist_email: preparedFields.form_email,
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
                action_created: new Date(fe.createdAt),
                donation_value: "",
                donation_recurring: "",
                donation_status: "",
                pressure_targets_count: "",
                ...preparedFields,
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

    // await elkClient.indices.refresh({ index: 'bonde-actions' });
  });
;
sync
  .command('pressure')
  .action(async() => {
    const Model = db.model();

    const pressures = await db.getActions(8, 'pressure', Model.PressureByEmail, Model)
    console.log(`There are ${(pressures.count)} pressures`);

    pressures.rows.forEach((c: any) => {
      c.mobilizations.forEach((m: any) => {
        m.blocks.forEach((b: any) => {
          b.widgets.forEach((w: any) => {
            w.activist_pressures.map((p: any) => {
              // console.log(p);
              const job = queue.createJob(({
                id: "",
                community_id: c.id,
                community_name: c.name,
                mobilization_id: m.id,
                mobilization_name: m.name,
                // activist_email: p.email,
                activist_ip: "",
                activist_first_name: "",
                activist_last_name: "",
                activist_fullname: "",
                activist_city: "",
                activist_state: "",
                activist_phone: "",
                widget_id: w.id,
                action_id: p.id,
                action_type: "pressure",
                action_data: JSON.stringify(p),
                action_created: new Date(p.createdAt),
                donation_value: "",
                donation_recurring: "",
                donation_status: "",
                pressure_targets_count: ""
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
  });
;
sync
  .command('phone-pressure')
  .action(async() => {
    const Model = db.model();
    const pressuresPhone = await db.getActions(8, 'pressure-phone', Model.PressureByPhone, Model)
    console.log(`There are ${(pressuresPhone.count)} pressures phone`);
  });
;
sync
  .command('donation')
  .action(async() => {
    const Model = db.model();
    const donations = await db.getActions(8, 'donation', Model.Donation, Model)
    console.log(`There are ${(donations.count)} donations`);


    donations.rows.forEach((c: any) => {
      c.mobilizations.forEach((m: any) => {
        m.blocks.forEach((b: any) => {
          b.widgets.forEach((w: any) => {
            w.donations.map((d: any) => {
              // console.log(p);
              const job = queue.createJob(({
                id: "",
                community_id: c.id,
                community_name: c.name,
                mobilization_id: m.id,
                mobilization_name: m.name,
                // activist_email: p.email,
                activist_ip: "",
                activist_first_name: "",
                activist_last_name: "",
                activist_fullname: "",
                activist_city: "",
                activist_state: "",
                activist_phone: "",
                widget_id: w.id,
                action_id: d.id,
                action_type: "donation",
                action_data: JSON.stringify(d),
                action_created: new Date(d.createdAt),
                donation_value: "",
                donation_recurring: "",
                donation_status: "",
                pressure_targets_count: ""
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
  });
;
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
