import React from 'react';
import { shallow } from 'enzyme';
// import { FormattedMessage } from 'react-intl';
import FormDomain from './FormDomain';

describe("FormDomain tests", () => {
  const properties = {
    formComponent: 'div',
    fields: {
      externalDomain: { value: '', onChange: jest.fn() },
      subdomain: { value: '', onChange: jest.fn() },
      domain: { value: '', onChange: jest.fn() },
      advancedConfig: { value: '', onChange: jest.fn() },
      rootDomain: { value: '', onChange: jest.fn() },
      rootDomainConfig: { value: '', onChange: jest.fn() },
    },
    intl: { formatMessage: jest.fn() },
    mobilization: { custom_domain: '' },
    hostedZones: [],
    redirectToCreateDNS: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks();
  })


  it("should be renders ok", () => {
    const wrapper = shallow(<FormDomain {...properties} />);
    expect(wrapper).toBeTruthy();
  });

  it("should be renders like external domain", () => {
    const customDomain = 'www.dominioexterno.org.br';

    const wrapper = shallow(<FormDomain {...properties} mobilization={{ custom_domain: customDomain }} />);
    const instance: any = wrapper.instance();

    expect(properties.fields.advancedConfig.onChange.mock.calls[0]).toEqual([true]);
    expect((instance.state as any).showSubdomain).toEqual(false);
    expect((instance.state as any).showRootDomain).toEqual(false);
    expect(properties.fields.rootDomainConfig.onChange.mock.calls[0]).toEqual([false]);
  });

  it("should be renders like subdomain", () => {
    const customDomain = 'www.sub.dominio.org.br';
    const hostedZones = [{ domain_name: 'dominio.org.br' }];

    const wrapper = shallow(
      <FormDomain
        {...properties}
        mobilization={{ custom_domain: customDomain }}
        hostedZones={hostedZones}
      />
    );
    const instance: any = wrapper.instance();

    expect((instance.state as any).showExternalDomain).toEqual(false);
    expect((instance.state as any).showRootDomain).toEqual(false);
    expect(properties.fields.advancedConfig.onChange.mock.calls[0]).toEqual([false]);
    expect(properties.fields.rootDomainConfig.onChange.mock.calls[0]).toEqual([false]);
  });

  it("should be renders like root domain", () => {
    const customDomain = 'www.dominio.org.br';
    const hostedZones = [{ domain_name: 'dominio.org.br' }];

    const wrapper = shallow(
      <FormDomain
        {...properties}
        mobilization={{ custom_domain: customDomain }}
        hostedZones={hostedZones}
      />
    );
    const instance: any = wrapper.instance();

    expect(properties.fields.rootDomainConfig.onChange.mock.calls[0]).toEqual([true]);
    expect((instance.state as any).showSubdomain).toEqual(false);
    expect((instance.state as any).showExternalDomain).toEqual(false);
    expect(properties.fields.advancedConfig.onChange.mock.calls[0]).toEqual([false]);
  });

  // TODO: update tests to check implement
  // it('should call redirectToCreateDNS when click to create new domain', () => {
  //   const wrapper = shallow(<FormDomain {...properties} />);
  //   const formatted = wrapper.find(FormattedMessage);

  //   console.log(formatted);
  //   formatted.find('a.new-domain-link').simulate('click');

  //   expect(properties.redirectToCreateDNS).toHaveBeenCalledTimes(1);
  // });

  describe('for external domain', () => {
    const customDomain = 'www.dominioexterno.org.br';

    const wrapper = shallow(<FormDomain {...properties} mobilization={{ custom_domain: customDomain }} />);
    
    it('should renders CNAME table', () => {
      const instance: any = wrapper.instance();

      expect((instance.state as any).showExternalDomain).toEqual(true);
      expect(wrapper.find('div.cname-table').length).toEqual(1);
    });
  });
});