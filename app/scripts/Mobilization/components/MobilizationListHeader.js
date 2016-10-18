import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import * as Paths from '../../Paths'
import { Tabs, Tab } from '../../../components/Navigation'

const MobilizationListHeader = ({ hideButton, redirectToAdd, location }) => {
  const activeMobilizationsListPath = Paths.mobilizations()
  return (
    <div className="bg-white pl5 pr4">
      <h1 className="mobilization-list-header m0 table col-12">
        <span className="py3 h1 table-cell align-middle">
          Suas Mobilizações
        </span>
        {(
          !(redirectToAdd !== undefined && typeof redirectToAdd === 'function') ? null : (
            <span className="table-cell align-middle">
              <Link
                to={redirectToAdd()}
                className="btn white bg-pagenta caps h4 py2 right rounded"
              >
                <i className="fa fa-plus mr2" style={{ fontSize: '.75rem' }} />
                Nova mobilização
              </Link>
            </span>
          )
        )}
      </h1>
      <Tabs>
        <Tab
          path={activeMobilizationsListPath}
          text="Ativas"
          isActive={activeMobilizationsListPath === location.pathname}
        />
      </Tabs>
    </div>
  )
}

MobilizationListHeader.propTypes = {
  redirectToAdd: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default MobilizationListHeader
