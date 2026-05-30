# Product Requirements Document (PRD)

# Ipeya

**Version:** 1.0
**Date:** May 2026
**Prepared By:** Product Team

---

# 1. Executive Summary

Ipeya is a mobile and web-based community safety platform that enables citizens to report security incidents, receive real-time alerts, request emergency assistance, and collaborate with nearby trusted community members and security agencies.

The platform aims to reduce response times during emergencies, increase public awareness of security threats, and provide communities with a reliable mechanism for sharing verified safety information.

The name **Ipeya** is derived from the Yoruba word associated with danger, caution, and security awareness.

---

# 2. Problem Statement

Nigeria faces significant security challenges including:

* Kidnappings
* Armed robberies
* Bandit attacks
* Terrorist activities
* Missing persons
* Road accidents
* Medical emergencies
* Community violence

Current reporting channels are often:

* Slow
* Fragmented
* Difficult to access
* Limited by poor internet connectivity
* Not community-driven

Citizens frequently lack timely information that could help them avoid danger or obtain assistance quickly.

---

# 3. Product Vision

To become Africa's most trusted community-powered safety and emergency response platform.

---

# 4. Product Goals

## Primary Goals

1. Enable instant emergency reporting.
2. Provide real-time safety alerts.
3. Connect victims with nearby responders.
4. Improve community awareness.
5. Facilitate collaboration between citizens and authorities.

## Success Metrics

* Monthly Active Users (MAU)
* Emergency reports submitted
* Average response time
* Number of verified incidents
* Number of lives assisted
* User retention rate
* Alert delivery success rate

---

# 5. Target Users

## Citizens

People who want to:

* Stay informed about nearby threats
* Report incidents
* Request help

## Community Volunteers

Individuals willing to:

* Assist victims
* Verify reports
* Serve as first responders

## Security Agencies

Organizations including:

* Police
* Civil Defense
* Vigilante groups
* Local security task forces

## Emergency Services

* Ambulance services
* Fire services
* Rescue teams

---

# 6. Core Features

## 6.1 Emergency SOS Button

### Description

A prominent emergency button accessible from the home screen.

### Actions

When activated:

* Sends GPS location
* Sends user identity
* Sends emergency type
* Notifies nearby responders
* Notifies emergency contacts

### Emergency Categories

* Kidnapping
* Robbery
* Assault
* Accident
* Fire
* Medical Emergency
* Missing Person
* Other

---

## 6.2 Incident Reporting

Users can submit reports including:

### Data Collected

* Incident type
* Description
* Location
* Photos
* Videos
* Voice notes
* Time of occurrence

### Statuses

* Pending Verification
* Verified
* Resolved
* False Report

---

## 6.3 Safety Alert Feed

A live feed showing:

* Crime reports
* Road incidents
* Missing persons
* Security warnings
* Community notices

### Filtering

* Distance
* Category
* Date
* Severity

---

## 6.4 Interactive Safety Map

Map displaying:

* Active incidents
* Danger zones
* Safe zones
* Emergency facilities

### Layers

* Crime Layer
* Traffic Layer
* Medical Layer
* Community Layer

---

## 6.5 Nearby Help

Users can discover:

* Hospitals
* Police stations
* Fire services
* Community responders

### Features

* Distance calculation
* Directions
* Contact details
* Availability status

---

## 6.6 Emergency Contacts

Users can add:

* Family members
* Friends
* Guardians

### Emergency Workflow

Upon SOS activation:

* SMS sent
* Push notification sent
* Location shared

---

## 6.7 Anonymous Reporting

Users may choose to:

* Reveal identity
* Remain anonymous

Useful for:

* Whistleblowing
* Crime reporting
* Sensitive incidents

---

## 6.8 Missing Persons Module

### Features

* Create missing person alerts
* Upload photos
* Last seen location
* Community sightings

### Actions

Community members can:

* Share alerts
* Submit sightings
* Contact guardians

---

## 6.9 Community Verification

Reports require validation.

### Verification Sources

* Multiple eyewitness reports
* Trusted volunteers
* Moderators
* Security agencies

### Trust Score

Each report receives:

* Verification score
* Confidence rating

---

## 6.10 Offline Reporting

Designed for low-connectivity regions.

### Features

* Local report storage
* Automatic synchronization
* Offline map caching
* SMS fallback

---

# 7. AI Features

## Threat Detection

AI analyzes:

* Incoming reports
* User-generated content
* Historical patterns

### Outcomes

* Duplicate detection
* Threat classification
* Severity prediction

---

## Smart Alerts

AI determines:

* Who should receive alerts
* Alert priority
* Risk level

---

## Incident Summaries

Automatic generation of:

* Situation reports
* Daily summaries
* Community updates

---

# 8. Gamification

## Community Points

Users earn points for:

* Verified reports
* Volunteer assistance
* Helpful contributions

---

## Badges

Examples:

* First Responder
* Community Hero
* Trusted Reporter
* Safety Advocate

---

# 9. User Roles

## Citizen

* Report incidents
* Receive alerts
* Request help

## Volunteer

* Verify incidents
* Assist victims

## Moderator

* Review reports
* Remove abuse

## Security Agency

* Receive incidents
* Update statuses

## Administrator

* Manage platform
* Manage users
* View analytics

---

# 10. Non-Functional Requirements

## Performance

* App launch < 3 seconds
* Alert delivery < 10 seconds
* Report submission < 5 seconds

## Reliability

* 99.9% uptime target

## Scalability

* Support 10 million users

## Accessibility

* Support low-end Android devices
* Large text options
* Voice reporting

---

# 11. Security Requirements

## Authentication

* Phone Number OTP
* Email Authentication
* Social Login

## Data Protection

* End-to-end encryption
* Secure storage
* GDPR compliance
* NDPA compliance

## Abuse Prevention

* Spam detection
* Fake report detection
* Account suspension

---

# 12. Technical Architecture

## Mobile App

* React Native / Expo

## Backend

* Node.js
* NestJS

## Database

* PostgreSQL

## Real-Time Layer

* Socket.IO

## Notifications

* Firebase Cloud Messaging

## Maps

* Google Maps
* OpenStreetMap

## Cloud

* AWS
* Azure

---

# 13. Analytics Dashboard

Administrators can view:

* Incident heatmaps
* User growth
* Response times
* High-risk areas
* Verification statistics

---

# 14. MVP Scope

## Included

* User Registration
* SOS Button
* Incident Reporting
* Safety Feed
* Safety Map
* Emergency Contacts
* Push Notifications

## Excluded

* AI Threat Detection
* Government Integrations
* Advanced Analytics
* Rewards System

---

# 15. Future Roadmap

## Phase 2

* AI-powered incident analysis
* Missing persons network
* Volunteer responder program

## Phase 3

* Agency integration
* Smart city integrations
* IoT panic devices
* Drone-assisted response

## Phase 4

* Expansion across Africa
* Multilingual support
* Predictive crime intelligence

---

# 16. Success Criteria

The product will be considered successful when:

* 100,000+ users join within the first year.
* Average emergency response time decreases in participating communities.
* 80% of reports are verified successfully.
* User satisfaction exceeds 4.5/5.
* The platform contributes to measurable improvements in public safety.

---

# Tagline

**"See Danger. Share Danger. Save Lives."**
