import { GraphQLClient, gql } from 'graphql-request'
const yargs = require('yargs');

// Define CLI args
const argv = yargs
  .option('apiUrl', {
    description: 'API GraphQL url',
    type: 'string'
  })
  .option('token', {
    alias: 't',
    description: 'JWT Token to access API GraphQL',
    type: 'string'
  })
  .option('widgetId', {
    alias: 'w',
    description: 'Widget ID to relation with dummy pressures',
    type: 'number'
  })
  .option('interval', {
      alias: 'i',
      description: 'Interval datetime used to generate',
      type: 'array',
  })
  .help()
  .alias('help', 'h')
  .argv;

// API GraphQL Client Instance
let client: any;

if (argv.token && argv.apiUrl) {
  console.log("Generate GraphQL client");
  client = new GraphQLClient(argv.apiUrl,
    {
      headers: {
        authorization: `Bearer ${argv.token}`
      }
    }
  );
}

const INSERT_ACTIVIST_PRESSURE_MUTATION = gql`
  mutation ($objects: [activist_pressures_insert_input!]!) {
    insert_activist_pressures(objects: $objects) {
      affected_rows
    }
  }
`;

const FETCH_WIDGET_INFO = gql`
  query FetchWidgetInfo ($id: Int!){
    widgets_by_pk(id: $id) {
      block {
        mobilization {
          id
          community {
            id
          }
        }
      }
    }
  }
`

const main = async () => {
  if (argv.interval && argv.widgetId) {
    const fetchWidgetData = await client?.request(FETCH_WIDGET_INFO, { id: argv.widgetId });
    const mobilization = fetchWidgetData.widgets_by_pk.block.mobilization;
  
    const startDate = argv.interval[0];
    const endDate = argv.interval[1];
  
    const diffInMs = (new Date(endDate) as any) - (new Date(startDate) as any);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
    const newItems = Array.from({ length: diffInDays + 1 }, (_, index) => {
      const i = new Date(startDate);
      i.setDate(i.getDate() + index);

      return Array.from({ length: Math.floor(Math.random() * 10) }, () => {
        return {
          targets: ['dummy1@test.org', 'dummy2@test.org', 'dummy3@test.org'],
          cached_community_id: mobilization.community.id,
          status: 'draft',
          mobilization_id: mobilization.id,
          created_at: i.toDateString(),
          updated_at: i.toDateString(),
          widget_id: argv.widgetId,
          activist: {
            data: {
              name: "Dummy Activist",
              first_name: 'Dummy',
              last_name: 'Activist',
              email: 'dummy@activist.org'
            },
            on_conflict: {
              constraint: "activists_email_key",
              update_columns: ["name", "first_name", "last_name"]
            }
          }
        }
      });
    });
  
    const insertActivistPressureData = await client?.request(INSERT_ACTIVIST_PRESSURE_MUTATION, { objects: newItems.flat() })
    console.log('The current pressures is: ', insertActivistPressureData);
  }
}

main().catch((error) => {
  console.error(error);
});

