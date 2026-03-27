# NCRB Forestry Rights Whitepaper

**Version 1.3 | February 2026**

---

**World Headquarters:** 12 Manomet Point Rd, Suite 293, Manomet, MA 02345-0293, USA | T: +1-781-266-2004
**Americas & Europe:** 32357 Marshall Road, Abbotsford, BC V2T 1A6, Canada | T: +1-604-809-4334
**Asia-Pacific:** House 26, Road 7, Block G, Banani, Dhaka 1213, Bangladesh | T: +880-1703-727060

**Website:** https://ncrb.world | **Email:** info@ncrb.world | **Twitter:** @NCRBPlatform
**LinkedIn:** https://linkedin.com/company/natural-capital-rebank

© 2026 Natural Capital ReBank. All rights reserved.

---

## Abstract

This whitepaper presents Natural Capital ReBank's (NCRB) approach to tokenizing Forestry Rights on blockchain. The global forestry rights market is valued at $800 billion with a 7% CAGR, spanning timber harvesting, sustainable forestry management, REDD+ carbon sequestration, and conservation easements. NCRB's addressable market is $80 billion at a 10% tokenization rate, leveraging FSC, SFI, and REDD+ certification standards to ensure asset integrity and sustainability.

---

## 1. About NCRB

Natural Capital ReBank (NCRB) is a comprehensive blockchain-based platform that tokenizes Natural Capital assets across multiple asset classes. The platform addresses the $10 trillion Natural Capital market opportunity by solving critical pain points: lack of liquidity, opaque pricing, fragmented markets, inconsistent quality standards, and high transaction costs.

Through blockchain technology and industry-aligned assessment frameworks, NCRB delivers:

- **Instant settlement** via on-chain transactions
- **Transparent pricing** via real-time oracles
- **Fractional ownership** through ERC-7943 uRWA tokenization
- **Automated compliance** via smart contract governance
- **Verifiable asset quality** through programmatic scoring

---

## 2. Forestry Rights Market Overview

**Market Size:** $800 billion (2025)

**Growth Rate:** 7% CAGR

**NCRB Addressable Market:** $80 billion (10% tokenization rate)

### 2.1 Sub-Types

- Timber harvesting rights
- Sustainable forestry management rights
- REDD+ (Reducing Emissions from Deforestation) credits
- Forest conservation easements

### 2.2 Supported Registries

- Forest Stewardship Council (FSC)
- Sustainable Forestry Initiative (SFI)
- American Tree Farm System (ATFS)
- State forestry departments

### 2.3 Price Aggregators

- TimberMart-South
- Forest2Market
- Random Lengths (timber pricing)
- Global Forest Watch Commodities

---

## 3. Quality Bands & Pricing

Forestry rights quality is assessed using NHLA lumber grades for timber and FSC/SFI certification tiers for sustainable management:

| Quality Band | Grade/Certification | Description | Price Range (2025) | NCRB Tokenization |
|:---|:---|:---|:---|:---|
| **FAS (Firsts and Seconds)** | NHLA Premium Grade | 83.3%+ clear face, high-value hardwood | $2,000–$5,000/MBF | ✅ Eligible |
| **No. 1 Common** | NHLA Standard Grade | 66.7%+ clear face, standard hardwood | $1,000–$2,500/MBF | ✅ Eligible |
| **FSC Gold** | Certified sustainable | Ecosystem services, biodiversity protection | $3,000–$8,000/acre | ✅ Preferred |
| **FSC Mix / Controlled** | Certified sustainable | Mixed sources, chain of custody verified | $1,500–$4,000/acre | ✅ Eligible |
| **SFI Certified** | Sustainable Forestry Initiative | Third-party audited, sustainable practices | $1,000–$3,500/acre | ✅ Eligible |
| **REDD+ Credits** | Verified carbon sequestration | Deforestation prevention, co-benefits | $5–$20/tCO2e | ✅ Eligible |

---

## 4. Token Issuance Criteria

To qualify for NCRB tokenization, forestry rights must meet all of the following criteria:

- **FSC, SFI, or ATFS certification** required
- **Sustainable harvesting plan** with annual allowable cut (AAC)
- **Title verification** and harvesting rights documentation
- **For REDD+ credits:** Verra VCS or Gold Standard verification
- **Forest inventory data** within 5 years

---

## 5. Quality & Impact Framework

NCRB employs a programmatic quality scoring system (0–100) across six weighted dimensions:

| Dimension | Weight | Key Inputs |
|:---|:---|:---|
| Technical Quality | 25% | FSC/SFI certification tier, lumber grade, forest inventory data |
| Additionality | 20% | Conservation commitment above regulatory baseline |
| Permanence | 20% | Conservation covenant duration, harvesting plan sustainability |
| Certification Level | 15% | FSC/SFI/ATFS certification, REDD+ verification body |
| Social Impact | 12% | Forestry worker employment, Indigenous rights, community benefit |
| Vintage/Condition | 8% | Inventory recency, forest health monitoring data |

### 5.1 Credit Rating Bands

| Score Range | NCRB Band | Industry Alignment | Market Interpretation |
|:---|:---|:---|:---|
| 85–100 | AAA / Premium | FSC Gold, REDD+ Verra VCS, current inventory | Institutional-grade, highest integrity |
| 75–84 | AA / High | FSC Mix/Controlled, SFI certified | High-quality sustainable forestry |
| 65–74 | A / Standard | ATFS certified, basic documentation | Tradable with sustainability review |
| 50–64 | BBB / Review | Limited certification, older inventory | Requires additional due diligence |
| &lt;50 | Not Eligible | Non-certified or unsustainable practices | Not eligible for tokenization |

