import Constants from "expo-constants";
import { useEffect } from "react";

import { initialize } from "../modules/aws-waf";

export function useAwsWaf() {
  useEffect(() => {
    const { integrationUrl, domainName } =
      Constants.expoConfig?.extra?.awsWaf ?? {};
    if (!integrationUrl) {
      throw new Error("Missing required AWS WAF integration URL");
    }
    if (!domainName) {
      throw new Error("Missing required AWS WAF domain name");
    }

    console.debug(
      `Initializing AWS WAF: integrationUrl=${integrationUrl}, domainName=${domainName}`,
    );
    initialize({ integrationUrl, domainName });
  }, []);
}
