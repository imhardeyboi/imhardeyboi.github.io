# Multi-Department Office Network — Cisco Packet Tracer

Design and simulation of a secure multi-department office network for **DataBridge Innovations**, using Cisco Packet Tracer.

## Overview

A small office network connecting three departments — Admin, Sales, and Human Resources (HR) — with network segmentation, IP addressing, routing, connectivity testing, and basic security using Access Control Lists (ACLs).

This project was completed as part of the 10Alytics Introduction to Networking course. The assignment: apply one simple ACL rule on the router so HR cannot ping Admin, while all other traffic is allowed.

## Network design

| Department | Subnet | Gateway | PCs |
|---|---|---|---|
| Admin | 192.168.10.0/24 | 192.168.10.1 | 192.168.10.10, 192.168.10.11 |
| Sales | 192.168.20.0/24 | 192.168.20.1 | 192.168.20.10, 192.168.20.11 |
| HR | 192.168.30.0/24 | 192.168.30.1 | 192.168.30.10, 192.168.30.11 |

Devices:
- 1x Cisco 2911 router
- 3x Cisco 2960 switches (one per department)
- 6x PCs (two per department)

Each department is on its own subnet to improve security and network management.

## Router configuration

interface GigabitEthernet0/0, ip address 192.168.10.1 255.255.255.0, no shutdown
interface GigabitEthernet0/1, ip address 192.168.20.1 255.255.255.0, no shutdown
interface GigabitEthernet0/2, ip address 192.168.30.1 255.255.255.0, no shutdown

DHCP relay: ip helper-address 192.168.10.2 on GigabitEthernet0/1 and GigabitEthernet0/2

## Security — Access Control List

Security requirement: the HR department must not access the Admin department. All other traffic must be allowed.

access-list 101 deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255
access-list 101 permit ip any any

## Testing and results

Ping tests, 4 packets each. Before the ACL: Admin, Sales and HR could all ping each other, 4/4 received, no loss. After the ACL: Sales to Admin 4/4 received, Admin to Sales 4/4 received, HR to Admin 0/4 received — blocked, "Destination host unreachable".

## Packet Tracer file

Open databridge-multi-department-office-network.pkz in Cisco Packet Tracer to view the topology and run the ping tests yourself. The file will be added to this folder.

## Live project page

https://imhardeyboi.github.io/soho-network-design.html

## Skills demonstrated

Network segmentation, subnetting and IP addressing, router configuration (Cisco CLI), DHCP relay, Access Control Lists, security validation testing, defensive network architecture.

## Author

Adebayo — Cybersecurity Engineer. Portfolio: https://imhardeyboi.github.io, GitHub: https://github.com/imhardeyboi
