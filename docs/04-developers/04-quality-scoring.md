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

**POST /api/quality/assess**

```json
{
  "serialNumber": "VCS-2024-001-001",
  "assetType": 0,
  "network": "fuji",
  "parameters": {
    "vintage": 2022,
    "methodology": "VM0015",
    "registry": "verra",
    "sylveraRating": "A",
    "additionality": "financial",
    "permanenceGuarantee": "buffer_pool",
    "certificationLevel": "CCP_approved",
    "cobenefits": ["CCB_GOLD", "SDG_13", "SDG_15"],
    "indigenousEngagement": true
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "serialNumber": "VCS-2024-001-001",
    "score": 84,
    "band": "AA",
    "dimensions": {
      "technicalQuality": 85,
      "additionality": 80,
      "permanence": 88,
      "certificationLevel": 90,
      "socialImpact": 95,
      "vintageCondition": 60
    },
    "priceRange": {
      "min": 10,
      "max": 20,
      "unit": "USD/tCO2e",
      "premiumApplied": true,
      "premiumReason": "CCB Gold + Indigenous engagement"
    }
  }
}
```
