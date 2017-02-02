import { provideHooks } from 'redial'
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'

import DefaultServerConfig from '~server/config'
import * as BlockActions from '~mobilizations/blocks/action-creators'
import * as WidgetActions from '~mobilizations/widgets/action-creators'
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import CustomDomainPage from './page'

const redial = {
  fetch: ({ dispatch, host }) => {
    const regex = host.match(`(.+)\.${DefaultServerConfig.appDomain}`)
    const findParams = regex ? { slug: regex[1].replace(/^www\./, '') } : { custom_domain: host }

    return Promise.all([
      dispatch(MobilizationActions.asyncFilter(findParams)),
      dispatch(BlockActions.asyncBlockSelect(findParams)),
      dispatch(WidgetActions.asyncWidgetSelect(findParams))
    ])
  }
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getList(state)[0],
  blocks: state.blocks.data,
  widgets: state.widgets.list.data
})

export default provideHooks(redial)(connect(mapStateToProps)(CustomDomainPage))
