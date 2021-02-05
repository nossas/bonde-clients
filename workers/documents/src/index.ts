import { Command } from 'commander';

const program = new Command();
program.version('0.0.1');

// Add nested commands using `.command()`.
const brew = program.command('brew');
brew
  .command('tea')
  .action(() => {
    console.log('brew tea', process.env.NODE_ENV);
  });
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
