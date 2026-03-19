---
id: intro
slug: /intro
title: About NCRB
---

# Welcome to Natural Capital ReBank

**Natural Capital ReBank (NCRB)** is a blockchain-powered platform that tokenizes Real-World Assets (RWA), starting with environmental credits and expanding to a comprehensive suite of natural capital asset classes. NCRB creates transparent, liquid, and accessible markets for assets that have historically been opaque, illiquid, and difficult to trade.

---

## The Problem

The global natural capital market represents a **$10+ trillion opportunity**, yet it is held back by structural barriers:

- **$200 billion annual financing gap** in ecosystem services
- Settlement times measured in **weeks to months** rather than seconds
- Opaque and inconsistent pricing across fragmented registries
- High transaction costs that exclude fractional and smaller investors
- No standardized quality scoring — buyers cannot easily compare assets across registries

---

## The NCRB Solution

NCRB transforms environmental assets into measurable, tradeable digital instruments on-chain:

| Capability | What It Delivers |
|---|---|
| **Instant settlement** | Smart contract escrow — no 30–90 day brokerage delays |
| **Transparent pricing** | Real-time oracle aggregating multiple independent data sources |
| **Fractional ownership** | Lower minimum investment; wider market access |
| **Programmatic quality scoring** | 0–100 score aligned with Sylvera, BeZero, and ICVCM methodologies |
| **Verifiable compliance** | On-chain retirement, buyer claims registry, and double-count prevention |
| **Multi-chain deployment** | Avalanche, Ethereum, and XRPL EVM — redundancy and chain choice |

---

## Mission & Vision

**Mission:** Bridge the natural capital financing gap while providing transparent, liquid markets for environmental assets.

**Vision:** Become the global infrastructure layer for Real-World Asset tokenization — starting with natural capital and expanding to all forms of verified environmental and social impact.

---

## Supported Asset Classes

NCRB currently supports **10 natural capital asset classes**:

| # | Asset Class | Example Registries |
|---|---|---|
| 1 | **Carbon Credits** | Verra VCS, Gold Standard GS4GG |
| 2 | **Plastic Credits** | Plastic Bank, Verra Plastic |
| 3 | **Nitrogen Credits** | Nutrient trading programmes |
| 4 | **Phosphorus Credits** | Watershed nutrient offset schemes |
| 5 | **Biodiversity Credits** | Plan Vivo, biodiversity net-gain schemes |
| 6 | **Water Rights** | Riparian and market-based water entitlements |
| 7 | **Agricultural Land** | Sustainable land use and soil carbon |
| 8 | **Renewable Energy Credits (RECs)** | I-REC, TIGR, regional REC schemes |
| 9 | **Forestry Rights** | REDD+, FSC-certified forestry |
| 10 | **Mining Rights** | Responsible mineral extraction entitlements |

> Total addressable market across these asset classes: **US $16.5 trillion**. NCRB's Year 5 target: $15 billion in tokenized assets on-chain.

---

## Technology

### Multi-Chain Smart Contracts

NCRB is deployed simultaneously on three EVM-compatible networks:

- **Avalanche (C-Chain / Fuji testnet)**
- **Ethereum (Mainnet / Sepolia testnet)**
- **XRPL EVM (Mainnet / Testnet)**

The core contract suite includes: AccountManager, AssetRegistry, RWAToken, MultiSigGovernance, QualityAssessment, RWAPriceOracle, StandardsRegistry, ComplianceRegistry, BuyerClaimsRegistry, and RWAMarketplace.

### ERC-7943 (uRWA Token Standard)

NCRB tokens are built on **ERC-7943**, the emerging standard for Utility Real-World Assets on Ethereum-compatible chains:

| Feature | What It Means |
|---|---|
| **Transfer restrictions** (`canTransfer` / `canTransact`) | Only verified, compliant accounts can hold or trade credits |
| **Forced transfer & frozen tokens** (`COMPLIANCE_ROLE`) | Regulatory recovery for fraud or erroneous issuance |
| **ERC-20 compatibility** | Works with any wallet, DeFi protocol, or custody infrastructure |
| **On-chain pre-flight checks** | Every trade is compliance-checked before execution |

