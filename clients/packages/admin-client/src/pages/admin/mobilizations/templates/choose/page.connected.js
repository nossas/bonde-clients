import React from 'react';
import { gql, useQuery } from 'bonde-core-tools'
//
// @route /mobilizations/:mobilization_id/templates/choose
//
import { connect } from 'react-redux'
import * as CommunitySelectors from 'community/selectors'
import MobSelectors from 'mobrender/redux/selectors'
import { asyncUpdateMobilization } from 'mobrender/redux/action-creators'
import * as TemplateSelectors from 'mobilizations/templates/selectors'
import * as paths from 'paths'
import Page from './page'

const mapStateToProps = (state, props) => ({
  communityId: CommunitySelectors.getCurrentId(state),
  mobilization: MobSelectors(state, props).getMobilization(),
  templatesGlobal: TemplateSelectors.getGlobalTemplates(state),
  templatesCustomLength: TemplateSelectors.getCustomTemplates(state).length
})

const mapActionsToProps = (dispatch, props) => ({
  createMobilizationFromTemplate: ({ mobilization, template }) => {
    dispatch(asyncUpdateMobilization({
      id: mobilization.id,
      template_mobilization_id: template.id
    }))
    .then(() => {
      props.history.push(paths.editMobilization(mobilization.id))
    })
  },
  createEmptyMobilization: ({ mobilization }) => {
    props.history.push(paths.createBlock(mobilization))
  }
})

const FETCH_TEMPLATES = gql`
  query allTemplates($communityId: Int!) {
    customTemplates (ctxCommunityId: $communityId) {
      totalCount
    }
    globalTemplates {
      nodes {
        id,
        name,
        goal
      }
    }
  }
`;

const PageGraphQL = (props) => {
  const { data, loading, error } = useQuery(FETCH_TEMPLATES, {
    variables: { communityId: props.communityId },
    fetchPolicy: 'network-only'
  });

  if (error) {
    console.log("PageGraphQL error", error);
    return 'Failed!';
  }

  return (
    <Page
      {...props}
      loading={loading}
      customTemplatesLength={(data || {}).customTemplates ? data.customTemplates.totalCount : 0}
      globalTemplates={(data || {}).globalTemplates ? data.globalTemplates.nodes : []}
    />
  );
}

export default connect(mapStateToProps, mapActionsToProps)(PageGraphQL);
