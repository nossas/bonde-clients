import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import GenericForm from './GenericForm'

const mapStateToProps = (state, ownProps) => {
  return {
    form: ownProps.formId,
    enableReinitialize: true,
    initialValues: ownProps.values
  }
}

const GenericReduxForm = compose(
  connect(mapStateToProps),
  reduxForm({
    enableReinitialize: true,
    destroyOnUnmount: false
  })
)(GenericForm)

export default GenericReduxForm
