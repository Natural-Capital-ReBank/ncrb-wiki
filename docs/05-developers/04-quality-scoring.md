---
id: quality-scoring
title: Quality Scoring
---

# Quality Scoring

Every asset submitted to NCRB receives a **programmatic quality score** computed off-chain by the Oracle API and then stored on-chain via `QualityAssessment`. The score drives the asset's rating band, which in turn informs pricing on the marketplace.

---

## Overview

The scoring system is designed to be:

- **Consistent** — same framework across all 10 asset types
- **Aligned with industry standards** — benchmarked against Sylvera, BeZero, ICVCM, and equivalent methodologies per asset class
- **Transparent** — all dimension weights and band thresholds are readable on-chain via `GET /api/quality-profiles/:assetType`
- **Institutional-grade** — mapping directly to rating conventions (AAA → Not Eligible) familiar to ESG procurement teams

---

## Scoring Dimensions

Every asset type uses the same six dimensions, though the specific criteria within each dimension vary by asset class:

| Dimension | Weight | What It Measures |
|---|---|---|
| **Technical Quality** | 25% | Asset-specific quality bands (Sylvera ratings, USDA land classes, ore grades, FSC certification, distinctiveness level) |
| **Additionality** | 20% | Evidence that the environmental benefit would not have occurred without the project (financial additionality, regulatory surplus) |
| **Permanence** | 20% | Long-term durability of the environmental benefit — reversibility risk, guarantee mechanisms, covenant length (100+ years preferred) |
| **Certification Level** | 15% | Rigour of the issuing registry and whether the asset has CCP-Approved or equivalent status |
| **Social Impact** | 12% | Co-benefit certifications: CCB Gold, SDG alignment, Indigenous engagement, community employment |
| **Vintage / Condition** | 8% | Asset age and data freshness — older vintages and stale monitoring data attract discounts |

**Total: 100%**

---

## Composite Score Calculation

```
Score = (TechnicalQuality × 0.25)
      + (Additionality    × 0.20)
      + (Permanence       × 0.20)
      + (CertificationLvl × 0.15)
      + (SocialImpact     × 0.12)
      + (VintageCondition × 0.08)
```

Each dimension is scored 0–100 by the Oracle API based on the parameters submitted with the certificate. The composite score is also 0–100.

---

## Rating Bands

The composite score maps to one of five rating bands:

| Band | Score Range | Description |
|---|---|---|
| **AAA** | 85–100 | Highest integrity — premium pricing |
| **AA** | 75–84 | High quality |
| **A** | 65–74 | Good quality |
| **BBB** | 50–64 | Minimum eligible — compliance-grade pricing |
| **Not Eligible** | < 50 | Below threshold — cannot be tokenized on NCRB |

The minimum score for tokenization is **50 (BBB)**.

---

## Sub-Type Scoring Bonuses

When a certificate's `subType` field (stored in `assetMetadata`) maps to a known sub-type with `affectsScoring: true`, bonus points are added to the raw dimension scores before the composite is calculated. Available sub-types are served by `GET /api/registry-standards/sub-types?asset_type_code={id}`.

**Carbon credits (assetType 0):**

| Sub-type | Additionality bonus | Co-benefits bonus |
|---|---|---|
| `compliance` | +3 | — |
| `removal_dac` | +5 | +3 |
| `removal_beccs` | +4 | +2 |
| `removal_enhanced_weathering` | +3 | — |

**Other asset types:**

| Asset | Sub-type | Dimension | Bonus |
|---|---|---|---|
| Plastic | `ocean_bound` | Co-benefits | +4 |
| Nitrogen | `nitrous_oxide` | Additionality | +3 |
| Agricultural | `regenerative` | Additionality | +3 |
| Phosphorus | `watershed` | Co-benefits | +3 |
| Water | `environmental_flow` | Co-benefits | +4 |
| Mining | `reclaimed` | Co-benefits | +4 |
| Forestry | `natural_forest`, `agroforestry` | Co-benefits | +3 |
| Biodiversity | `wetland` | Co-benefits | +4 |
| Biodiversity | `coastal_marine` | Co-benefits | +3 |

---

## Paris Agreement Article 6.4 Bonuses

For carbon credits (`assetType 0`), three fields in `assetMetadata` trigger additional additionality bonuses. These are set during asset registration and stored as part of the on-chain `assetMetadata` JSON.

| Field | Value | Additionality bonus |
|---|---|---|
| `creditMechanism` | `article_6_4` | +5 |
| `creditMechanism` | `corsia` | +3 |
| `correspondingAdjustment` | `applied` | +2 |
| `correspondingAdjustment` + `loaStatus` | `applied` + `provided` | +1 (stacked on top of the CA bonus) |

**`creditMechanism` values:**

| Value | Description |
|---|---|
| `vcm` | Voluntary Carbon Market (no bonus) |
| `article_6_4` | UN Paris Agreement Article 6.4 mechanism |
| `corsia` | ICAO CORSIA aviation offsetting |
| `cdm_transition` | CDM credits transitioning to Article 6.4 |

