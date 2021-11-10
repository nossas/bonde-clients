import React from 'react'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router'
import { PressureCount, PressureForm, TargetList } from '.'
// import { client as graphqlClient } from "../../../../../createReducer"
// import * as graphqlMutations from "../../../../../graphql/mutations"
// import * as graphqlQueries from "../../../../../graphql/queries"
// import MobSelectors from "../../../../../mobrender/redux/selectors"
// import * as paths from "../../../../../paths"
// import * as array from "../../../../../utils/array"
// import { FinishMessageCustom } from "../../../components"
// import * as pressureHelper from "../../../utils/pressure-helper"
// import * as PressureActions from '../action-creators'

/* TODO: Change static content by props
 * - title
 * - bgColor
 */
interface MyProperties {
  editable?: boolean,
  mobilization: Record<string, number>,
  block: any;
  widget: {
    id: number,
    settings: {
      finish_message_type: string,
      finish_message: string,
      finish_message_background: string
    }
  }
  filledPressureWidgets?: string[],
}

class Pressure extends React.Component<MyProperties, any> {

  getTargetList(): any {
    const { targets } = this.props.widget.settings || { targets: '' }

    if (typeof targets === 'object') return targets

    return targets && targets.split(';').filter(target => !!target.trim())
  }

  // getEmailTarget(target) {
  //   const targetSplit = target.split('<')
  //   return targetSplit[1].replace('>', '')
  // }

  // changeSelectedTargets(selectedTargets) {
  //   this.setState({ selectedTargets })
  // }

  // changeState(state) {
  //   this.setState(state)
  // }

  render(): React.ReactElement {
    const {
      block,
      widget,
      // editable,
      mobilization
    } = this.props
    const { header_font: headerFont } = mobilization
    const {
      main_color: mainColor,
      call_to_action: callToAction,
      title_text: titleText,
      button_text: buttonText,
      // Maybe `reply_email` is necessary...
      // reply_email,
      count_text: countText,
      pressure_subject: pressureSubject,
      pressure_body: pressureBody,
      disable_edit_field: disableEditField
    } = widget.settings || {
      main_color: '#f23392',
      title_text: 'Envie um e-mail para quem pode tomar essa decisão',
      button_text: 'Enviar e-mail',
      disable_edit_field: 'n'
    }

    return (
      <div className='pressure-widget'>
        <h2
          className='center py2 px3 m0 white rounded-top'
          style={{ backgroundColor: mainColor, fontFamily: headerFont }}
        >
          {callToAction || titleText}
        </h2>
        <TargetList
          targets={this.getTargetList() || []}
          // onSelect={this.changeSelectedTargets.bind(this)}
          // errorMessage={this.state.selectedTargetsError}
          // selectable={this.selectableTargetList}
        />
        <PressureForm
          disabled={disableEditField === 's'}
          widget={widget}
          mobilization={mobilization}
          buttonText={buttonText}
          buttonColor={mainColor}
          subject={pressureSubject}
          body={pressureBody}
          // onSubmit={this.handleSubmit.bind(this)}
          targetList={this.getTargetList()}
          // selectedTargets={this.selectedTargets}
          // callTransition={this.state.callTransition}
          // addTwilioCallMutation={this.state.addTwilioCallMutation}
          // changeParentState={this.changeState.bind(this)}
        >
          {countText && (
            <PressureCount
              value={widget.count || 0}
              color={mainColor}
              text={countText}
              startCounting={block.scrollTopReached}
            />
          )}
        </PressureForm>
      </div>
    )
  }
}

// const mapStateToProperties = (state, properties) => {
//   const pressure = MobSelectors(state, properties).getPlugin('pressure')
//   const { saving, filledPressureWidgets } = pressure
//   return { saving, filledPressureWidgets }
// }

// const mapDispatchToProperties = { ...PressureActions }

export default Pressure;
