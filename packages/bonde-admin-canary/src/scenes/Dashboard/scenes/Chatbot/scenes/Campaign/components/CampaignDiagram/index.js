import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'components/Forms'
import DiagramField from './DiagramField'

class CampaignDiagram extends React.Component {
  render () {
    const { campaign } = this.props

    return (
      <Field
        name='campaign.diagram'
        defaultValue={JSON.stringify(campaign.diagram)}
        component={DiagramField}
      />
    )
  }
}

CampaignDiagram.propTypes = {
  campaign: PropTypes.object.isRequired
}

export default CampaignDiagram
