import React from 'react';
import { gql, useQuery } from 'bonde-core-tools';
//
// @route /mobilizations/:mobilization_id/templates/choose/custom
//
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import * as SelectableActions from 'components/selectable-list/actions'
import MobSelectors from 'mobrender/redux/selectors'
import * as MobActions from 'mobrender/redux/action-creators'
import * as TemplateSelectors from 'mobilizations/templates/selectors'
import * as CommunitySelectors from 'community/selectors'

import { setFilterableSearchBarList } from 'components/filterable-search-bar/actions'

import Page from './page'

const mapStateToProps = (state, props) => ({
  communityId: CommunitySelectors.getCurrentId(state),
  mobilization: MobSelectors(state, props).getMobilization(),
  selectedIndex: TemplateSelectors.getSelectableIndex(state),
  filterableTemplates: TemplateSelectors.getFilterableTemplates(state)
})

const mapActionsToProps = {
  setFilterableSearchBarList,
  setSelectedIndex: SelectableActions.setSelectedIndex,
  createMobilizationFromTemplate: MobActions.asyncUpdateMobilization
}

const FETCH_TEMPLATES = gql`
  query customTemplates($communityId: Int!) {
    customTemplates (ctxCommunityId: $communityId) {
      nodes {
        id
        name
        goal
        image: facebookShareImage
        createdAt
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
      templates={(data || {}).customTemplates ? data.customTemplates.nodes : []}
    />
  );
}

export default connect(mapStateToProps, mapActionsToProps)(injectIntl(PageGraphQL))
