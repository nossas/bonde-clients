import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'bonde-components/chakra';
import { Field, Form } from 'bonde-components/form';
import SubdomainForm from './SubdomainForm';

describe('SubdomainForm tests', () => {
  let wrapper;
  let form;
  const onSubmit = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<SubdomainForm onSubmit={onSubmit} />);
    form = wrapper.find(Form).renderProp('children')({} as any);
  });

  it('should renders is ok', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render description to explain form', () => {
    const text = form.find(Text).at(0);
    expect(text.props().children)
      .toEqual('Personalize o subdomínio abaixo e clique em salvar para gerar o certificado.');
  });

  it('should render subdomain input', () => {
    const field = form.find(Field).at(0);
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
    form = wrapper.find(Form).renderProp('children')({} as any);

    const field = form.find(Field).at(1);
    expect(field.props().name).toEqual('domain');

    const select = field.renderProp('children')({ input: {} });
    expect(select.find('option').length).toEqual(hostedZones.length);
    expect(select.find('option').at(0).props().children).toEqual(hostedZones[0].domain_name);
    expect(select.find('option').at(1).props().children).toEqual(hostedZones[1].domain_name);
  });

  it('should call onSubmit with customDomain value', async () => {
    await wrapper.find(Form).props().onSubmit({ subdomain: 'minhacampanha', domain: 'nossas.org' });
    expect(onSubmit.mock.calls[0][0]).toEqual({ customDomain: 'minhacampanha.nossas.org' });
  });

  it('should set initialValues when passed customDomain', () => {
    wrapper.setProps({ customDomain: 'www.campanha.nossas.link' });
    expect(wrapper.find(Form).props().initialValues)
      .toEqual({ subdomain: 'campanha', domain: 'nossas.link' });

    wrapper.setProps({ customDomain: 'www.campanha-dasfe.nossas-ce.link.org' });
      expect(wrapper.find(Form).props().initialValues)
        .toEqual({ subdomain: 'campanha-dasfe', domain: 'nossas-ce.link.org' });
  });
});