### 5.2 Biomass Carbon Measurement Methodology

NCRB's Technical Quality scoring for REDD+ and agroforestry credits requires field-validated carbon measurement. The standard three-step process is:

**Step 1 — Field Measurements**

Trained foresters collect per-tree data for each plot:
- DBH (diameter at breast height, measured at 1.3 m)
- Total tree height (H)
- Wood density (ρ) by species
- Species identification and health condition

**Step 2 — Biomass Conversion (Allometric Equation)**

Above-ground biomass (AGB) is calculated using the pan-tropical allometric equation:

```
AGB (kg) = 0.0673 × (ρ × D² × H)^0.976
```

Where ρ = wood density (g/cm³), D = DBH (cm), H = height (m).

**Step 3 — Carbon and CO₂ Conversion**

1. Add below-ground biomass (roots): **~30% of AGB**
2. Multiply total biomass by **0.47** to get carbon stock
3. Multiply carbon stock by **3.67** to convert to CO₂ equivalent (tCO₂e)

**Worked Example — 30-year-old Teak Tree**

| Measurement | Value |
|:---|:---|
| Estimated above-ground biomass | ~680 kg |
| Below-ground biomass (+30%) | ~204 kg |
| Total biomass | ~884 kg |
| Carbon stock (× 0.47) | ~415 kg C |
| CO₂ equivalent (× 3.67) | **~1.52 tCO₂e** |

> A well-grown 30-year-old teak tree typically sequesters approximately 480 kg of carbon — equivalent to **~1.7 tonnes of CO₂ removed** from the atmosphere.

**Why Measurement Accuracy Matters**

Measurement errors have direct financial consequences that affect all parties:

| Error Direction | Impact on Credits | Impact on Revenue |
|:---|:---|:---|
| Overestimation | Inflated credit volume — integrity risk | Regulatory and market reversal exposure |
| Underestimation | Understated credit volume | Lost income for landowners and farmers |

For NCRB tokenization, submitted biomass data must be consistent, credible, and aligned with accepted methodologies (Verra VM0042, VM0007, Gold Standard AMS-I.D or equivalent). Measurement protocols feed directly into the Technical Quality (25%) dimension of the NCRB scoring model.

---

## 6. Standards & Frameworks Alignment

NCRB Forestry Rights are designed for institutional acceptance:

| Framework | Purpose | NCRB Alignment |
|:---|:---|:---|
| **SBTi Forest, Land & Agriculture (FLAG)** | Science-based targets for land use | REDD+ credits eligible for FLAG neutralization |
| **TNFD** | Nature-related financial disclosures | Biodiversity and ecosystem service metrics |
| **Paris Agreement Article 6** | International REDD+ credit integrity | Corresponding adjustments tracked for REDD+ |
| **CSRD E4** | Biodiversity reporting | Ecosystem services, deforestation risk |

---

## 7. SDG/ESG Impact Tracking

NCRB tracks the following impact metrics for forestry rights:

- **Forest Area Protected:** Hectares under sustainable management
- **Carbon Sequestration:** tCO2e per year (for REDD+ credits)
- **Biodiversity:** Habitat quality, species protection level
- **Social Impact:** Forestry employment, Indigenous land rights

**CSRD/TNFD Mapping:** Forestry metrics align with CSRD E4 (Biodiversity) and TNFD Nature Status, Impact, and Risk & Resilience pillars.

---

## 8. Token Economics

**Token Type:** ERC-7943 uRWA (per asset certificate)
**Backing:** 1:1 with verified forestry rights certificate
**Supply:** Minted on governance approval, burned on redemption
**Symbol:** NC-FORESTRY-{ID}

### 8.1 Distribution

| Recipient | Allocation | Vesting |
|:---|:---|:---|
| Asset Owner | 70% | Immediate |
| Registry Partner | 10% | 6-month vesting |
| NCRB Platform | 10% | 12-month vesting |
| Third Party (optional) | 10% | Configurable |

### 8.2 Fee Structure

| Fee Type | Amount |
|:---|:---|
| Trading fees | 2.5% of transaction value |
| Insurance fees | 1.5% annually |
| NCRB Treasury | 1.0% of asset |

### 8.3 BaaS Service
- BaaS licensing: $50K–$200K for institutional partners

---

## 9. Buyer Workflow

1. **Review Forest Certification** — Assess FSC/SFI certification and forest inventory reports
2. **Select Right Type** — Choose timber rights, management rights, or REDD+ credits
3. **Review Documentation** — Access certification records, harvesting plans, REDD+ verification
4. **Acquire Tokens** — On-chain purchase with fractional ownership of forestry rights certificate
5. **Generate Reports** — Export CSRD E4, TNFD, and SBTi FLAG compliance packages

---

## 10. Legal Disclaimer

This document is for informational purposes only and does not constitute financial, investment, or legal advice. Natural Capital ReBank makes no representations or warranties regarding the accuracy or completeness of the information contained herein. Participation in NCRB markets is subject to applicable laws and regulations in the user's jurisdiction.

---

*© 2026 Natural Capital ReBank. All rights reserved. | https://ncrb.world*
