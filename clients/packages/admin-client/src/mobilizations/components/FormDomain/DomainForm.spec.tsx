import React from 'react';
import { shallow } from 'enzyme';
import { Text, Link } from 'bonde-components/chakra';
import { Field } from 'bonde-components/form';
import DomainForm from './DomainForm';

describe('DomainForm tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DomainForm />);
  });

  it('should renders is ok', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render description to explain form', () => {
    const text = wrapper.find(Text).at(0);
    expect(text.props().children)
      .toEqual('Selecione o domínio cadastrado na sua comunidade:');
  });

  it('should render domain select input', () => {
    const hostedZones = [
      { domain_name: '.domain.org.br' },
      { domain_name: '.domain2.org.br' }
    ];
    wrapper.setProps({ hostedZones });

    const field = wrapper.find(Field).at(0);
    expect(field.props().name).toEqual('domain');

    const select = field.renderProp('children')({ input: {} });
    expect(select.find('option').length).toEqual(hostedZones.length);
    expect(select.find('option').at(0).props().children).toEqual(hostedZones[0].domain_name);
    expect(select.find('option').at(1).props().children).toEqual(hostedZones[1].domain_name);
  });

  it('should render message with link to create new domain', () => {
    const path = 'https://admin-canary.bonde.org/community/settings/domains'
    wrapper.setProps({ createNewDomainPath: path });

    const text = wrapper.find(Text).at(2);
    expect(text.props().children)
      .toEqual('Não encontro o domínio na lista?');

    const link = wrapper.find(Link)
    expect(link.props().children).toEqual('Clique aqui');
    expect(link.props().href).toEqual(path);
    expect(link.props().target).toEqual('_self');
  });
});