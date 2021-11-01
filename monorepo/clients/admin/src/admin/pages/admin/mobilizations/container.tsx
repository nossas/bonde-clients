import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
// Components
import { Loading } from "../../../components/await"
// Redux
import { asyncFetchBlocks, asyncFetchWidgets, selectMobilization } from "../../../mobrender/redux/action-creators"
import MobSelectors from "../../../mobrender/redux/selectors"
import BlockCreate from './blocks/create'
import MobilizationsNew from './create'
import MobilizationsEdit from './edit'
import MobilizationsLaunch from './launch'
import MobilizationsLaunchEnd from './launch-end'
// Pages
import MobilizationList from './list'
// SubRoutes
import MobilizationsSettings from './settings'
import TemplateChoose from './templates/choose'
import TemplateChooseCustom from './templates/choose-custom'
import TemplateCreate from './templates/create'
import TemplateList from './templates/list'
import WidgetsRoutes from './widgets'


const stateToProperties = (state) => {
  const selectors = MobSelectors(state)

  return {
    mobilization: selectors.getMobilization(),
    blocksIsLoaded: selectors.blocksIsLoaded(),
    widgetsIsLoaded: selectors.widgetsIsLoaded(),
    reload: selectors.mobilizationIsNeedReload()
  }
}

const actionsToProperties = {
  select: selectMobilization,
  fetchWidgets: asyncFetchWidgets,
  fetchBlocks: asyncFetchBlocks
}

const InsideMobilization = connect(stateToProperties, actionsToProperties)(class extends React.Component {
  async componentDidMount() {
    const promises = []
    const {
      match: { params: { mobilization_id: id } },
      mobilization,
      blocksIsLoaded,
      widgetsIsLoaded,
      reload,
      select,
      fetchBlocks,
      fetchWidgets
    } = this.props

    if (!mobilization && id) promises.push(select(id))
    if ((!blocksIsLoaded || reload) && id) promises.push(fetchBlocks(id))
    if ((!widgetsIsLoaded || reload) && id) promises.push(fetchWidgets(id))

    return Promise.all(promises)
  }

  render() {
    const {
      match: { path, params: { mobilization_id: id } },
      mobilization,
      blocksIsLoaded,
      widgetsIsLoaded
    } = this.props

    const hasId = id && !isNaN(id)

    return (!mobilization || !blocksIsLoaded || !widgetsIsLoaded) && hasId ? <Loading /> : (
      <>
        <Route exact path={`${path}/blocks/create`} component={BlockCreate} />
        <Route exact path={`${path}/edit`} component={MobilizationsEdit} />
        <Route exact path={`${path}/launch`} component={MobilizationsLaunch} />
        <Route exact path={`${path}/launch/end`} component={MobilizationsLaunchEnd} />
        <Route exact path={`${path}/templates/create`} component={TemplateCreate} />
        <Route exact path={`${path}/templates/choose`} component={TemplateChoose} />
        <Route exact path={`${path}/templates/choose/custom`} component={TemplateChooseCustom} />

        <Route path={`${path}/settings`} component={MobilizationsSettings} />
        <Route path={`${path}/widgets/:widget_id`} component={WidgetsRoutes} />
      </>
    )
  }
})

export default function ({ match: { path } }) {
  return <>
    <Route exact path={`${path}`} component={MobilizationList} />
    <Route exact path={`${path}/new`} component={MobilizationsNew} />
    <Route exact path={`${path}/templates/list`} component={TemplateList} />
    <Route path={`${path}/:mobilization_id`} component={InsideMobilization} />
  </>
}
