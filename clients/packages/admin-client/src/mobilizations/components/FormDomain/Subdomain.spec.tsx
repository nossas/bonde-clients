import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'bonde-components/chakra';
import { Field } from 'bonde-components/form';
import SubdomainForm from './SubdomainForm';

describe('SubdomainForm tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SubdomainForm />);
  });

  it('should renders is ok', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render description to explain form', () => {
    const text = wrapper.find(Text).at(0);
    expect(text.props().children)
      .toEqual('Personalize o subdomínio abaixo e clique em salvar para gerar o certificado.');
  });

  it('should render subdomain input', () => {
    const field = wrapper.find(Field).at(0);
    expect(field.props().name).toEqual('subdomain');
    
    const input = field.renderProp('children')({ input: {} });
    expect(input.props().placeholder).toEqual('escreva seu subdomínio');
  });
  
  it('should render domain select input', () => {
    const hostedZones = [
      { domain_name: '.domain.org.br' },
      { domain_name: '.domain2.org.br' }
    ];
    wrapper.setProps({ hostedZones });

    const field = wrapper.find(Field).at(1);
    expect(field.props().name).toEqual('domain');

    const select = field.renderProp('children')({ input: {} });
    expect(select.find('option').length).toEqual(hostedZones.length);
    expect(select.find('option').at(0).props().children).toEqual(hostedZones[0].domain_name);
    expect(select.find('option').at(1).props().children).toEqual(hostedZones[1].domain_name);
  });
});