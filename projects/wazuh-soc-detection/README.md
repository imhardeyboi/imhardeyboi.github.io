# Enhancing Linux Endpoint Security with Wazuh: Unauthorized Process Detection

Detection of unauthorized Netcat executions on Linux endpoints using Wazuh, an open-source SIEM and XDR platform, with custom process-monitoring rules and real-time alerting.

## Overview

Linux-based infrastructure is a prime target for attackers because of its widespread adoption in enterprise environments. At 10ALYTICS‑DC, a growing data center and cloud services provider, threat intelligence reports showed increased attempts to exploit Linux endpoints using unauthorized tools such as Netcat. Netcat is a legitimate utility, but attackers frequently weaponize it for data exfiltration, reverse shells, and unauthorized remote access.

A routine audit found that engineers and third-party contractors occasionally used Netcat without authorization — a gap that could mask malicious activity. This project closes that gap with Wazuh command monitoring, custom detection rules, and real-time alerts, and serves as a blueprint for scalable endpoint protection across 10ALYTICS‑DC's infrastructure.

## Lab Environment

A VirtualBox-based lab simulating a realistic enterprise environment, with all three machines on the same network (bridged adapter plus internal network):

| Machine | Role | IP address |
|---|---|---|
| Wazuh Manager | SIEM/XDR — collects logs, analyses events with rules, generates alerts, executes active responses | 10.71.88.224 |
| Ubuntu | Monitored endpoint — runs the Wazuh Agent, monitors processes and commands, sends logs to the manager | 10.71.88.235 |
| Kali Linux | Attacker — simulates unauthorized Netcat usage and detection testing | 10.71.88.165 |

Communication flow: the Linux endpoint executes a command, the Wazuh agent collects the process logs, the logs are forwarded to the Wazuh manager, custom rules detect Netcat usage, and alerts are generated in real time. With an active response rule set, the response can block the attacker.

## Configuration and Implementation

- **Wazuh Manager:** a custom rule was created in `/var/ossec/etc/rules/local_rules.xml` that triggers every time a Netcat program is launched.
- **Ubuntu endpoint:** the Wazuh agent was downloaded and installed from the terminal; `ossec.conf` was edited to enable process and command monitoring. Netcat was installed for testing with `sudo apt install ncat nmap -y`.
- **Kali Linux:** SSH was enabled and started for remote access to the Ubuntu endpoint during the attack simulation. Connectivity between all three machines was verified with ping and `ifconfig` checks.

## Attack Simulation

Kali Linux acted as the attacker, running Netcat against the Ubuntu endpoint to simulate an unauthorized process execution — Netcat listening for incoming connections with `nc -lvp 4444`, mimicking a reverse shell setup.

## Detection Results

Wazuh detected the activity and generated an alert in the dashboard:

- **Alert:** `rule.description: netcat listening for incoming connections` — a Netcat process running in listening mode on port 4444.
- **Severity:** level 7 (medium-to-high in the Wazuh alert classification), indicating suspicious activity requiring investigation.
- **Evidence:** Wazuh Discover showed multiple log entries of Netcat (nc) actively listening on port 4444 at different timestamps, with a matching spike in the histogram. Command monitoring of netstat captured the activity, forwarded it to the manager, and visualized it in the dashboard.
- **Confirmation:** the Ubuntu endpoint's logs reached the Wazuh manager successfully, proving the agent configuration and command monitoring were working as intended.

Netcat itself is a legitimate diagnostic tool, but it is widely abused for backdoors, data exfiltration, persistence, and lateral movement — so detecting it listening is an important security monitoring capability.

## Recommendations

To strengthen endpoint security beyond Netcat detection:

- **Prevent:** strict application controls / process whitelisting so only approved administrative tools can run; harden Linux endpoints by disabling unnecessary services, closing unused ports, and enforcing firewall rules.
- **Identity and access:** apply the principle of least privilege and use multi-factor authentication to limit damage if credentials are compromised.
- **Detect:** expand network-level monitoring to spot unusual inbound or outbound traffic, reverse shells, and tunneling.
- **Respond:** activate Wazuh's active response features for automated containment, such as blocking malicious IPs or stopping suspicious processes.
- **Maintain:** disciplined patch management and regular security audits so the environment stays resilient as threats evolve.

## Report

The full report is in this folder: wazuh-soc-detection-report.pdf

## Live project page

https://imhardeyboi.github.io/wazuh-soc-detection.html

## Skills demonstrated

SOC monitoring and analysis, Wazuh SIEM/XDR (manager, agent, custom rules, dashboards), Linux endpoint security, process and command monitoring, Netcat abuse and reverse shell detection, log analysis, alert triage (severity classification), incident response planning, lab design with VirtualBox (Ubuntu, Kali Linux).

## Author

Adebayo — Cybersecurity Engineer. Portfolio: https://imhardeyboi.github.io, GitHub: https://github.com/imhardeyboi
