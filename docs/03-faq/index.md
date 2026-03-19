---
id: faq
title: Frequently Asked Questions
---

# Frequently Asked Questions

Have questions about NCRB or the asset classes on the platform? Browse the FAQs below.

---

## Asset Class FAQs

Each FAQ covers: what the asset is, how it works on NCRB, supported registries and standards, quality rating bands, price ranges, tokenization requirements, and fee structure.

| # | Asset Class | Market Size | Growth | FAQ |
|---|---|---|---|---|
| 1 | **Carbon Credits** | $850B | 15% CAGR | [Read FAQ](./carbon-credits) |
| 2 | **Plastic Credits** | $150B | 25% CAGR | [Read FAQ](./plastic-credits) |
| 3 | **Nitrogen Credits** | $80B | 18% CAGR | [Read FAQ](./nitrogen-credits) |
| 4 | **Phosphorus Credits** | $60B | 16% CAGR | [Read FAQ](./phosphorus-credits) |
| 5 | **Agricultural Land** | $12T | 5% CAGR | [Read FAQ](./agricultural-land) |
| 6 | **Mining Rights** | $1.5T | 6% CAGR | [Read FAQ](./mining-rights) |
| 7 | **Water Rights** | $350B | 8% CAGR | [Read FAQ](./water-rights) |
| 8 | **Renewable Energy Credits** | $200B | 12% CAGR | [Read FAQ](./renewable-energy-credits) |
| 9 | **Forestry Rights** | $800B | 7% CAGR | [Read FAQ](./forestry-rights) |
| 10 | **Biodiversity Credits** | $600B | 20% CAGR | [Read FAQ](./biodiversity-credits) |

> Total addressable market across all asset classes: **US $16.5 trillion**.

---

## General Platform Questions

### What blockchains does NCRB support?

NCRB is deployed on three EVM-compatible networks: **Avalanche**, **Ethereum**, and **XRPL EVM**. All asset tokens are issued simultaneously across all three chains, giving you redundancy and chain choice.

### What token standard do NCRB tokens use?

All NCRB tokens use **ERC-7943 (uRWA)** — the emerging standard for Utility Real-World Assets on EVM chains. It is ERC-20 compatible (works with any wallet or DeFi protocol) and adds on-chain compliance checks, transfer restrictions for verified-only participants, and a compliance role for regulatory recovery.

### What is the quality score?

Every asset submitted to NCRB receives a programmatic quality score from 0 to 100 across six weighted dimensions: Technical Quality (25%), Additionality (20%), Permanence (20%), Certification Level (15%), Social Impact (12%), and Vintage/Condition (8%). Scores map to rating bands from **AAA** (highest) to **Not Eligible**.

### What are the platform fees?

- **Trading fee:** 2.5% per marketplace transaction
- **AUM fee:** 1.5% annually on held tokens
- **BaaS licensing:** $50,000–$200,000 for registry partners integrating via Blockchain-as-a-Service

### How does token revenue get distributed?

By default, proceeds from token sales are distributed atomically at point of sale: **70% to the asset owner**, **10% to the registry partner**, **10% to NCRB**, and **10% to any third-party aggregator or referrer**. Distribution percentages are configurable at the time of submission.

### How is double-counting prevented?

Retiring a credit on NCRB **permanently burns the token** — it cannot be re-transferred, re-sold, or re-used. The **BuyerClaimsRegistry** smart contract records each retirement against the buyer's wallet address, the standard claimed, and a timestamp. The **ComplianceRegistry** and **StandardsRegistry** ensure each certificate maps to exactly one underlying asset and cannot be submitted twice.

### How do I get started?

- **Registry partners:** [Contact us](https://ncrb.world) to discuss partnership agreements and technical integration. Existing registered registries can be live within hours of governance approval.
- **Buyers:** Visit the [NCRB Marketplace](https://www.ncrb.world/coming-soon) to browse available credits. Our team can match you to the right asset type, quality band, and standard for your compliance or sustainability needs.
