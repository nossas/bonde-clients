import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Form from './__form__';

const mapDispatchToProps = {
  asyncFormEntryCreate: async (args) => {
    console.log("fake::asyncFormEntryCreate", { args });
    return Promise.resolve()
  },
};

export { default as Form } from './__form__';
export default connect(undefined, mapDispatchToProps)(injectIntl(Form));
