import React from 'react';
import { shallow } from 'enzyme';
import { Tabs, TabPanel } from 'bonde-components/chakra';
import Tab from './CustomTab';
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

const mockToast = jest.fn();
jest.mock('bonde-components/chakra', () => {
  const ui = jest.requireActual('bonde-components/chakra');
  return {
    ...ui,
    useToast: () => mockToast
  };
});

// eslint-disable-next-line import/first
import { FormPanel } from './FormPanel';

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

  describe('onSubmit validate', () => {
    const mockUpdateMobilization = jest.fn();
    const mockCreateDnsHostedZone = jest.fn();

    beforeEach(() => {
      mockUseMutation.mockReturnValueOnce([mockUpdateMobilization]);
      mockUseMutation.mockReturnValueOnce([mockCreateDnsHostedZone]);
    });

    it('should call only updateMobilization if isExternalDomain false', async () => {
      const customDomain = 'asdasdas.org';
      wrapper = shallow(<FormPanel mobilization={mobilization} hostedZones={[]} />);
      // find SubdomainForm inside TabPanel
      const form = wrapper
        .find(TabPanel)
        .at(0)
        .find(SubdomainForm);

      await form.props().onSubmit({ customDomain });

      expect(mockUpdateMobilization.mock.calls.length).toEqual(1);
      expect(mockUpdateMobilization.mock.calls[0][0]).toEqual({
        variables: {
          id: mobilization.id,
          customDomain: `www.${customDomain}`
        }
      });

      expect(mockCreateDnsHostedZone.mock.calls.length).toEqual(0);
    });

    it('should call createDnsHostedZone and updateMobilization if isExternalDomain true', async () => {
      const customDomain = 'asdasdas.org';
      wrapper = shallow(<FormPanel mobilization={mobilization} hostedZones={[]} />);
      // find ExternalDomainForm inside TabPanel
      const form = wrapper
        .find(TabPanel)
        .at(2)
        .find(ExternalDomainForm);

      await form.props().onSubmit({ customDomain, isExternalDomain: true });

      expect(mockCreateDnsHostedZone.mock.calls.length).toEqual(1);
      expect(mockCreateDnsHostedZone.mock.calls[0][0]).toEqual({
        variables: {
          comment: `mobilization_id:${mobilization.id}`,
          customDomain: customDomain
        }
      });
      expect(mockUpdateMobilization.mock.calls.length).toEqual(1);
    });

    it('should not call updateMobilization when createDnsHostedZone is failed', async () => {
      mockCreateDnsHostedZone.mockRejectedValueOnce({ message: 'Failed fetch!' });

      const customDomain = 'asdasdas.org';
      wrapper = shallow(<FormPanel mobilization={mobilization} hostedZones={[]} />);
      // find ExternalDomainForm inside TabPanel
      const form = wrapper
        .find(TabPanel)
        .at(2)
        .find(ExternalDomainForm);

      await form.props().onSubmit({ customDomain, isExternalDomain: true });

      expect(mockCreateDnsHostedZone.mock.calls.length).toEqual(1);
      expect(mockUpdateMobilization.mock.calls.length).toEqual(0);
      // Expect call toast failed message
      expect(mockToast.mock.calls[0][0]).toEqual({
        title: 'Falha ao submeter formulário',
        description: 'Failed fetch!',
        status: 'error',
        isClosable: true
      });
    });
  });

  describe('select tab when mobilization custom domain is preset', () => {

    it('should select subdomain tab', () => {
      const hostedZones = [{ domain_name: 'nossas.link' }]

      wrapper = shallow(
        <FormPanel
          hostedZones={hostedZones}
          mobilization={{ id: 3, custom_domain: 'www.campoanha.nossas.link' }} />
      );

      expect(wrapper.find(Tabs).props().defaultIndex).toEqual(0);
      expect(wrapper.find(SubdomainForm).props().customDomain).toEqual('www.campoanha.nossas.link');
    });

    it('should select root domain tab', () => {
      const hostedZones = [{ domain_name: 'nossas.link' }]

      wrapper = shallow(
        <FormPanel
          hostedZones={hostedZones}
          mobilization={{ id: 3, custom_domain: 'www.nossas.link' }} />
      );

      expect(wrapper.find(Tabs).props().defaultIndex).toEqual(1);
      expect(wrapper.find(DomainForm).props().customDomain).toEqual('www.nossas.link');
    });

    it('should select external domain tab', () => {
      const hostedZones = [{ domain_name: 'nossas.link' }]

      wrapper = shallow(
        <FormPanel
          hostedZones={hostedZones}
          mobilization={{ id: 3, custom_domain: 'www.customdomain.link' }} />
      );

      expect(wrapper.find(Tabs).props().defaultIndex).toEqual(2);
      expect(wrapper.find(ExternalDomainForm).props().customDomain).toEqual('www.customdomain.link');
    });

    it('should not pass custom domain when defaulIndex not selected', () => {
      const hostedZones = [{ domain_name: 'nossas.link' }];

      wrapper = shallow(
        <FormPanel
          hostedZones={hostedZones}
          mobilization={{ id: 3, custom_domain: 'www.customdomain.link' }} />
      );

      expect(wrapper.find(Tabs).props().defaultIndex).toEqual(2);
      expect(wrapper.find(DomainForm).props().customDomain).toEqual(null);
      expect(wrapper.find(SubdomainForm).props().customDomain).toEqual(null);
    });
  });
});
