---
title: "Can JEPA Capture Tonal Structure Better Than Discrete SSL Models for African Languages?"
slug: "jali"
status: "exploring"
tag: "Speech & NLP"
venue: "Deep Learning Indaba 2026"
authors: "Abdou-Raouf Atarmla"
date: ""
excerpt: "JALI (JEPA for African Linguistic Intelligence) investigates whether latent prediction preserves tonal information better than discrete self-supervised models for African languages. Named after the Jali (griot), keeper of oral tradition in West Africa."
highlights:
  - "Central question: does JEPA preserve tone better than HuBERT/MMS discrete units?"
  - "Tonal Evaluation Rate (TER) as primary metric alongside WER/CER"
  - "Tone-aware masking strategy aligned with pitch contours"
  - "Three-layer research program: benchmark → probing → architecture"
github: ""
demo: ""
paper: ""
---

## Research Question

**Can latent prediction (JEPA) capture tonal structure better than discrete self-supervised models for African languages?**

Current SSL models (Wav2Vec 2.0, HuBERT, MMS) learn discrete units via k-means quantization of speech representations. Recent work shows these discrete units lose tonal information: pitch contours that carry lexical meaning in languages like Yoruba, Ewe, Kabiye, and Igbo are compressed away during quantization. This is a structural limitation, not a data limitation.

Audio-JEPA predicts latent representations directly (no quantization), which *could* preserve continuous pitch information. JALI tests this hypothesis rigorously on African tonal languages.

The name: *Jali* (also written Djeli) is the Mandinka word for griot, the traditional oral historian and storyteller in West African culture.

## Positioning: What Already Exists

JALI does not claim to be the first African speech model. The landscape is already active:

- **MMS** (Meta, 2023): 1,406 languages in pre-training, 1,107 in ASR. Massive scale, but trained predominantly on religious text readings (narrow domain).
- **AfriHuBERT** (2024): 1,226 African languages/dialects, 10,000+ hours. Strongest African SSL baseline.
- **Whisper** (OpenAI, 2023): Supervised multilingual ASR, weak on low-resource African languages.
- **FLEURS** (Google, 2022): Benchmark covering 20+ African languages, but WER-only evaluation.

**What's missing**: No existing model or benchmark specifically measures *tonal preservation* in SSL representations. WER conflates lexical, phonological, and tonal errors. The community lacks a tonal evaluation protocol.

## Three-Layer Research Program

### Layer 1: Tonal Benchmark (the foundation)

A standardized evaluation protocol for tonal African languages:

- **Languages**: Yoruba, Ewe, Kabiye, Igbo (4 tonal systems: register, terraced, complex)
- **Metrics**: WER + CER + Frame Error Rate (FER) + **Tonal Error Rate (TER)**
- **TER definition**: percentage of tone-bearing segments where the predicted tone (H/L/M/R/F) differs from reference, following recent work on tonal ASR evaluation
- **Baselines**: MMS, AfriHuBERT, HuBERT, Wav2Vec 2.0, Whisper, all evaluated under identical conditions
- **Data splits**: 1h / 5h / 10h labeled fine-tuning to test label efficiency

This layer has standalone value regardless of JALI's architecture results.

### Layer 2: Representation Probing (the science)

Systematic comparison of what SSL representations actually encode:

- **Models probed**: Audio-JEPA vs HuBERT vs MMS vs AfriHuBERT
- **Probing tasks**:
  - Tone classification (H/L/M/R/F per syllable)
  - Pitch contour regression (F0 trajectory from frozen representations)
  - Phoneme discrimination (minimal tonal pairs: Yoruba *ọkọ* H-H vs *ọkọ* L-H)
  - Code-switching detection (language boundary in mixed utterances)
- **Analysis**: Layer-wise probing to identify where tonal information lives (or dies) in each architecture

This answers the central question empirically: *does latent prediction retain more tonal signal than discrete quantization?*

### Layer 3: Architecture Innovation (the contribution)

If probing confirms JEPA advantages, introduce targeted improvements:

