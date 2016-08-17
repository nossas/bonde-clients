import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as Paths from '../../../Paths'

import { OverlayWidget } from '../../components'
import { PressureForm, TargetList, PressureCount } from './components'
import { TellAFriend } from '../../../components'

import { fillWidget } from '../../actions'

/* TODO: Change static content by props
 * - title
 * - bgColor
 */
export class PressureWidget extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = { filled: false }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filled: this.props.saving && !nextProps.saving })
  }

  getTargetList() {
    const { targets } = this.props.widget.settings || { targets: '' }
    return targets && targets.split(';')
  }

  getEmailTarget(target) {
    const targetSplit = target.split('<')
    return targetSplit[1].replace('>', '')
  }

  handleSubmit(data) {
    const { widget, fill } = this.props
    const payload = {
      activist: {
        firstname: data.name,
        lastname: data.lastname,
        email: data.email
      },
      mail: {
        cc: this.getTargetList().map(target => this.getEmailTarget(target)),
        subject: data.subject,
        body: data.body
      }
    }
    fill(widget.id, payload)
  }

  render() {
    const { mobilization, widget, editable, saving } = this.props
    const { main_color, title_text, button_text, show_counter, count_text, pressure_subject, pressure_body } = widget.settings || {
      main_color: '#f23392',
      title_text: 'Envie um e-mail para quem pode tomar essa decisão',
      button_text: 'Enviar e-mail'
    }

    return (
      <OverlayWidget editable={editable} onClick={(e) => {
        if (e) e.preventDefault()
        if (editable) {
          this.context.router.transitionTo(
            Paths.formPressureWidget(mobilization.id, widget.id)
          )
        }
      }}>
        {(widget.filled ?
          <TellAFriend {...this.props}
            message={title_text}
            href={window.location.origin}
          />
        :
          <div className="pressure-widget">
            <h2 className="center py2 px3 m0 white rounded-top" style={{backgroundColor: main_color}}>{title_text}</h2>
            <TargetList targets={::this.getTargetList() || []} />
            <PressureForm
              buttonText={(saving && !editable ? 'Enviando...' : button_text)}
              buttonColor={main_color}
              subject={pressure_subject}
              body={pressure_body}
              onSubmit={::this.handleSubmit}>
              {(show_counter && show_counter === "true" ? <PressureCount value={widget.count || 0} color={main_color} text={count_text} /> : null)}
            </PressureForm>
            <div className="bg-black mt1 rounded py1 px3">
              <p className="white m0">Caso você seja o alvo dessa mobilização,
              dê uma resposta publica clicando <a href="#" style={{color: main_color}}>aqui</a>.
              Ela será publicada nesta página</p>
            </div>
          </div>
        )}
      </OverlayWidget>
    )
  }
}

PressureWidget.propTypes = {
  editable: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Use in fillWidget
  saving: PropTypes.bool,
  filled: PropTypes.bool,
  fill: PropTypes.func
}

PressureWidget.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (globalState) => {
  return {
    saving: globalState.widgets.saving,
  }
}

const mapActionsToProps = {
  fill: fillWidget,
}

export default connect(mapStateToProps, mapActionsToProps)(PressureWidget)
