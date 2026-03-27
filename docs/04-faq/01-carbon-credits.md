---
id: carbon-credits
title: Carbon Credits FAQ
---

# Carbon Credits — Frequently Asked Questions

## What are carbon credits?

A carbon credit represents one tonne of CO₂ equivalent (tCO₂e) that has been reduced, removed, or avoided from the atmosphere. They are issued by verified projects — such as reforestation, renewable energy, or methane capture — and purchased by companies to offset their greenhouse gas emissions.

Carbon credits are the largest and most established market within the natural capital asset universe, with a current market size of **$850 billion** and a 15% annual growth rate.

---

## Why tokenize carbon credits on blockchain?

Traditional carbon credit markets suffer from:
- Settlement delays of 30–90 days through brokers
- Opaque and inconsistent pricing across different registries
- Risk of double-counting (the same credit sold to two buyers)
- High minimum transaction sizes that exclude smaller buyers

NCRB solves all of these by issuing each carbon credit as an **ERC-7943 uRWA token** (symbol: `NC-CARBON-{ID}`) with 1:1 backing. Settlement is instant via smart contract escrow, pricing is transparent through the real-time oracle, and retirement permanently burns the token on-chain — making double-counting cryptographically impossible.

---

## Which registries and standards does NCRB support?

| Registry | Standards |
|---|---|
| **Verra** | Verified Carbon Standard (VCS), Climate, Community & Biodiversity (CCB), SD VISta |
| **Gold Standard** | GS4GG (carbon + SDG impact) |
| **American Carbon Registry (ACR)** | ACR Standard |
| **Climate Action Reserve (CAR)** | CAR Protocol |

---

## How is credit quality assessed?

Every carbon credit submitted to NCRB receives a programmatic quality score (0–100) across six dimensions:

| Dimension | Weight |
|---|---|
| Technical Quality | 25% |
| Additionality | 20% |
| Permanence | 20% |
| Certification Level | 15% |
| Social Impact | 12% |
| Vintage / Condition | 8% |

Scores are benchmarked against **Sylvera** and **BeZero** institutional ratings — if your team already uses those, NCRB ratings map directly.

---

## What are the rating bands and price ranges?

| Band | Score | Typical Price |
|---|---|---|
| **AAA — Premium** | 85–100 | $15–$30 / tCO₂e |
| **AA — High Quality** | 75–84 | $10–$20 / tCO₂e |
| **A — Good** | 65–74 | $5–$15 / tCO₂e |
| **BBB — Compliance Grade** | 50–64 | $50–$90 / tCO₂e (compliance markets) |
| **Not Eligible** | < 50 | — |

> Social co-benefits (CCB Gold, SDG alignment, Indigenous engagement) can command **30–100% price premiums** above base rates.

---

## What are the minimum requirements to tokenize a carbon credit?

- Minimum **BBB rating** from Sylvera or BeZero (or equivalent internal assessment)
- Vintage within the last **5 years**
- Third-party verification by an accredited auditor
- Issued by a supported registry (Verra, Gold Standard, ACR, CAR)

---

## How is token revenue distributed?

| Recipient | Share |
|---|---|
| Asset Owner | 70% |
| Registry Partner | 10% |
| NCRB Platform | 10% |
| Third Party (aggregator / referrer) | 10% |

---

## What fees apply?

- **Trading fees:** 2.5% of transaction value
- **Insurance fees:** 1.5% annually
- **NCRB Treasury:** 1.0% of asset
- **BaaS Licensing:** Institutional rates available for quotation

---

## What compliance frameworks are supported?

Carbon credits on NCRB are aligned with:
- **Paris Agreement — Article 6** (corresponding adjustments tracked on-chain — see below)
- **ICVCM Core Carbon Principles (CCP)** — gold standard for carbon integrity
- **SBTi Net-Zero Standard** — BVCM and residual emission neutralisation
- **ISO 14064-1/2/3** — GHG quantification and verification
- **VCMI Claims Code of Practice** — Silver, Gold, and Platinum buyer claims
- **CSRD E1** — climate disclosure integration

## What is Paris Agreement Article 6.4 support?

Article 6.4 is the UN-supervised international carbon crediting mechanism established under the Paris Agreement. Credits issued under Article 6.4 carry a "corresponding adjustment" — the host country formally transfers the mitigation outcome to the buyer's account, preventing it from being counted twice (once toward the host country's NDC and once toward the buyer's corporate claim).

NCRB tracks three Article 6.4 fields per certificate, set during registration:

| Field | Values | Meaning |
|---|---|---|
| **Credit Mechanism** | `vcm`, `article_6_4`, `corsia`, `cdm_transition` | Which crediting mechanism issued the credit |
| **Corresponding Adjustment** | `applied`, `not_applicable` | Whether the host country has formally transferred the mitigation outcome |
| **Letter of Authorisation (LoA)** | `provided`, `pending` | Whether a government LoA is on file |

These fields are stored on-chain in the certificate's `assetMetadata` and affect the quality score:

- `article_6_4` mechanism → **+5 additionality**
- `corsia` mechanism → **+3 additionality**
- Corresponding adjustment `applied` → **+2 additionality**
- CA `applied` + LoA `provided` → **+1 additional** (stacked)

On marketplace listing cards, Article 6.4 credits display a green **CA** badge and an **Art. 6.4** mechanism pill. Buyers purchasing Article 6.4 credits with a corresponding adjustment applied can make stronger Paris-aligned claims in their ESG and VCMI reporting.

---

## How do I retire a carbon credit?

Retiring a credit on NCRB permanently burns the token on-chain. The **BuyerClaimsRegistry** contract records the retirement against your wallet address, the standard claimed (e.g. VCS, GS4GG), and a timestamp — creating an auditable, permanent claim record aligned with VCMI and SBTi buyer-claim requirements.