**`correspondingAdjustment`** — `applied` means the host country has formally transferred the mitigation outcome to the buyer's NDC, preventing double-counting. This is the key integrity requirement for Article 6.4 compliance.

**`loaStatus`** — `provided` means a Letter of Authorisation from the host country government is on file.

---

## SDG Co-Benefits Bonus

For all asset types, each UN SDG goal listed in `sdgGoals` adds +1 to the co-benefits dimension score, capped at +4. This bonus stacks on top of any sub-type co-benefits bonus.

| SDG goals aligned | Co-benefits bonus |
|---|---|
| 0 | +0 |
| 1 | +1 |
| 2 | +2 |
| 3 | +3 |
| 4 or more | +4 (cap) |

SDG goals are stored as an integer array in `assetMetadata.sdgGoals` (e.g. `[13, 14, 15]`).

---

## Social Impact Premium

The Social Impact dimension (12%) reflects co-benefits that command price premiums from institutional buyers. Corporate buyers including Microsoft, Google, and Meta explicitly require social impact verification in procurement criteria.

| Co-benefit | Typical Price Premium |
|---|---|
| CCB Gold certification | +30–50% |
| SDG alignment (3+ goals) | +20–40% |
| Indigenous community engagement | +40–100% |
| Community employment > 50 FTE | +20–30% |

These premiums are applied on top of the base band price range.

---

## Asset-Specific Technical Quality Criteria

The Technical Quality dimension (25%) is the most asset-specific. Here is how it is applied per asset class:

| Asset Class | Technical Quality Criteria |
|---|---|
| **Carbon Credits** | Sylvera / BeZero rating (minimum BBB); vintage within 5 years; third-party verification |
| **Plastic Credits** | Collection type (ocean-bound > landfill > recycling); geographic provenance tracking |
| **Nitrogen Credits** | Delivery ratio (0–1.0) — fraction of upstream reduction reaching the regulated water body |
| **Phosphorus Credits** | Delivery ratio (0–1.0) — phosphorus binds to sediment, transport dynamics differ from nitrogen |
| **Agricultural Land** | USDA Land Capability Classification: Class I (prime) → Class IV (limited); LESA score |
| **Mining Rights** | Reserve classification (NI 43-101 / JORC / S-K 1300); ore grade (g/t or equivalent) |
| **Water Rights** | Priority date seniority (senior > intermediate > junior); use type (municipal > industrial > agricultural) |
| **Renewable Energy Credits** | Source type; registry tier (APX, WREGIS, M-RETS); state compliance class (Class I > voluntary) |
| **Forestry Rights** | NHLA timber grade (FAS > No. 1 Common); FSC/SFI/ATFS certification level |
| **Biodiversity Credits** | UK Biodiversity Metric 4.0 distinctiveness (D6 Very High → D3 Medium minimum); NatureQuant index |

---

## On-Chain Storage

After the Oracle API computes the score, it writes it to the `QualityAssessment` contract:

```
Oracle API computes score
    │
    ▼
Oracle API calls QualityAssessment.recordAssessment(serialNumber, score, dimensions)
    │
    ▼
Score stored on-chain — immutable and auditable
    │
    ▼
ncrb-indexer reads QualityAssessment events
    │
    ▼
Score available via GET /api/quality-profiles/score/:serialNumber
```

---

## Reading the Methodology

The current dimension weights and band thresholds for any asset type can be queried at runtime:

```bash
# Quality profile (dimensions + weights)
GET /api/quality-profiles/0       # assetType 0 = Carbon Credits

# Rating bands (score ranges + price multipliers)
GET /api/quality-profiles/0/bands

# Full methodology rules
GET /api/quality/methodology
```

The weights stored on-chain in `QualityAssessment` are the authoritative source. The database-side registry standards (`/api/registry-standards/quality-parameters/:registryId/:assetTypeId`) provide the registry-specific parameter definitions used as inputs.

---

## Example: Assessing a Carbon Credit

Quality assessment is triggered automatically when the Oracle processes a `CertificateSubmitted` event. The certificate's `assetMetadata` JSON (stored on-chain) provides the inputs.

**Example `assetMetadata` for a high-scoring Article 6.4 carbon credit:**

```json
{
  "methodology": "VM0015",
  "vintage": 2023,
  "subType": "removal_dac",
  "creditMechanism": "article_6_4",
  "correspondingAdjustment": "applied",
  "loaStatus": "provided",
  "sdgGoals": [7, 13, 14, 15],
  "projectName": "Bangladesh Mangrove Reforestation",
  "country": "BD"
}
```

**Scoring result for this certificate:**

| Dimension | Base score | Bonus | Final |
|---|---|---|---|
| Technical Quality | — | — | ~80 |
| Additionality | ~60 | +5 (Art. 6.4) +2 (CA) +1 (LoA) = **+8** | ~68 |
| Co-benefits | ~60 | +3 (removal_dac sub-type) +4 (4 SDGs) = **+7** | ~67 |
| Certification Level | — | — | ~75 |
| Social Impact | — | — | ~80 |
| Vintage/Condition | — | — | ~72 |

> Bonus points are added to the raw dimension score (capped at 100 per dimension) before the weighted composite is calculated.
