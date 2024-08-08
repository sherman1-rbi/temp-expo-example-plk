import ExpoModulesCore

import WafMobileSdk

let onTokenReadyEvent = "onTokenReady"

public class ExpoAwsWafModule: Module {
  var tokenProvider: WAFTokenProvider?

  public func definition() -> ModuleDefinition {
    Name("ExpoAwsWaf")

    Events(onTokenReadyEvent)

    Function("initialize") { (integrationUrl: String, domainName: String) -> Void in
        print("Initializing WAF SDK: integrationUrl=\(integrationUrl), domainName=\(domainName)")

        guard let url: URL = URL(string: integrationUrl) else {
            print("Error: AWS WAF invalid integration URL")
            return
        }
        guard let config = WAFConfiguration(applicationIntegrationUrl: url, domainName: domainName) else {
          print("Error: AWS WAF configuration not defined")
          return
        }

        let provider = WAFTokenProvider(config)
        self.tokenProvider = provider

        provider.onTokenReady() { token, error in
            if let token = token {
                self.sendEvent(onTokenReadyEvent, [
                  "value": token
                ])
            }

            if let error = error {
                print("Error: AWS WAF onTokenReady error \(error)")
            }
        }
    }

    Function("getToken") {
        guard let provider = self.tokenProvider else {
            print("Error: AWS WAF SDK is not initialized.")
            return ""
        }
        return provider.getToken()?.value ?? ""
    }
  }
}
