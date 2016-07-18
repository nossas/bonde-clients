import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'

import * as Paths from './../Paths'
import * as ExportActions from './../actions/ExportActions'
import {
  FormWidgetMenu,
  DonationWidgetMenu,
  Loading,
  CloseButton
} from './../components'

export default class ExportWidgetData extends React.Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.bindedExportActions = bindActionCreators(ExportActions, props.dispatch)
  }

  widget (props = this.props) {
    const { widgets, params: { widget_id } } = props
    const idStringify = widget => widget.id.toString()
    const currentWidgetIndex = widgets.data.map(idStringify).indexOf(widget_id)
    return widgets.data[currentWidgetIndex]
  }

  handleDownloadClick(event) {
    event.preventDefault()
    this.bindedExportActions.downloadFormEntries()
  }

  renderPage() {
    const { mobilization } = this.props
    const widget = this.widget()
    return (
      <div className='flex-auto flex flex-column bg-silver gray relative'>
        {( widget.kind === 'donation'
          ? <DonationWidgetMenu {...this.props} widget={widget} />
          : <FormWidgetMenu {...this.props} widget={widget} />
        )}
        <div className="p3">
          <div className="h5 caps bold flex flex-center mb2">
            <i className="fa fa-file-excel-o mr1" style={{fontSize: '1.8em'}} />
            <span>Exportar</span>
          </div>
          <p className="h5 mb2">
            Clique no botão abaixo para baixar o relatório completo de
            assinaturas em formato excel.
          </p>
          <p className="mb3">
            <button
              className='button bg-aqua caps p2'
              onClick={::this.handleDownloadClick}>
              Clique para baixar a planilha completa.
            </button>
          </p>
        </div>
        <CloseButton path={ Paths.editMobilization(mobilization.id) } />
      </div>
    )
  }

  renderLoading() {
    return <Loading />
  }

  render () {
    const { widgets: { data } } = this.props
    return (data.length ? this.renderPage() : this.renderLoading())
  }
}
