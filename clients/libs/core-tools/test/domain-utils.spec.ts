import { checkDNS } from '../src';

describe('DomainUtils tests checkDNS', () => {
  const domainName = 'www.nossas.link';
  const mockJson = jest.fn();
  window.fetch = jest.fn().mockImplementation(() => ({
    json: mockJson
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when dns google resolved with same IP', async () => {
    const type = 'A';
    const ip = ['127.0.0.1', 'localhost'];
    mockJson.mockResolvedValueOnce({
      Answer: [
        { data: ip[0] }
      ]
    });

    expect(await checkDNS(domainName, type, { ip })).toEqual(true);
  });

  it('should return false when dns google not resolved with same IP', async () => {
    const type = 'A';
    const ip = ['127.0.0.1', 'localhost'];
    mockJson.mockResolvedValueOnce({ Answer: [] });

    expect(await checkDNS(domainName, type, { ip })).toEqual(false);
  });

  it('should return true when dns google resolved with same name servers', async () => {
    const type = 'NS';
    const ns = ['ns-111.awsdns-11.net', 'ns-111.awsdns-11.org'];
    mockJson.mockResolvedValueOnce({
      Answer: [
        { data: `${ns[0]}.` },
        { data: `${ns[1]}.` }
      ]
    });

    expect(await checkDNS(domainName, type, { ns })).toEqual(true);
  });

  it('should return false when dns google not resolved with same name servers', async () => {
    const type = 'NS';
    const ns = ['ns-111.awsdns-11.net', 'ns-111.awsdns-11.org'];
    mockJson.mockResolvedValueOnce({ Answer: [{ data: 'outro-dns' }] });

    expect(await checkDNS(domainName, type, { ns })).toEqual(false);
  });

  it('should return false when dns google not fetch name servers', async () => {
    const type = 'NS';
    const ns = ['ns-111.awsdns-11.net', 'ns-111.awsdns-11.org'];
    mockJson.mockResolvedValueOnce({ Answer: [] });

    expect(await checkDNS(domainName, type, { ns })).toEqual(false);
  });
});