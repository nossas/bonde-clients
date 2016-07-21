import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as Paths from './../Paths'
import { exportDataClipByEndpoint } from './../actions/ExportActions'
import {
  FormWidgetMenu,
  DonationWidgetMenu,
  Loading,
  CloseButton
} from './../components'


class ExportWidgetData extends React.Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    exportDataClipByEndpoint: PropTypes.func.isRequired,
    exported: PropTypes.bool,
    error: PropTypes.object
  }

  widget (props = this.props) {
    const { widgets, params: { widget_id } } = props
    const idStringify = widget => widget.id.toString()
    const currentWidgetIndex = widgets.data.map(idStringify).indexOf(widget_id)
    return widgets.data[currentWidgetIndex]
  }

  format(datetime) {
    const date = datetime.getDate() + '/' + datetime.getMonth() + '/' + datetime.getFullYear()
    const time = datetime.getHours() + ':' + datetime.getMinutes()
    return date + ' às ' + time
  }

  renderPage() {
    const { mobilization, loading, error, exported, exportDataClipByEndpoint, params, auth: { credentials } } = this.props

    const widget = this.widget()
    const filename = mobilization.name + '.xls'

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
              disabled={loading}
              className='button bg-aqua caps p2'
              onClick={() => exportDataClipByEndpoint({ mobilization_id: mobilization.id, widget_id: widget.id, filename, credentials })}>
              Clique para baixar a planilha completa.
            </button>
          </p>
          <p>
            {(exported ? <span className="green">Exportado às {this.format(exported)}.</span> : null)}
            {(error ? <span className="red">{error}</span> : null)}
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

const mapStateToProps = (globalState) => {
  return {
    loading: globalState.exportDataClip.loading,
    exported: globalState.exportDataClip.exported,
    error: globalState.exportDataClip.error
  }
}

const mapActionCreators = {
  exportDataClipByEndpoint: exportDataClipByEndpoint
}

export default connect(mapStateToProps, mapActionCreators)(ExportWidgetData)
