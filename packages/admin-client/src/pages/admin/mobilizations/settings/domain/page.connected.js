//
// @route /mobilizations/:mobilization_id/customDomain
//
import { connect } from 'react-redux';

import MobSelectors from '../../../../../mobrender/redux/selectors';
import * as t from '../../../../../mobrender/redux/action-types';
import DNSControlSelectors from '../../../../../community/dns-control-selectors';
import Page from './page';

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilization(),
  hostedZones: DNSControlSelectors(state).dnsHostedZones().getList(),
});

const mapDispatchToProps = {
  updateMobilization: (mobilization) => (dispatch, getState) => {
    dispatch({
      type: t.UPDATE_MOBILIZATION_SUCCESS,
      payload: mobilization
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
