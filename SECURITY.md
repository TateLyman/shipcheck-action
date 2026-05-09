# Security Policy

Shipcheck Repo Scanner is a defensive static scanner. Run it only on repositories you own or are authorized to inspect.

## Reporting Vulnerabilities

If you find a vulnerability in this GitHub Action or in `shipcheck-cli`, email:

lymantate2@gmail.com

Please include:

- A short description of the issue
- Reproduction steps
- Impact
- A minimal example if possible

Do not send real secrets, private keys, customer data, or credentials. Redact sensitive values before sharing.

## Scope

In scope:

- Vulnerabilities in the action wrapper
- Vulnerabilities in the published npm package
- False positives or false negatives that could materially affect security decisions

Out of scope:

- Automated testing against infrastructure without authorization
- Social engineering
- Denial-of-service testing
- Reports about third-party apps scanned by Shipcheck unless you own or are authorized to assess that app
