import graphql, { Response } from './request-graphql';

export type Args = {
  state: String
  email: String
  pdf_data?: any
  widget_id: Number
};


export const plipQuery = `
  mutation plipm($email: String!, $state: String!, $widget_id: Int!) {
    plip_generate_sheet(widget_id: $widget_id, email: $email, state: $state) {
      pdf_data,
      unique_identifier,
      id
    }
  }
`;

const plip = async ({ email, state, widget_id }: Args): Promise<any> => {

  try {
    const variables = {
      email: email,
      widget_id: widget_id,
      state: state,
    };

    const query = JSON.stringify({ query: plipQuery, variables });

    const { data, errors }: Response = await graphql(query);

    if (errors) {
      console.log('data, errors', { data, errors });
      throw new Error('request_graphql_error');
    }

    return data;
  } catch (err) {
    // TODO: Show popup window error
    console.log('err', err);
  }
};

export default plip;
