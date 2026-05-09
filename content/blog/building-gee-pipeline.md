---
title: "Building a Continental-Scale GEE Pipeline"
date: "2026-03-15"
excerpt: "How we extracted 246 features from 5 satellite sources across 1,109 African districts using Google Earth Engine."
tags: ["Technical", "GEE", "Remote Sensing"]
---

One of the most time-consuming parts of our crop yield project was building the feature extraction pipeline. We needed to extract consistent, quality-controlled features from five different satellite and climate data sources across 1,109 districts and up to 42 years.

## The challenge

Each data source has different spatial resolution, temporal coverage, and quality issues:

| Source | Resolution | Temporal | Key challenge |
|--------|-----------|----------|---------------|
| CHIRPS | 5.5 km | 1981-now | Daily → annual aggregation |
| ERA5-Land | 11 km | 1981-now | Unit conversions (K→C, m→mm) |
| MODIS vegetation | 250 m | 2000-now | Cloud masking, cropland filtering |
| MODIS burned area | 500 m | 2000-now | Sparse events |
| Static (SRTM/Soils) | 30-250 m | Fixed | One-time extraction |

## Our approach

We wrote five Google Earth Engine scripts, each handling one data source. Key design decisions:

1. **Block exports**:we split long time series into 4-5 year blocks to stay within GEE memory limits
2. **Quality masking**:MODIS vegetation uses SummaryQA flags and IGBP cropland mask
3. **Consistent reducers**:mean, stdDev, and percentiles (p10, p25, p75, p90) for all continuous variables
4. **Sentinel values**:-9999 for missing data, filtered in Python downstream

## Lessons learned

- GEE's `reduceRegions` is the bottleneck. We had to reduce to 500m scale even for 250m MODIS data
- ERA5-Land band names conflict with reducer suffixes (e.g., `temperature_mean_mean`). We renamed bands to short codes (t1-t19) before reducing
- CHIRPS percentile extraction required a separate script due to memory constraints

All scripts are available in our [repository](https://github.com/beyond-borders-org/crop-yield-prediction/tree/master/scripts/gee).
