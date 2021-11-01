import { connect } from 'react-redux'
import { selectors } from './bonde-webpage/redux'

const mapStateToProperties = (state, properties) => {
  const query = selectors(state, properties)
  return {
    mobilization: query.getMobilization() || query.getMobilizations()[0],
    blocks: query.getBlocks(),
    blocksIsLoaded: query.blocksIsLoaded(),
    widgets: query.getWidgets()
  }
}

export default connect(mapStateToProperties)
