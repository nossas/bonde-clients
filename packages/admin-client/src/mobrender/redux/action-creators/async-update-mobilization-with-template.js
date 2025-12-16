import { GraphQLClient, gql } from 'graphql-request';
import { createAction } from './create-action';
import * as t from '../action-types';
import asyncFetchBlocks from './async-fetch-blocks';
import asyncFetchWidgets from './async-fetch-widgets';

const graphQLClient = new GraphQLClient(
  process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', 
  { credentials: 'include' }
);

export const APPLY_TEMPLATE_MUTATION = gql`
  mutation copyTemplateMobilization(
    $p_mobilization_id: bigint!
    $p_template_mobilization_id: bigint!
  ) {
    copy_template_mobilization(
      args: {
        p_mobilization_id: $p_mobilization_id
        p_template_mobilization_id: $p_template_mobilization_id
      }
    ) {
      id
      name
      user_id
      color_scheme
      facebook_share_title
      facebook_share_description
      header_font
      body_font
      facebook_share_image
      slug
      custom_domain
      twitter_share_text
      community_id
      goal
      favicon
      created_at
      updated_at
    }
  }
`;

export default ({ id, template_mobilization_id }) =>
  (dispatch) => {
    dispatch(createAction(t.UPDATE_MOBILIZATION_REQUEST));

    return graphQLClient
      .request(APPLY_TEMPLATE_MUTATION, {
        p_mobilization_id: id,
        p_template_mobilization_id: template_mobilization_id,
      })
      .then((data) => {
        // retorna um array, pega o primeiro item
        const mobilization = data.copy_template_mobilization[0];
        
        dispatch(createAction(t.UPDATE_MOBILIZATION_SUCCESS, mobilization));
        
        // Busca blocks e widgets criados
        dispatch(asyncFetchBlocks(mobilization.id));
        dispatch(asyncFetchWidgets(mobilization.id));
        
        return mobilization;
      })
      .catch((error) => {
        console.error('Error applying template:', error);
        
        const errorMessage = error?.response?.errors?.[0]?.message || 
                           error?.message || 
                           'Failed to apply template';
        
        dispatch(createAction(t.UPDATE_MOBILIZATION_FAILURE, errorMessage));
        
        return Promise.reject({ _error: errorMessage });
      });
  };