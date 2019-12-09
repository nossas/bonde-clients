import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox } from 'bonde-styleguide'
import InviteForm from './InviteForm'
import InvitationsDataset from './InvitationsDataset'

const InvitationsPage = (props) => (
  <Flexbox vertical middle>
    <InviteForm community={props.community} />
    <InvitationsDataset community={props.community} />
  </Flexbox>
)

InvitationsPage.propTypes = {
  community: PropTypes.object.isRequired
}

export default InvitationsPage
