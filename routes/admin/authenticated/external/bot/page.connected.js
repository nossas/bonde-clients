import { reduxForm } from 'redux-form'
import Page from './page'

const fields = ['message', 'quick_reply', 'date_interval_start', 'date_interval_end']

// export default reduxForm({ form: 'botForm', fields })(Page)
export default Page
