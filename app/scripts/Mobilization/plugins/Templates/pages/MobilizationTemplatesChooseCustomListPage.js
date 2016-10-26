import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as Paths from '../../../../Paths'
import { SelectableList } from '../../../../../components/SelectableList'
import { FilterableSearchBar } from '../../../../../components/FilterableSearchBar'

const MobilizationTemplatesChooseCustomListPage = props => {
  const { mobilizationTemplates, filterableSearchBarList, selectedIndex } = props

  return (
    <div className="p3 lg-col-5 mx-auto">
      <h3 className="h1 mt0 mb3 center">Meus Templates</h3>

      <FilterableSearchBar list={mobilizationTemplates.list} />

      <div className="bg-white rounded-bottom" style={{ padding: '1.6rem 2rem' }}>
        <SelectableList list={filterableSearchBarList} />
        <button
          disabled={!selectedIndex}
          className={classnames(
            'btn h3 col-12 white p2 rounded',
            !selectedIndex ? 'bg-gray95' : 'bg-pagenta'
          )}
          style={{ marginTop: '1.6rem' }}
          onClick={() => { console.log('message') }}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

MobilizationTemplatesChooseCustomListPage.propTypes = {
  mobilization: PropTypes.object.isRequired,
  mobilizationTemplates: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  selectedIndex: state.selectableList.selectedIndex,
  filterableSearchBarList: state.filterableSearchBar.list
})

export default connect(mapStateToProps)(MobilizationTemplatesChooseCustomListPage)
