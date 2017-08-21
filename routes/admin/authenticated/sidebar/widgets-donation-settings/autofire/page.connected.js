import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'

import { fields, validate } from '~client/mobilizations/widgets/components/form-autofire'
import Page from './page'

const mapStateToProps = (state, props) => {
  return {
    initialValues: props.widget.settings || {}
  }
}

export default connect(mapStateToProps)(
  injectIntl(reduxForm({
    form: 'donationAutofireForm',
    fields,
    validate
  })(Page)
))
