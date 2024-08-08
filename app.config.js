module.exports = ({ config }) => {
  return { 
    ...config,
    extra: { 
      awsWaf: {
        integrationUrl: process.env.AWS_WAF_INTEGRATION_URL,
        domainName: process.env.AWS_WAF_DOMAIN_NAME,
      },
    },
  };
};
