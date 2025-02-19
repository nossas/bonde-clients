import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const Utils = {
  getSharedPath: (mobilization?: any) => {
    const domain = publicRuntimeConfig.domainPublic || 'staging.bonde.org';

    return mobilization?.custom_domain
      ? `https://${mobilization?.custom_domain}`
      : `https://${mobilization?.slug}.${domain}`;
  },
  imageUrl: '/static/images/check-mark-image.png'
}

export default Utils;