### Price Oracle

The `RWAPriceOracle` contract aggregates pricing from multiple independent sources (CoinGecko, GeckoTerminal, Toucan, and generic HTTP endpoints) with confidence scoring and outlier detection. This prevents price manipulation and ensures valuations reflect real market conditions.

### Double-Count Prevention

NCRB enforces credit integrity at every layer:

- **On-chain retirement** permanently burns the token — it cannot be re-transferred or re-used
- **BuyerClaimsRegistry** records each retirement against the buyer's wallet, the standard claimed, and a timestamp
- **ComplianceRegistry & StandardsRegistry** ensure each certificate maps to exactly one underlying asset
- **AccountManager** gates all participants — only KYC/AML-verified accounts may mint, list, or retire credits

---

## Quality Assessment

Every asset submitted to NCRB receives a programmatic quality score (0–100) across six weighted dimensions, aligned with Sylvera, BeZero, and ICVCM Core Carbon Principles:

| Dimension | Weight | What It Measures |
|---|---|---|
| Technical Quality | 25% | Asset-specific bands: Sylvera ratings, USDA land classes, ore grades, FSC certification |
| Additionality | 20% | Financial additionality and baseline assessments |
| Permanence | 20% | Long-term guarantee mechanisms (100+ years preferred) |
| Certification Level | 15% | Registry rigour and CCP-Approved status |
| Social Impact | 12% | CCB Gold, SDG alignment, Indigenous engagement (commands 30–100% price premiums) |
| Vintage / Condition | 8% | Asset age, relevance, and data freshness |

Scores map to credit rating bands from **AAA** (highest integrity) to **Not Eligible** — directly comparable with Sylvera and BeZero institutional ratings.

---

## Standards & Compliance

Every credit on the NCRB platform is assessed against a rigorous compliance framework:

- **Paris Agreement — Article 6**: Corresponding adjustments tracked on-chain to prevent double-counting between buyer and host-country NDCs
- **ICVCM Core Carbon Principles (CCP)**: Gold standard for carbon credit integrity
- **SBTi Net-Zero Standard**: Beyond Value Chain Mitigation (BVCM) and residual emission neutralisation
- **ISO 14064-1/2/3**: GHG quantification and verification
- **VCMI Claims Code of Practice**: Silver, Gold, and Platinum buyer claims
- **MiCA (EU Markets in Crypto-Assets)**: Token classification, Article 36 reserves, Article 19 disclosure
- **CSRD / TNFD**: Seamless integration with E1 (climate), E2 (water/pollution), and E4 (biodiversity) disclosures

---

## Roadmap

| Milestone | Target | Description |
|---|---|---|
| **Prototype — Testnet** | Q1/Q2 2026 | Full platform live on 3 testnets; partner demos and investor presentations |
| **MVP — Mainnet Launch** | July 2026 | Production deployment; security-audited; 3–5 registry partners live |
| **Partner & Buyer Onboarding** | Q2 2026 | Verra, Gold Standard, Plan Vivo, Plastic Bank; bid trading platform |
| **Vesting Enhancements** | Q4 2026 | Configurable cliff + linear vesting for token distributions |
| **Phase 2 — Advanced Trading** | Q2 2027 | DeFi integrations (Aave, Uniswap), SDK/API, mobile app, white-label |
| **Phase 3 — NCRB Stablecoin** | Q2 2028 | Asset-backed stablecoin collateralised by locked RWA pool (150%+ collateralisation) |

---

## Get in Touch

| | |
|---|---|
| **Website** | [ncrb.world](https://ncrb.world) |
| **Email** | info@ncrb.world |
| **X / Twitter** | [@NCRBPlatform](https://x.com/NCRBplatform) |
| **LinkedIn** | [natural-capital-rebank](https://www.linkedin.com/company/natural-capital-rebank/) |
| **World HQ** | 12 Manomet Point Rd, Suite 293, Manomet, MA 02345, USA |
| **Americas & Europe** | 32357 Marshall Road, Abbotsford, BC V2T 1A6, Canada |
| **Asia-Pacific** | House 26, Road 7, Block G, Banani, Dhaka 1213, Bangladesh |
