---
title: "Our Deep Learning Indaba 2026 Submission"
date: "2026-04-20"
excerpt: "We submitted our first paper on pan-African crop yield prediction to the AI for Social Impact track at Deep Learning Indaba 2026."
tags: ["Paper", "Crop Yield", "Indaba"]
---

We are excited to announce the submission of our first paper, *Beyond Borders: How Far Can We Predict African Crop Yields?*, to the Deep Learning Indaba 2026 (IJCAI Special Volume), AI for Social Impact track.

## What we built

A multimodal benchmark for pan-African crop yield prediction covering 1,109 districts across 33 countries and 42 years of data (1981-2022). We combined 246 features from six different data sources:

- **CHIRPS v2.0**:precipitation statistics
- **ERA5-Land**:27 climate variables (temperature, radiation, soil moisture, wind)
- **MODIS MOD13Q1**:vegetation indices (NDVI, EVI, LSWI) with quality and cropland masking
- **MODIS MCD64A1**:burned area fraction
- **Static features**:topography (SRTM), soils (SoilGrids), land cover (ESA)
- **Historical yields**:lag values, rolling means, trends from HarvestStat Africa

## Key result

Our best model (XGBoost with Optuna hyperparameter tuning) achieves **R² = 0.809** and **RMSE = 0.553 t/ha** on the held-out test set (2019-2022), using a strictly temporal train/test split.

We also evaluated graph neural networks on a dual-edge graph connecting districts by geographic proximity and climate similarity, but found that an optimized XGBoost leaves no spatially structured residuals for a GNN to exploit.

## What's next

We will present this work at DLI Lagos in August 2026. In the meantime, we are working on an interactive demo and exploring extensions to Sentinel-2 resolution and intra-season prediction.

All code and data are open source on [GitHub](https://github.com/beyond-borders-project).