- **Tone-aware masking**: Mask spectrogram patches aligned with pitch contours rather than random time segments. Forces the predictor to reconstruct tonal transitions, not just spectral content.
- **Hierarchical encoding**: Local phoneme/tonal encoder + global morpho-syllabic representation. Critical for agglutinative Bantu languages where morphological boundaries carry tonal patterns.
- **Family-conditioned predictor**: Condition the JEPA predictor on language family (Niger-Congo A, Niger-Congo B, Afroasiatic, Nilo-Saharan) to generalize across related languages.
- **Cross-language masking**: Mask spans that cross code-switching boundaries, forcing the model to learn language-invariant representations at switch points.

## Data Strategy

### Unlabeled (pre-training)

No transcription needed. Sources:
- Online radio streams: BBC Hausa, RFI Afrique Yoruba/Swahili, national broadcasters (Togo, Nigeria, Ghana, Kenya)
- Podcasts in African languages (growing rapidly)
- Existing corpora: CMU Wilderness, Bible.is audio (same domain as MMS, useful for controlled comparison)

Target: 1,000-2,000 hours across 20+ languages. Curation (removing music, ads, silence) is the main bottleneck.

### Labeled (fine-tuning & evaluation)

Small but clean. Quality matters more than quantity:
- **CommonVoice**: Kinyarwanda (2,000h), Kabiye (50h+), Luganda, Yoruba
- **FLEURS**: 20+ African languages, ~10h each, read speech
- **BABEL**: Igbo, Hausa, Amharic (conversational speech)
- **AfriSpeech**: 200h accented English (useful for code-switching evaluation)
- **Custom annotation**: For TER evaluation, we need explicit tone annotation on a small subset (~2-5h per language). Can leverage linguistic fieldwork resources and Praat forced alignment with tone tier.

## Experimental Protocol

| Experiment | Question | Models | Metrics |
|-----------|----------|--------|---------|
| Baseline comparison | How do existing SSL models perform on tonal languages? | MMS, AfriHuBERT, HuBERT, Whisper | WER, CER, TER |
| Representation probing | Where is tone encoded (or lost)? | Audio-JEPA vs HuBERT vs MMS | Probe accuracy per layer |
| Label efficiency | How much labeled data is needed? | All models, 1h/5h/10h fine-tuning | WER, TER curves |
| Tone-aware masking | Does pitch-aligned masking help? | JALI vs vanilla Audio-JEPA | TER improvement |
| Cross-lingual transfer | Does family conditioning generalize? | JALI with/without family conditioning | Zero-shot TER on held-out languages |

## Feasibility

- **Compute**: Audio-JEPA pre-training on ~1,000h is feasible on 4-8 GPUs in ~1 week. Probing experiments are lightweight.
- **Data**: Radio audio is free and abundant. The bottleneck is tone annotation for evaluation (~2-5h per language, requires linguists).
- **Risk mitigation**: Even if JEPA shows no tonal advantage, Layers 1-2 (benchmark + probing study) are publishable standalone contributions.
- **Community**: Masakhane NLP, DSFSI (U. Pretoria), Lacuna Fund, active communities with African language expertise and datasets.

## Why This Matters Either Way

If JEPA preserves tone better → architectural contribution: latent prediction is the right paradigm for tonal languages. Directly actionable for ASR, language preservation, speech-based applications.

If JEPA does NOT preserve tone better → equally valuable: proves that the discrete vs. latent distinction is not the bottleneck, redirecting research toward other solutions (explicit pitch features, multi-task learning, etc.). The benchmark and probing methodology remain useful infrastructure.

## Key References

- Audio-JEPA (Barrault et al., 2025). JEPA for speech, English-focused, comparable to wav2vec 2.0 with 5x less data.
- MMS (Pratap et al., Meta 2023). 1,406-language SSL, religious text domain.
- AfriHuBERT (2024). 1,226 African languages/dialects, 10,000+ hours.
- Wav2Vec 2.0 (Baevski et al., NeurIPS 2020). Contrastive speech SSL.
- HuBERT (Hsu et al., 2021). Discrete unit prediction SSL.
- Whisper (Radford et al., OpenAI 2023). Supervised multilingual ASR.
- Tonal information loss in discrete SSL units. k-means quantization drops pitch (Yoruba, Mandarin studies).
- Tonal Error Rate for African ASR evaluation. Explicit tonal metric beyond WER.
- FLEURS (Google, 2022). Multilingual speech benchmark.
- Masakhane NLP. Grassroots African NLP community.
- Lacuna Fund. Community-curated African language datasets.
