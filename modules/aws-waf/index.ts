import ExpoAwsWafModule from "./src/ExpoAwsWafModule";

/**
 * Return the AWS WAF token (or an empty string if some error occurs).
 */
export function getToken(): string {
  const token = ExpoAwsWafModule.getToken();
  if (token) {
    console.debug(`Received AWS WAF token: ${token}`);
  } else {
    console.warn("Received empty AWS WAF token response");
  }
  return token;
}

/**
 * Initialize the AWS WAF SDK with the WAF integration URL from the console, and the
 * domain name to which the WAF application integration should apply.
 */
export async function initialize({
  integrationUrl,
  domainName,
}: {
  integrationUrl: string;
  domainName: string;
}) {
  if (!integrationUrl || !domainName) {
    console.warn(
      "Skipping AWS WAF initialize. Missing integrationUrl or domainName.",
    );
    return;
  }

  await ExpoAwsWafModule.initialize(integrationUrl, domainName);
}
