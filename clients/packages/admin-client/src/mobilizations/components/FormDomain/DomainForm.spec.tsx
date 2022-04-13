import React from 'react';
import { shallow } from 'enzyme';
import { Text, Link, Button } from 'bonde-components/chakra';
import { Form, Field } from 'bonde-components/form';
import DomainForm from './DomainForm';

describe('DomainForm tests', () => {
  let wrapper;
  let form;
  const onSubmit = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<DomainForm onSubmit={onSubmit} />)
    form = wrapper.find(Form).renderProp('children')({} as any);
  });

  it('should renders is ok', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render description to explain form', () => {
    const text = form.find(Text).at(0);
    expect(text.props().children)
      .toEqual('Selecione o domínio cadastrado na sua comunidade:');
  });

  it('should renders submit button', () => {
    const button = form.find(Button).at(0);
    expect(button.props().children).toEqual('Salvar');
    expect(button.props().type).toEqual('submit');
  });

  it('should render domain select input', () => {
    const hostedZones = [
      { domain_name: 'domain.org.br' },
      { domain_name: 'domain2.org.br' }
    ];
    wrapper.setProps({ hostedZones });
    form = wrapper.find(Form).renderProp('children')({} as any);

    const field = form.find(Field).at(0);
    expect(field.props().name).toEqual('customDomain');

    const select = field.renderProp('children')({ input: {} });
    expect(select.find('option').length).toEqual(hostedZones.length);
    expect(select.find('option').at(0).props().children).toEqual(hostedZones[0].domain_name);
    expect(select.find('option').at(1).props().children).toEqual(hostedZones[1].domain_name);
  });

  it('should render message with link to create new domain', () => {
    const path = process.env.REACT_APP_DOMAIN_ADMIN_CANARY + '/community/domains'

    form = wrapper.find(Form).renderProp('children')({} as any);

    const text = form.find(Text).at(2);
    expect(text.props().children)
      .toEqual('Não encontrou o domínio na lista?');

    const link = form.find(Link)
    expect(link.props().children).toEqual('Clique aqui');

    expect(link.props().href).toEqual(path);
  });

  it('should call onSubmit with customDomain value', async () => {
    await wrapper.find(Form).props().onSubmit({ customDomain: 'minhacampanha.org' });
    expect(onSubmit.mock.calls[0][0]).toEqual({ customDomain: 'minhacampanha.org' });
  });

  it('should set initialValues when passed customDomain', () => {
    wrapper.setProps({ customDomain: 'www.nossas.link' });
    expect(wrapper.find(Form).props().initialValues).toEqual({ customDomain: 'nossas.link' });
  });
});
