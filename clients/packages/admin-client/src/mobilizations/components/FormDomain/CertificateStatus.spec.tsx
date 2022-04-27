import React from 'react';
import { shallow } from 'enzyme';
import { Heading, Text } from 'bonde-components/chakra';
import CertificateStatus from './CertificateStatus';

describe("CertificateStatus tests", () => {
  const defaultMessage = 'Pode levar até 5 minutos para o certificado ser gerado e o endereço ficar disponível.';
  const activeMessage = ["O endereço ", <b>nossas.link</b>, " está ativo e com certificado de segurança."];
  const inactiveMessage = 'Inativo';

  it('should renders is ok', () => {
    const wrapper = shallow(<CertificateStatus />);
    expect(wrapper).toBeTruthy();
  });

  it('should render default status message', () => {
    const wrapper = shallow(<CertificateStatus />);

    expect(wrapper.find(Heading).props().children).toEqual('Status');
    expect(wrapper.find(Text).at(1).props().children).toEqual(defaultMessage);
  });

  it('should render active status', () => {
    const hostedZones = [
      { domain_name: 'nossas.link', certificates: [{ domain: 'nossas.link', is_active: true }] }
    ]
    const customDomain = 'www.nossas.link';

    const wrapper = shallow(<CertificateStatus customDomain={customDomain} hostedZones={hostedZones} />);

    expect(wrapper.find(Heading).props().children).toEqual('Status');
    expect(wrapper.find(Text).at(0).props().children).toEqual('Ativo');
    expect(wrapper.find(Text).at(1).props().children).toEqual(activeMessage);
  });

  it('should render default message when not active status', () => {
    const hostedZones = [
      { domain_name: 'nossas.link', certificates: [{ domain: 'nossas.link', is_active: false }] }
    ]
    const customDomain = 'www.nossas.link';

    const wrapper = shallow(<CertificateStatus customDomain={customDomain} hostedZones={hostedZones} />);

    expect(wrapper.find(Heading).props().children).toEqual('Status');
    expect(wrapper.find(Text).at(0).props().children).toEqual(inactiveMessage);
    expect(wrapper.find(Text).at(1).props().children).toEqual(defaultMessage);
  });
});
