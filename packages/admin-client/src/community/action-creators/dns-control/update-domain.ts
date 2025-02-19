import * as t from '../../action-types'
import * as mt from '../../../mobrender/redux/action-types';

// case t.UPDATE_MOBILIZATION_SUCCESS:
//   return {...state,
//     saving: false,
//     data: state.data.map(m => m.id === action.payload.id ? action.payload : m)
//   }

export default (dnsHostedZone: any, mobilization?: any) => (dispatch, _getState: any): Promise<void> => {
  console.log('updateDomain', dnsHostedZone);
  dispatch({ type: t.UPDATE_DNS_HOSTED_ZONE, payload: dnsHostedZone });

  if (mobilization) {
    dispatch({ type: mt.UPDATE_MOBILIZATION_SUCCESS, payload: mobilization });
  }

  return new Promise((resolve) => resolve());
}