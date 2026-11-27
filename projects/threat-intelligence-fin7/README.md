# Threat Intelligence Analysis: Profiling FIN7 on a Financial Institution

Cyber Threat Intelligence (CTI) assessment of a simulated attack by the financially motivated threat group FIN7 against a financial institution, using publicly available intelligence, Open-Source Intelligence (OSINT) techniques, and the MITRE ATT&CK framework.

## Overview

Financial institutions are prime targets because of the high value of financial data, transaction systems, and customer information they hold. This study evaluates the institution's external exposure, analyses FIN7's capabilities, and models a realistic attack lifecycle, from reconnaissance to data exfiltration.

Key finding: the institution showed a strong infrastructure-level security posture — encrypted communications, hardened external services, and likely web application firewall deployment — but its human-facing attack surface remained susceptible to targeted phishing, which aligns with global trends where human error is a leading cause of breaches.

## Reconnaissance (OSINT)

Passive reconnaissance was conducted in Kali Linux using theHarvester, Whois, Shodan, Censys, and Google dorking.

Findings:
- theHarvester uncovered multiple email addresses across departments (customer service, investor relations, and named employees) plus URLs — ideal material for highly targeted spear phishing.
- Several hosts and subdomains were identified, including online banking portals, APIs, and a sandbox environment — each one an entry point to secure and monitor.
- Shodan and Censys showed the host exposing Port 25 (SMTP) and Port 587 (SMTP Submission), with support for large message sizes and pipelining — a risk for malicious attachments and mass phishing delivery.
- The TLS certificate was valid, trusted, and issued by a recognized certificate authority, covering the primary domain and subdomains.
- Infrastructure geolocated to New York, United States, within the organisation's own autonomous system.
- Google dorking uncovered publicly available documents (financial reports, corporate publications) whose metadata — document authors, board members, internal system references — could be used to make phishing emails more convincing or for business email compromise (BEC).

## Threat Actor Profiling (FIN7)

FIN7 is a highly organised, financially motivated cybercriminal group, also known as the Carbanak Group and the Navigator Group. It targets financial institutions, retail organisations, and payment processing systems. Its operations are methodical and stealthy, combining technical sophistication with social engineering.

- Motivation: financial gain.
- Initial access: spear phishing with emails mimicking legitimate business communications, carrying malicious attachments or links.
- Malware arsenal: Carbanak (banking trojan for unauthorised financial transactions), Griffon (lightweight backdoor for remote access), Bateleur (advanced malware for persistence and stealth).

## Attack Simulation — Kill Chain

A realistic six-stage FIN7-style campaign, modelled on the reconnaissance findings and known FIN7 tactics, techniques, and procedures (TTPs):

1. **Initial Access (Phishing)** — personalised spear phishing emails built from the harvested email addresses and subdomains; the victim opens a malicious attachment or clicks a link.
2. **Execution** — the attachment triggers a PowerShell script that downloads and installs malware (e.g. Griffon or a custom loader), abusing trusted system tools to stay undetected.
3. **Persistence** — registry run keys and scheduled tasks keep the malware active across reboots, turning a temporary compromise into a long-term one.
4. **Credential Access and Command and Control (C2)** — credentials are extracted by memory scraping or password dumping; compromised systems connect to an external C2 server over encrypted, normal-looking traffic.
5. **Lateral Movement, Privilege Escalation and Internal Reconnaissance** — stolen credentials move the attacker across the network, escalating to admin or domain-level access and mapping internal systems for valuable data.
6. **Data Exfiltration and Impact** — financial records and customer information are collected and exfiltrated over legitimate channels, with financial theft as the end goal.

## MITRE ATT&CK Mapping

| Tactic | Technique ID | Technique |
|---|---|---|
| Reconnaissance | T1596, T1593.003, T1589.002 | Gather Victim Identity Information; Search Open Websites/Domains |
| Initial Access | T1566.001, T1204 | Phishing: Spearphishing Attachment; User Execution |
| Execution | T1059 | Command and Scripting Interpreter (PowerShell) |
| Persistence | T1547.001 | Boot or Logon Autostart Execution: Registry Run Keys |
| Credential Access | T1003 | OS Credential Dumping |
| Lateral Movement | T1021.001, T1021.004 | Remote Services: RDP and SSH |
| Command and Control | T1071.001, T1071.003 | Application Layer Protocol: Web Protocols and Mail Protocols |
| Exfiltration | T1041 | Exfiltration Over C2 Channel |
| Impact | T1657 | Financial Theft |

## Defense Recommendations

- **Prevent:** advanced email gateways and URL scanning to block spear phishing; staff training on FIN7-style lures (fake invoices, job offers); MFA on email and accounts; disable or sandbox Office macros; mail attachment detonation and URL filtering.
- **Detect:** Endpoint Detection and Response (EDR) for anomalous behaviour; SIEM for centralised log analysis and real-time alerting.
- **Respond:** incident response plans, regular drills, and the ability to isolate compromised systems quickly.
- **Strategic:** adopt a Zero Trust Architecture with continuous verification; integrate threat intelligence feeds; run ongoing user awareness training, since human error remains one of the biggest risk factors.

## Report

The full written report is available on request. It is not published here, because its screenshots name the institution studied.

## Live project page

https://imhardeyboi.github.io/threat-intelligence-fin7.html

## Skills demonstrated

Cyber Threat Intelligence (CTI), OSINT (theHarvester, Shodan, Censys, Whois, Google dorking), threat actor profiling, MITRE ATT&CK mapping, attack lifecycle / kill chain modelling, phishing and social engineering analysis, defensive control design, Zero Trust Architecture.

## Author

Adebayo — Cybersecurity Engineer. Portfolio: https://imhardeyboi.github.io, GitHub: https://github.com/imhardeyboi
