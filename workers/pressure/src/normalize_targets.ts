import { GraphQLClient, gql } from 'graphql-request'
import dotenv from "dotenv";

dotenv.config()

// Client GraphQL

const widgetsQuery = gql`
  query {
    widgets(where: { kind: { _eq: "pressure" } }) {
      id
      created_at
      updated_at
      settings
    }
  }
`;

const updateWidgetsQuery = gql`
  mutation ($objects: [widgets_insert_input!]!) {
    insert_widgets(
      objects: $objects,
      on_conflict: {
        constraint: widgets_pkey,
        update_columns: [settings]
      }
    ) {
      affected_rows
      returning {
        id
        settings
        targets: settings(path: "targets")
      }
    }
  }
`;

const client = new GraphQLClient(process.env.GRAPHQL_API_URL || "<config-graphql-api-url>",
  {
    headers: {
      authorization: `Bearer ${process.env.GRAPHQL_API_TOKEN}`
    }
  }
);

// Typings

interface WidgetSettings extends Record<string, any> {
  targets: string | string[]
}

interface Widget {
  id: number
  settings: WidgetSettings
}

interface Result {
  widgets: Widget[]
}

// Script run

const main = async () => {
  try {

    // Fetch widgets with kind pressure
    const data = await client.request<Result>(widgetsQuery);
  
    // Normalize widget targets
    let widgets: Widget[] = [];
    // Case empty strings
    widgets = [
      ...widgets,
      ...data
        .widgets
        .filter((widget) => typeof widget.settings.targets === "string")
        .filter((widget) => !widget.settings.targets)
        .map((widget) => ({
          ...widget,
          settings: {
            ...widget.settings,
            targets: []
          }
        }))
    ];
    // Case strings not empty
    widgets = [
      ...widgets,
      ...data
        .widgets
        .filter((widget) => typeof widget.settings.targets === "string")
        .filter((widget) => !!widget.settings.targets)
        .filter((widget) => (widget.settings.targets as string).includes(";"))
        .map((widget) => ({
          ...widget,
          settings: {
            ...widget.settings,
            targets: (widget.settings.targets as string).split(";")
          }
        }))
    ]
    // Case array items
    widgets = [
      ...widgets,
      ...data
        .widgets
        .filter((widget) => typeof widget.settings.targets !== "string")
    ]
    // Case string not split by (;)
    widgets = [
      ...widgets,
      ...data
        .widgets
        .filter((widget) => typeof widget.settings.targets === "string")
        .filter((widget) => !!widget.settings.targets)
        .filter((widget) => !(widget.settings.targets as string).includes(";"))
        .map((widget: Widget) => {
          const pattern = /[a-zA-Zá-ú 0-9]+<(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})>/g
          return {
            ...widget,
            settings: {
              ...widget.settings,
              targets: ((widget.settings.targets as string).match(pattern) as string[])
            }
          }
        })
    ];
    // Fix space in individual targets
    widgets = widgets
      .map((widget) => ({
        ...widget,
        settings: {
          ...widget.settings,
          targets: (widget.settings.targets as string[])?.map((target: string) => target.trim()).filter((target) => !!target) || []
        }
      }))
  
    // console.log(widgets.map((w) => w.id));
    // Update widgets
    const response = await client.request(updateWidgetsQuery, { objects: widgets });
  
    console.log("Update is done: ", response);
    console.log("Returning:");
    response.insert_widgets.returning.forEach((w: any) => {
      console.log(w.id);
      console.log(w.targets);
    });
  } catch (errors) {
    console.log("Errors: ", errors);
  }
}

main();