import React from 'react';
import { shallow } from 'enzyme';
import { Heading, Text } from 'bonde-components/chakra';
import CertificateStatus from './CertificateStatus';
import LoadingIcon from '../../../icons/LoadingIcon';

describe("CertificateStatus tests", () => {
  const defaultMessage = 'Pode levar até 5 minutos para o certificado ser gerado e o endereço ficar disponível.';
  const activeMessage = ["O endereço ", <b>nossas.link</b>, " está ativo e com certificado de segurança."];
  const inactiveMessage = 'Inativo';
  const loadingMessage = 'Gerando certificado'
  const failedMessage = 'Ops, falta configurar o ip'

  it('should renders is ok', () => {
    const wrapper = shallow(<CertificateStatus />);
    expect(wrapper).toBeTruthy();
  });

  it('should render default/inactive status message', () => {
    const wrapper = shallow(<CertificateStatus />);

    expect(wrapper.find(Heading).props().children).toEqual('Status');
    expect(wrapper.find(Text).at(0).props().children).toEqual(inactiveMessage);
    expect(wrapper.find(Text).at(1).props().children).toEqual(defaultMessage);
  });

  it('should render message when certificate is in progress', () => {
    const hostedZones = [
      { domain_name: 'teste.org', certificates: [] }
    ]
    const customDomain = 'teste.org';

    const wrapper = shallow(<CertificateStatus customDomain={customDomain} hostedZones={hostedZones} />);

    expect(wrapper.find(LoadingIcon).at(0));
    expect(wrapper.find(Text).at(0).props().children).toEqual(loadingMessage);
  })

  it('should render active status', () => {
    const hostedZones = [
      { domain_name: 'nossas.link', certificates: [{ domain: 'nossas.link', is_active: true, is_external_domain: false }] }
    ]
    const customDomain = 'www.nossas.link';

    const wrapper = shallow(<CertificateStatus customDomain={customDomain} hostedZones={hostedZones} />);

    expect(wrapper.find(Heading).props().children).toEqual('Status');
    expect(wrapper.find(Text).at(0).props().children).toEqual('Ativo');
    expect(wrapper.find(Text).at(1).props().children).toEqual(activeMessage);
  });

  it('should render when ip is failed', () => {
    const hostedZones = [
      { domain_name: 'teste.org', certificates: [], ns_ok: false, is_external_domain: true }
    ]
    const customDomain = 'www.teste.org';

    const wrapper = shallow(<CertificateStatus customDomain={customDomain} hostedZones={hostedZones} />);

    expect(wrapper.find(LoadingIcon).at(0));
    expect(wrapper.find(Text).at(0).props().children).toEqual(failedMessage);
  })
});
