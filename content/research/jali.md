---
title: "What if your speech model has never heard tone?"
slug: "jali"
status: "prior-art"
tag: "Speech & NLP"
venue: ""
authors: "Abdou-Raouf Atarmla"
date: "2026-05-01"
excerpt: "Hundreds of millions of people speak tonal African languages. Every major speech model ignores the one signal that makes them work: the pitch. JALI is our attempt to fix that, from first principles."
highlights:
  - "Tonal African languages: tone is lexical, not prosodic. A structural problem, not a data problem."
  - "Existing SSL models (HuBERT, MMS, wav2vec 2.0) discard pitch implicitly through quantization"
  - "JALI proposes a dual-branch architecture that treats F0 as a first-class signal"
  - "Full prior architectural specification published, see link below"
github: ""
demo: ""
paper: ""
---

## The word is the same. The meaning is not.

In Yoruba, the sequence *ọkọ* can mean husband, canoe, or hoe depending entirely on the tones assigned to its syllables. Not the vowels. Not the consonants. The pitch.

This is not an edge case. It is how the language works. The same is true for Ewe, Twi, Igbo, Kabiye, Lingala, and dozens of other African languages spoken by hundreds of millions of people. Tone is not decoration. It is grammar.

Now consider what happens when you run one of these languages through HuBERT, MMS, or wav2vec 2.0.

## What every major speech model quietly discards

State-of-the-art self-supervised speech models learn representations by clustering raw audio into discrete units, through k-means quantization of waveform embeddings. The idea is elegant: no labels needed, just structure learned from the signal itself.

The problem is that quantization compresses continuous pitch trajectories into the nearest cluster centroid. High tone, mid tone, low tone: different words, same cluster. The information is gone before any downstream model ever sees it.

This is not a data limitation. African languages are not underrepresented because there is not enough audio. They are structurally misrepresented because the architecture was never designed to carry the signal that makes them work.

A model trained on English intonation, where pitch conveys emotion rather than meaning, will never learn to treat F0 as a first-class lexical signal. It has no reason to.

## The question

Can a speech model be designed, from first principles, to preserve tonal structure as a core architectural commitment and not as an afterthought?

This is what JALI investigates.

The name is deliberate. *Jali* (also written *Djeli*) is the Mandinka word for griot, the keeper of oral memory and the transmitter of language across generations in West African tradition. A model that erases tone erases meaning. JALI is an attempt to build one that does not.

## What we designed

We approached the problem architecturally. Rather than fine-tuning an existing model that was never built for tone, we specified an encoder that treats fundamental frequency (F0) as a parallel signal: extracted, normalised, and processed alongside the raw waveform through a dedicated branch, then fused into a joint representation trained via a JEPA-style predictive objective.

The goal is representations where knowing the encoder output tells you more about the tones in an utterance than HuBERT or MMS would. Measurably, verifiably, with a formal evaluation protocol that does not yet exist for African tonal languages.

We are not claiming to have trained this model. We are claiming to have specified it precisely, with formal guarantees, ablations, and an evaluation suite designed to answer the question honestly either way.

If the architecture works, it is an actionable contribution to African language technology. If it does not, it tells the community where to look next. Both outcomes are useful.

## Read the full specification

The complete prior architectural document is available here:

**[JALI: Prior Architectural Document](#)** *(Soon available for public)*

---

*JALI is part of the Beyond Borders research initiative.*