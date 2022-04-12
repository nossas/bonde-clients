import React from 'react';
import { shallow } from 'enzyme';
import { Tabs, Tab, TabPanel } from 'bonde-components/chakra';
import ExternalDomainForm from './ExternalDomainForm';
import DomainForm from './DomainForm';
import SubdomainForm from './SubdomainForm';

const mockUseMutation = jest.fn();
mockUseMutation.mockReturnValue([jest.fn()]);

const mockGql = jest.fn();

jest.mock('bonde-core-tools', () => ({
  useMutation: mockUseMutation,
  gql: mockGql
}));

// eslint-disable-next-line import/first
import FormPanel from './FormPanel';

describe('FormPanel tests', () => {
  let wrapper;
  const mobilization = { id: 4 };

  beforeEach(() => {
    wrapper = shallow(<FormPanel mobilization={mobilization} hostedZones={[]} />);
    
    jest.clearAllMocks();
  });

  it('should renders is ok', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should renders Tabs', () => {
    expect(wrapper.find(Tabs).length).toEqual(1);
  });

  it('should renders subdomain Tab', () => {
    const position = 0;

    const tab = wrapper.find(Tab).at(position);
    expect(tab.props().children).toEqual('Subdomínio');

    // find SubdomainForm inside TabPanel
    const form = wrapper
      .find(TabPanel)
      .at(position)
      .find(SubdomainForm);
    
      expect(form.length).toEqual(1);
  });

  it('should renders domain Tab', () => {
    const position = 1;

    const tab = wrapper.find(Tab).at(position);
    expect(tab.props().children).toEqual('Domínio Principal');

    // find DomainForm inside TabPanel
    const form = wrapper
      .find(TabPanel)
      .at(position)
      .find(DomainForm);

    expect(form.length).toEqual(1);
  });

  it('should renders external domain Tab', () => {
    const position = 2;

    const tab = wrapper.find(Tab).at(position);
    expect(tab.props().children).toEqual('Domínio Externo');

    // find ExternalDomainForm inside TabPanel
    const form = wrapper
      .find(TabPanel)
      .at(position)
      .find(ExternalDomainForm);

    expect(form.length).toEqual(1);
  });

  it('call updateMobilization in submit', async () => {
    const customDomain = 'asdasdas.org';
    const mockUpdateMobilization = jest.fn();
    mockUseMutation.mockReturnValue([mockUpdateMobilization]);

    wrapper = shallow(<FormPanel mobilization={mobilization} hostedZones={[]} />);
    // find ExternalDomainForm inside TabPanel
    const form = wrapper
      .find(TabPanel)
      .at(0)
      .find(SubdomainForm);
    
    await form.props().onSubmit({ customDomain });

    expect(mockUpdateMobilization.mock.calls.length).toEqual(1);
    expect(mockUpdateMobilization.mock.calls[0][0]).toEqual({
      variables: {
        id: mobilization.id,
        customDomain
      }
    });
  });

  // it('call useMutation with query to update mobilization', () => {
  //   const expected = 'xksjdflg';
  //   mockGql.mockReturnValue(expected);
  //   shallow(<FormPanel hostedZones={[]} />);

  //   expect(mockUseMutation.mock.calls.length).toEqual(1);
  //   // calls position [0] is mock call instace
  //   // calls position [0][0] is first argument of mock call instance
  //   expect(mockUseMutation.mock.calls[0][0]).toEqual(expected);
  //   // call gql with correct mutation
  //   expect(mockGql.mock.calls[0[0]]).toEqual(`
  //     mutation ($id: Int!, $customDomain: String!) {
  //       update_mobilizations_by_pk(pk_columns: { id: $id }, _set: { custom_domain: $customDomain }) {
  //         id
  //         custom_domain
  //       }
  //     }
  //   `)
  // });
});