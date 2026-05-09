---
title: "A child is breathing too fast. Can you count precisely enough to know?"
slug: "nafs"
status: "in-progress"
tag: "AI & Health"
venue: "Hackathon National IA & Santé Sans Réseau — 1st place"
authors: "Abdou-Raouf Atarmla, Séfako Débora Fandjinou"
date: "2026-05-01"
excerpt: "In rural Morocco, diagnosing pneumonia in a child comes down to counting breaths by eye for 60 seconds. The literature shows this is harder than it sounds. NAFS won a national hackathon for automating it, offline, on a regular smartphone. A pilot is now underway."
highlights:
  - "Respiratory rate measured automatically from 30 seconds of chest video"
  - "Cough audio classified by a lightweight CNN trained on COUGHVID and Coswara"
  - "Fully offline, runs on smartphone or shared Raspberry Pi via local WiFi"
  - "Aligned to WHO IMCI thresholds, designed as a decision support tool, not a diagnosis"
  - "First place at the National Hackathon for AI in Disconnected Healthcare Settings"
github: ""
demo: ""
paper: ""
---

Pneumonia kills around 944,000 children under five every year. Sixty percent of those deaths happen in ten countries across South Asia and sub-Saharan Africa, places where a child with a cough is seen not by a doctor but by a community health worker, in a clinic with no specialist, no oximeter, and often no internet connection.

The WHO's IMCI protocol gives that health worker a clear decision rule: count the child's breaths for 60 seconds. If the rate exceeds the threshold for the age group, suspect pneumonia and act accordingly. The thresholds are 60 breaths per minute for infants under two months, 50 for infants up to eleven months, 40 for children up to five years.

It is the most widely used pediatric triage tool in the world. And a multicenter study across four countries found that every single device designed to help perform it showed only moderate agreement with an automated reference standard, with mean deviations reaching 5.5 breaths per minute.

That gap is not about negligence. Counting a breathing rate by eye, on an infant who may be crying or agitated, over a full minute, in a busy clinic, is genuinely hard. The error feeds directly into two opposite failures: children with severe pneumonia sent home, and healthy children evacuated to already overwhelmed hospitals.

---

NAFS was built to close that gap without adding complexity to a health worker's already difficult job.

The name means breath in Arabic. The tool runs on a regular smartphone, requires no network connection, and asks for two things: thirty seconds of video pointed at the child's chest, and a recording of the cough. From the video, an optical flow pipeline extracts the respiratory movement, identifies the dominant frequency, and checks it against the IMCI threshold for the child's age. From the audio, a lightweight convolutional network trained on COUGHVID and Coswara classifies the cough signature: productive or dry, with or without wheezing, with or without signs of distress.

The system outputs one of three categories: normal, suspect, or urgent. A timestamped PDF report is generated locally, stored in encrypted form, and synchronized automatically when connectivity returns, so the supervising physician can review what happened in the field.

For clinics that serve multiple health workers, NAFS can run on a shared Raspberry Pi accessed via local WiFi, keeping cost per worker low without compromising the offline constraint.

Every classification comes with the rules that triggered it. No black box.

---

There are things NAFS cannot do, and the design makes this explicit. It does not detect malaria, meningitis, or oxygen saturation. A negative result does not mean a child is safe. The tool is built to alert, not to reassure, and the final decision always belongs to the person in the room.

This is a deliberate position, not a limitation we are trying to fix. The goal is not to replace clinical judgment in environments where clinical judgment is already stretched thin. It is to give the health worker a reliable measurement for the one criterion the WHO already asks them to apply.

---

NAFS was awarded first place at the National Hackathon for AI in Disconnected Healthcare Settings in April 2026, submitted jointly with Séfako Débora Fandjinou, a fifth-year medical student at the Faculty of Medicine and Pharmacy in Rabat, who co-designed the clinical protocol and the triage classification framework.

A pilot in rural Morocco is now in preparation.

---

*NAFS is a Beyond Borders project. Medical lead: Séfako Débora Fandjinou, FMP Rabat. Engineering lead: Abdou-Raouf Atarmla, INPT Rabat.*