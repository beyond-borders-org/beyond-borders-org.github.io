---
title: "Rule-State Inference: A Bayesian Framework for Compliance Monitoring"
slug: "rule-state-inference"
status: "published"
tag: "Bayesian AI"
venue: "arXiv 2026"
authors: "Abdou-Raouf Atarmla"
date: "2026-03-23"
excerpt: "A novel Bayesian framework that inverts the standard ML paradigm: treating authoritative rules as structured priors to infer latent compliance states from partial, noisy observations."
highlights:
  - "Novel formulation: rules as priors, compliance as latent state"
  - "O(1) regulatory change absorption (no retraining)"
  - "AUC 0.859 on Togolese fiscal compliance benchmark"
  - "Domain-agnostic: tax, health protocols, AML, environmental regulation"
github: "https://github.com/fless-lab/rsi-framework"
demo: ""
paper: "https://arxiv.org/abs/2603.21610"
---

Rule-State Inference (RSI) inverts the standard machine learning approach to compliance monitoring. Where traditional ML learns rules from labeled data, RSI treats authoritative rules as known priors and infers the latent compliance state of entities from partial, noisy observations.

## The Problem

Compliance monitoring in rule-governed domains (taxation, healthcare, finance) faces a fundamental tension: rules are known and authoritative, but compliance is unobserved. Standard ML approaches require labeled data (which entity is compliant?) that is expensive or impossible to obtain at scale. They also break when regulations change, requiring full retraining.

## Approach

RSI formalizes compliance monitoring as Bayesian posterior inference over a structured latent space **S = {(a_i, c_i, delta_i)}** where:

- **a_i**: rule activation (is this rule applicable?)
- **c_i**: compliance rate (what fraction comply?)
- **delta_i**: parametric drift (has the rule changed?)

The framework operates at two levels:
1. **Population-level**: calibrated uncertainty estimates with Bernstein-von Mises consistency guarantees
2. **Entity-level**: deterministic scoring for flagging non-compliant entities without labeled data

## Key Properties

- **O(1) adaptation**: Regulatory changes are absorbed via prior ratio correction, not retraining. Sub-millisecond update vs. 683-1082ms for retrained baselines (500,000x speedup).
- **Missing data robustness**: At 50% missing observations, RSI maintains +0.25-0.37 F1 advantage over baselines.
- **Theoretical guarantees**: Posterior consistency (T2) and monotonic ELBO convergence (T3).

## Results

Evaluated on RSI-Togo-Fiscal-Synthetic v2.0: 2,000 synthetic enterprises, 8 fiscal rules grounded in real OTR (Office Togolais des Recettes) regulatory rules 2022-2025.

| Metric | RSI | Rule-based baseline |
|--------|-----|-------------------|
| Mean F1 | 0.741 | 0.700 |
| Mean AUC | 0.859 | N/A |
| Reg. change time | < 1ms | 683-1082ms |

## Why It Matters

RSI is domain-agnostic. Any domain with authoritative rules and partial observations is a candidate: tax compliance, medical protocol adherence, anti-money laundering, environmental regulation. The framework is lightweight (numpy/scipy) and suitable for deployment in resource-constrained settings.
