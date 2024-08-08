let cachedWafToken = '';

async function persistToken(): Promise<void> {
  const token = await window.AwsWafIntegration?.getToken();
  cachedWafToken = token;
}

export default {
  getToken: function getToken(): string {
    if (window.AwsWafIntegration?.hasToken() && cachedWafToken) {
      return cachedWafToken;
    }

    //enqueue an async token update
    persistToken();

    return '';
  },

  initialize: async function initialize() {
    await persistToken(); //Enqueues initial token generation
  },
};

declare global {
  interface Window {
    AwsWafIntegration?: {
      getToken: Function;
      hasToken: Function;
    };
  }
}
