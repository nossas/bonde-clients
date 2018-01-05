import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { FormFinishMessage } from '~client/mobilizations/widgets/components'
import { DonationTellAFriend } from '~client/mobilizations/widgets/__plugins__/donation/components'

const mapStateToProps = state => {
  const selectors = MobSelectors(state)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

const mapDispatchToProps = {
  asyncWidgetUpdate: MobActions.asyncUpdateWidget
}

const DonationSettingsFinish = props => (
  <FormFinishMessage
    {...props}
    TellAFriend={DonationTellAFriend}
    successMessage={
      <FormattedMessage
        id='page--donation-widget-finish.form.success-message'
        defaultMessage='Formulário de pós-doação salvo com sucesso!'
      />
    }
  />
)

export default connect(mapStateToProps, mapDispatchToProps)(DonationSettingsFinish)
