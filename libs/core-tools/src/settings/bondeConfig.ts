export default {
  development: {
    // Modules URLs
    accounts: 'http://bonde.devel:5000/login',
    settings: 'http://bonde.devel:5002/community/settings',
    mobilization: 'http://bonde.devel:5001/mobilizations',
    chatbot: 'http://bonde.devel:5005',
    redes: 'http://bonde.devel:5004',
    // Essentials URLs
    crossStorage: 'http://bonde.devel:5003',
    apiGraphql: 'http://api-graphql.bonde.devel/v1/graphql',
  },
  staging: {
    // Modules URLs
    accounts: 'https://accounts.staging.bonde.org/login',
    mobilization: 'https://app.staging.bonde.org/mobilizations',
    settings: 'https://admin-canary.staging.bonde.org/community/settings',
    chatbot: 'https://chatbot.staging.bonde.org',
    redes: 'https://redes.staging.bonde.org',
    // Essentials URLs
    crossStorage: 'https://cross-storage.staging.bonde.org',
    apiGraphql: 'https://api-graphql.staging.bonde.org/v1/graphql',
  },
  production: {
    // Modules URLs
    accounts: 'https://accounts.bonde.org/login',
    mobilization: 'https://app.bonde.org/mobilizations',
    settings: 'https://admin-canary.bonde.org/community/settings',
    chatbot: 'https://chatbot.bonde.org',
    redes: 'https://redes.bonde.org',
    // Essentials URLs
    crossStorage: 'https://cross-storage.bonde.org',
    apiGraphql: 'https://api-graphql.bonde.org/v1/graphql',
  },
};
