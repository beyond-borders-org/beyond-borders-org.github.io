---
title: "Pan-African Crop Yield Prediction"
slug: "african-crop-yield"
status: "published"
tag: "Crop Yield"
venue: "Deep Learning Indaba 2026 (IJCAI)"
authors: "Abdou-Raouf Atarmla"
date: "2026-04-20"
excerpt: "A multimodal benchmark for pan-African crop yield prediction across 1,109 districts, 33 countries, and 42 years."
image: "/images/research/african-crop-yield-banner.png"
highlights:
  - "R² = 0.809 on held-out test set (2019-2022)"
  - "246 features from 6 data sources"
  - "Strictly temporal train/test split"
  - "Full Google Earth Engine extraction pipeline"
github: "https://github.com/beyond-borders-org/african-crop-yield"
demo: ""
paper: ""
---

A multimodal benchmark for pan-African crop yield prediction across 1,109 districts, 33 countries, and 42 years (1981-2022). We combine satellite remote sensing, climate reanalysis, and historical yields into 246 features and evaluate gradient boosting, graph neural networks, and hybrid approaches.

## Key Results

| Model | Features | RMSE (t/ha) | R² |
|-------|----------|-------------|-----|
| **XGBoost + Optuna** | 246 | **0.553** | **0.809** |
| XGBoost + GNN residual | 246 | 0.551 | 0.809 |
| MLP + GAT | Aggregated | 1.020 | ~0.35 |
| History only | 13 | 0.597 | 0.778 |

Per-crop: Maize R²=0.809, Sorghum R²=0.724, Millet R²=0.487.

## Data Sources (246 features)

| Source | Variables | Features | Coverage |
|--------|-----------|----------|----------|
| CHIRPS v2.0 | 7 precip stats | 28 | 1981-present |
| ERA5-Land | 27 climate vars | 108 | 1981-present |
| MODIS MOD13Q1 | 21 vegetation vars | 63 | 2000-present |
| MODIS MCD64A1 | Burned area | 12 | 2000-2022 |
| Static (SRTM/SoilGrids/ESA) | 20 topo/soil/land | 20 | Fixed |
| Yield history | 13 temporal features | 13 | HarvestStat |
| Country encoding | 2 target-encoded | 2 | Training set |

Target: HarvestStat Africa v1.0 (Lee et al., 2025). 22,565 maize district-year observations.

## Methodology

Features are extracted from Google Earth Engine at the district level, aggregated to annual statistics (mean, std, percentiles per growing season), and combined with static topographic, soil, and land cover variables. Historical yield features capture temporal patterns through lag values, rolling means, and trends.

We evaluate three approaches: (1) XGBoost with 246 hand-crafted features and Optuna hyperparameter optimization, (2) a GNN operating on a dual-edge graph connecting districts by geographic proximity and climate similarity, and (3) a hybrid that uses the GNN to model XGBoost residuals.

The temporal split ensures no future information leaks: train on 1981-2015, validate on 2016-2018, test on 2019-2022.

## Temporal Split

- **Train:** 1981-2015 (17,825 samples)
- **Validation:** 2016-2018 (2,061 samples)
- **Test:** 2019-2022 (1,628 samples)

Strictly temporal. No random splitting.
