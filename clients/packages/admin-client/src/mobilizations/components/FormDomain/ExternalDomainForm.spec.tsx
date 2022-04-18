import React from 'react';
import { shallow } from 'enzyme';
import { Button, ListItem, OrderedList, Text } from 'bonde-components/chakra';
import { Form, Field } from 'bonde-components/form';
import ExternalDomainForm from './ExternalDomainForm';

describe('ExternalDomainForm tests', () => {
  let wrapper;
  let form;
  const onSubmit = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<ExternalDomainForm onSubmit={onSubmit} />)
    form = wrapper.find(Form).renderProp('children')({} as any);
  })

  it('should renders is ok', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render description to explain form', () => {
    const text = form.find(Text).at(0);
    expect(text.props().children)
      .toEqual('Insira abaixo o domínio, salve as alterações e siga o passo a passo para configurá-lo:');
  });

  it('should renders submit button', () => {
    const button = form.find(Button).at(0);
    expect(button.props().children).toEqual('Salvar');
    expect(button.props().type).toEqual('submit');
  });

  it('should render domain input', () => {
    const field = form.find(Field).at(0);
    expect(field.props().name).toEqual('customDomain');

    const input = field.renderProp('children')({ input: {} });
    expect(input.props().placeholder).toEqual('seudominio.org');
  });

  it('should set initialValues with customDomain input', () => {
    wrapper.setProps({ customDomain: 'www.dominioexterno.com.br' });
    expect(wrapper.find(Form).props().initialValues).toEqual({
      customDomain: 'dominioexterno.com.br'
    });
  });

  it('should render steps to settings DNS', () => {
    const orderedList = form.find(OrderedList);
    expect(orderedList.length).toEqual(1);

    const listItems = form.find(ListItem);

    expect(listItems.at(0).props().children)
      .toEqual('Abra o site onde você comprou o domínio (GoDaddy.com, por exemplo);');
    expect(listItems.at(1).props().children)
      .toEqual('Entre nas configurações do domínio que você inseriu no BONDE;');
    expect(listItems.at(2).props().children)
      .toEqual('Procure a opção "Manage DNS" e clique nela;');
    expect(listItems.at(3).props().children)
      .toEqual('Em "Records", clique em "add", no canto inferior direito;');
    expect(listItems.at(4).props().children)
      .toEqual('Selecione "A", em "Type";');
    expect(listItems.at(5).props().children)
      .toEqual('Em "Host", escreva o subdomínio com e sem "www";');
    expect(listItems.at(6).props().children)
      .toEqual('Em "Points to", preencha com o seguinte IP: 54.156.173.29');
    expect(listItems.at(7).props().children)
      .toEqual('Em "TTL", selecione "¹/² hour" e clique em "save";');
  });

  it('should call onSubmit with customDomain and isExternalDomain value', async () => {
    await wrapper.find(Form).props().onSubmit({ customDomain: 'minhacampanha.org' });
    expect(onSubmit.mock.calls[0][0])
      .toEqual({ customDomain: 'minhacampanha.org', isExternalDomain: true });
  });
});
