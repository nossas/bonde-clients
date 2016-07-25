import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Modernizr from 'modernizr'

import * as Paths from './../Paths'
import {
  exportDataClipByEndpoint,
  mountExportDataclip
} from './../actions/ExportActions'
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
    mountExportDataclip: PropTypes.func.isRequired,
    exported: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.object
  }

  componentDidMount() {
    this.props.mountExportDataclip()
  }

  widget (props = this.props) {
    const { widgets, params: { widget_id } } = props
    const idStringify = widget => widget.id.toString()
    const currentWidgetIndex = widgets.data.map(idStringify).indexOf(widget_id)
    return widgets.data[currentWidgetIndex]
  }

  fixzero(value) {
    let valueToString = value.toString()
    return valueToString.length === 1 ? '0' + valueToString : valueToString
  }

  formatExportAt(widget) {
    let datetime = new Date(String(widget.exported_at))
    const date = this.fixzero(datetime.getDate()) + '/' + this.fixzero(datetime.getMonth()) + '/' + datetime.getFullYear()
    const time = this.fixzero(datetime.getHours()) + ':' + this.fixzero(datetime.getMinutes())
    return date + ' às ' + time
  }

  renderLoadingMessage() {
    return <span>
      <i className="fa fa-circle-o-notch fa-spin fa-w mr1" />
      Aguarde enquanto estamos processando...
    </span>
  }

  renderExportedMessage(widget = this.widget()) {
    return <span className="olive">
      Última exportação: {this.formatExportAt(widget)}.
      <i className="fa fa-calendar-check-o ml1" />
    </span>
  }

  renderErrorMessage() {
    return <span className="red">{error}</span>
  }

  renderDisclaimer() {
    return <div className="disclaimer clearfix">
      <p className="mb1">
        <span className="h2 orange">
          <i className="fa fa-exclamation mr1" /> Atenção
        </span>
      </p>
      <p className="h5">
        Você está utilizando o navegador Safari. Os passos a seguir são
        necessários devido a uma incompatibilidade.
      </p>
      <ul className="h5">
        <li>
          Clique com o botão direito do mouse no botão abaixo e selecione
          a opção <span className="bold">"Transferir Arquivo Vinculado Como..."</span><br />
        </li>
        <li>
          Salve o arquivo com o nome desejado e a extensão <span className="bold">.xlsx</span>
        </li>
      </ul>
    </div>
  }

  renderSaveAsContainer() {
    const { loading } = this.props
    return <div id="saveAs" style={{display: loading ? 'none' : 'block'}}></div>
    return <div id="saveAs" style={{display: loading ? 'none' : 'block'}}>
      <a href="#" className="button button-outline mb1 aqua caps p2">
        <i className="fa fa-download mr1" />
        Salvar planilha
      </a>
    </div>
  }

  renderPage() {
    const {
      mobilization,
      loading,
      error,
      exported,
      success,
      exportDataClipByEndpoint,
      params,
      auth: { credentials }
    } = this.props

    const widget = this.widget()
    const filename = mobilization.name + '.xlsx'

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
            Clique no botão abaixo para baixar o relatório completo do
            formulário em formato excel.
          </p>

          <p className="mb2">
            <button
              disabled={loading}
              className='button bg-aqua caps p2'
              onClick={() => exportDataClipByEndpoint({ mobilization_id: mobilization.id, widget_id: widget.id, filename, credentials })}>
              {Modernizr.adownload
                ? 'Clique para baixar a planilha completa.'
                : 'Clique para processar a planilha completa.'
              }
            </button>
          </p>

          <div className="mb3">
            {(loading ? this.renderLoadingMessage() : null)}
            {(widget.exported_at && !loading ? this.renderExportedMessage() : null)}
            {(error ? this.renderErrorMessage() : null)}
          </div>

          {(!Modernizr.adownload && !loading && success ? this.renderDisclaimer() : null)}
          {(!Modernizr.adownload ? this.renderSaveAsContainer() : null)}
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
    error: globalState.exportDataClip.error,
    success: globalState.exportDataClip.success
  }
}

const mapActionCreators = {
  exportDataClipByEndpoint,
  mountExportDataclip
}

export default connect(mapStateToProps, mapActionCreators)(ExportWidgetData)
