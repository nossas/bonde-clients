import React, { PropTypes, Component } from 'react'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as Paths from '../../../../Paths'
import { SelectableList } from '../../../../../components/SelectableList'
import { setSelectedIndex } from '../../../../../components/SelectableList/SelectableListActions'
import { FilterableSearchBar } from '../../../../../components/FilterableSearchBar'

@reactMixin.decorate(Navigation)
export class MobilizationTemplatesChooseCustomListPage extends Component {
  render () {
    const {
      mobilization,
      mobilizationTemplates,
      filterableSearchBarList,
      selectedIndex,
      dispatch
    } = this.props

    const buttonDisabled = !filterableSearchBarList.filter(item => item.id === selectedIndex).length

    return (
      <div className="p3 lg-col-5 mx-auto">
        <h3 className="h1 mt0 mb3 center">Meus Templates</h3>

        <FilterableSearchBar list={mobilizationTemplates.list} />

        <div className="bg-white rounded-bottom" style={{ padding: '1.6rem 2rem' }}>
          <SelectableList
            list={filterableSearchBarList}
            activeCondition={(item, index) => item.id === selectedIndex}
            onClick={(item, index) => {
              dispatch(setSelectedIndex(item.id === selectedIndex ? undefined : item.id))
            }}
          />
          <button
            disabled={buttonDisabled}
            style={{ marginTop: '1.6rem' }}
            onClick={() => this.transitionTo(Paths.editMobilization(mobilization.id))}
            className={classnames(
              'btn h3 col-12 white p2 rounded',
              buttonDisabled ? 'bg-gray95' : 'bg-pagenta'
            )}
          >
            Continuar
          </button>
        </div>
      </div>
    )
  }
}

MobilizationTemplatesChooseCustomListPage.contextTypes = {
  router: PropTypes.object.isRequired
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
