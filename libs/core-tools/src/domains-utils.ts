interface GoogleDNS {
  Answer: {
    name: string
    data: string
  }[]
}

interface Args {
  ip?: string[];
  ns?: string[];
}

export const checkDNS = async (domainName: string, type: 'NS' | 'A', args?: Args): Promise<boolean> => {
  const result = await fetch(`https://dns.google.com/resolve?name=${domainName}&type=${type}`);
  const googleDNS: GoogleDNS = await result.json();

  if (googleDNS.Answer && type === 'A') {
    return args?.ip?.filter((ip: string) => ip === googleDNS.Answer[0]?.data).length === 1;
  } else if (googleDNS.Answer?.length > 0 && type === 'NS') {
    return googleDNS.Answer.reduce(
      (acc: boolean, el) => acc
        ? !!(args?.ns?.find((ns: string) => el.data.replace(/[.]$/, '') === ns))
        : false,
      true
    );
  }
  return false;
}