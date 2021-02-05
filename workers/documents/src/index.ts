import { Command } from 'commander';
import * as db from './db';
import queue from './queue';

const program = new Command();
program.version('0.0.1');


// Add nested commands using `.command()`.
const brew = program.command('brew');
brew
.command('tea')
.action(async () => {
  await db.check();
  const Model = db.model();
  queue.send("createmessages");

    const formEntries = await db.getActions(8, 'form', Model.FormEntry, Model)
    console.log(`There are ${(formEntries.count)} form entries`);

    formEntries.rows.forEach((c: any) => {
      c.mobilizations.forEach((m: any) => {
        m.blocks.forEach((b: any) => {
          b.widgets.forEach((w: any) => {
            w.form_entries.forEach((fe: any) => {
              console.log(fe.id)
                  // {
                  //   id: text,
                  //   community_id: number,
                  //   community_name: text,
                  //   mobilization_id: number,
                  //   mobilization_name: text,
                  //   activist_id: number,
                  //   activist_email: text,
                  //   activist_ip: text,
                  //   activist_first_name: text,
                  //   activist_last_name: text,
                  //   activist_fullname: text,
                  //   activist_city: text,
                  //   activist_state: text,
                  //   activist_phone: text,
                  //   widget_id: number,
                  //   action_id: number,
                  //   action_type: text,
                  //   action_data: text,
                  //   action_created: date,
                  //   donation_value: number,
                  //   donation_recurring: number,
                  //   donation_status: text,
                  //   pressure_targets_count: number,
                  //   form_custom_field_value: text
                  // }
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
