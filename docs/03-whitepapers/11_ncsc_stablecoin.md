---
id: ncsc_stablecoin
title: NCSC Stablecoin
---

# NCSC — Natural Capital Stablecoin Whitepaper

**Version 1.0 | March 2026**

---

**World Headquarters:** 12 Manomet Point Rd, Suite 293, Manomet, MA 02345-0293, USA | T: +1-781-266-2004
**Americas & Europe:** 32357 Marshall Road, Abbotsford, BC V2T 1A6, Canada | T: +1-604-809-4334
**Asia-Pacific:** House 26, Road 7, Block G, Banani, Dhaka 1213, Bangladesh | T: +880-1703-727060

**Website:** https://ncrb.world | **Email:** info@ncrb.world | **Twitter:** @NCRBPlatform
**LinkedIn:** https://linkedin.com/company/natural-capital-rebank

---

## Abstract

The Natural Capital Stablecoin (NCSC) is a USD-pegged digital currency backed entirely by real-world natural capital asset tokens locked on-chain. Unlike fiat-backed stablecoins that hold bank deposits, or crypto-backed stablecoins that use volatile digital assets, NCSC is collateralised by independently certified environmental assets — carbon credits, forestry rights, water rights, biodiversity credits, and eight other natural capital classes tokenised on the NCRB platform.

Every NCSC in circulation represents exactly one US dollar of certified natural capital value held in a non-withdrawable on-chain treasury. The total NCSC supply is programmatically maintained to equal the total USD market value of those locked assets, with mint and burn operations triggered automatically when the peg deviates by more than 0.5%.

NCSC can be issued and traded at any time once the treasury has accumulated locked tokens. Redemption for fiat currency is gated by regulatory approval in each jurisdiction, enforced on-chain via a `redemptionEnabled` flag that starts `false` and can only be set by the contract administrator when approvals are in place.

---

## 1. Introduction

### 1.1 The Natural Capital Opportunity

Natural capital — the world's stocks of forests, wetlands, oceans, soil, and biodiversity — underpins all economic activity. These assets deliver essential ecosystem services: carbon sequestration, clean water, climate resilience, pollination, and coastal protection. Their combined value has been conservatively estimated in the hundreds of billions of euros annually. The EU's Natura 2000 network alone provides an estimated €189–308 billion in annual ecosystem benefits, with its carbon stock valued at €607–1,130 billion.[^1]

Despite this immense value, natural capital has historically been illiquid, opaque, and inaccessible to mainstream financial markets. The NCRB platform solves this by tokenising certified natural capital assets on blockchain, making them tradeable, price-discoverable, and composable with digital finance.

### 1.2 The Case for a Natural Capital-Backed Stablecoin

The global green finance market is projected to reach $28.7 trillion by 2033 (21.25% CAGR).[^2] Sustainable finance broadly — encompassing ESG investments, green bonds, and nature credits — is expected to reach $24.3 trillion by 2030.[^3] Trillions of dollars in sovereign wealth, pension, and corporate capital are actively seeking liquid, measurable, climate-positive asset vehicles.

A stablecoin backed by natural capital assets addresses this demand directly:

- **ESG-aligned reserve**: Collateral consists of certified environmental assets with measurable real-world impact — not bank deposits subject to counterparty risk, not volatile crypto assets subject to market cycles.
- **Diversification**: A basket of 10 natural capital asset classes hedges against single-market risk, commodity price swings, and fiat monetary policy.
- **Transparency**: Every locked token, every USD value, and every supply adjustment is visible on-chain and independently verifiable.
- **Programmable stability**: Supply adjustments are automated by smart contract logic and oracle feeds, removing discretionary human intervention from the peg mechanism.

### 1.3 What NCSC Is Not

- **Not a fiat-backed stablecoin**: There is no bank account holding USD. Collateral is on-chain natural capital asset tokens.
- **Not an algorithmic stablecoin**: There is no algorithmic mechanism that can fail if confidence is lost. Every NCSC is backed by real assets that have been independently certified and quality-scored before being locked.
- **Not immediately redeemable for fiat**: Fiat redemption requires regulatory approval in each jurisdiction. Until those approvals are obtained, `redeem()` is disabled on-chain. NCSC is freely transferable and tradeable on-chain at all times.

---

## 2. Platform Foundation

### 2.1 NCRB RWA Tokenisation

NCSC is built on top of the NCRB tokenisation platform. Before any asset can back NCSC, it must go through a rigorous multi-stage lifecycle:

1. **Registration**: Asset owner registers a natural capital certificate with the NCRB `AssetRegistry`. Metadata is validated against the relevant standard (VCS, Gold Standard, Plan Vivo, etc.) and stored on-chain.
2. **Quality Assessment**: `QualityAssessment` contract scores the asset across 13 dimensions (additionality, permanence, co-benefits, MRV quality, registry status, etc.) to assign a quality band: A+, A, B, C, or D. Score determines a price multiplier applied to the base oracle price.
3. **Governance**: A 3-of-5 multi-signature governance panel reviews and votes to approve or reject the minting proposal. Approval requires 3 signatures within 7 days.
4. **Minting**: On execution, `MultiSigGovernance.executeProposal()` mints RWA tokens to the designated distribution recipients (asset owner, registry, NCRB, and any configured third parties).
5. **Treasury Lock**: At mint time, a configurable percentage (default 1%) of minted tokens is permanently locked in `TreasuryAssetContract`. This lock is the collateral for NCSC.
6. **Trading**: Remaining tokens are tradeable on the `RWAMarketplace`. Price oracle feeds update market prices hourly.
7. **Retirement**: When an asset is surrendered (credits used for offsetting), the corresponding treasury tokens are retired on-chain and the NCSC supply is reduced.

### 2.2 Supported Asset Classes

NCSC is collateralised by all 10 natural capital asset classes on the NCRB platform:

| # | Asset Class | Symbol | Registry Examples |
|---|---|---|---|
| 1 | Carbon Credits | CC | Verra VCS, Gold Standard, ACR |
| 2 | Plastic Credits | PC | Verra Plastic, Plastic Bank |
| 3 | Nitrogen Credits | NC | Regional watershed programs |
| 4 | Phosphorus Credits | PHC | Nutrient trading programs |
| 5 | Agricultural Land | AL | USDA, FAO, national registries |
| 6 | Mining Rights | MR | National mining authorities |
| 7 | Water Rights & Credits | WR | State water boards, IWRM |
| 8 | Renewable Energy Credits | REC | IREC, EKOenergy, I-REC |
| 9 | Forestry Rights | FR | REDD+, Plan Vivo, FSC |
| 10 | Biodiversity Credits | BC | BBOP, Biodiversity Net Gain |

Each asset class has its own quality scoring framework and price feed in the NCRB oracle system. The treasury aggregates USD value across all locked asset types to compute the NCSC supply target.

---

## 3. Technical Architecture

### 3.1 Two-Contract Design

NCSC is implemented in two smart contracts that work together:

```
┌──────────────────────────────────────────────┐
│           TreasuryAssetContract              │
│                                              │
│  Holds locked RWA tokens (≥1% of minting)   │
│  Retires tokens on underlying asset retire  │
│  Exposes getTotalLockedValueUSD()            │
└──────────────────┬───────────────────────────┘
                   │ USD value read
                   ▼
┌──────────────────────────────────────────────┐
│           NCSCStablecoin                     │
│                                              │
│  ERC-20, 6 decimals, UUPS upgradeable       │
│  totalSupply() ≈ TreasuryAsset USD value    │
│  Mint/burn via STABILITY_ROLE               │
│  Blacklist + pause (USDC compliance model)  │
│  redemptionEnabled = false until approved   │
└──────────────────────────────────────────────┘
```

Both contracts are UUPS upgradeable proxy contracts, deployed on Avalanche, Ethereum, and XRPL EVM networks where the NCRB platform operates.

### 3.2 TreasuryAssetContract

#### Purpose

`TreasuryAssetContract` permanently holds a percentage of every RWA token minting event. There is no withdrawal function. Tokens flow in on mint and flow out only on asset retirement.

#### Token Lock on Minting

Every time `MultiSigGovernance.executeProposal()` mints tokens, it calls:

```
lockAmount = totalMinted × lockPercentageBps / 10000
TreasuryAssetContract.receiveTokens(tokenAddress, lockAmount, certificateId)
```

The lock percentage is configurable by the platform administrator within a range of 100–500 basis points (1–5%). The default is **100 bps (1%)**.

#### USD Value Calculation

```
getTotalLockedValueUSD()
```

This view function iterates all locked token addresses and sums:

```
value = lockedTokens[tokenAddress] × RWAPriceOracle.getPrice(tokenAddress) / 1e18
```

This is the number that drives NCSC supply. When it increases (new minting events), more NCSC is minted. When it decreases (asset retirements), NCSC is burned.

#### Asset Retirement Propagation

When an RWA token is retired on-chain (`RWAToken.TokensRetired` event), the oracle service detects this and calls:

```
TreasuryAssetContract.retireTokens(tokenAddress, amount, certificateId)
```

This:
1. Reduces `lockedTokens[tokenAddress]` by `amount`
2. Increases `retiredTokens[tokenAddress]` by `amount`
3. Calls `RWAToken.forcedTransfer(address(this), DEAD_ADDRESS, amount)` to permanently burn the locked tokens

After this call, `getTotalLockedValueUSD()` returns a lower value, triggering NCSC supply reduction.

#### Access Roles

| Role | Capability |
|---|---|
| `DEFAULT_ADMIN_ROLE` | Set lock percentage (100–500 bps); upgrade contract |
| `TREASURY_ROLE` | Call `receiveTokens()` and `retireTokens()` |

`TREASURY_ROLE` is granted to `MultiSigGovernance` (for minting locks) and the oracle service account (for retirement processing).

### 3.3 NCSCStablecoin

#### Token Specification

- **Name**: Natural Capital Stablecoin
- **Symbol**: NCSC
- **Decimals**: 6
- **Standard**: ERC-20 with compliance extensions (blacklist, pause)
- **Upgradeability**: UUPS

#### Why 6 Decimals

6 decimals matches USDC, USDT, and all major USD-pegged stablecoins. It aligns with ISO 4217 USD financial precision used in SWIFT, FedWire, and payment processing infrastructure. `1 NCSC = 1,000,000 units`. All DeFi integrations, DEX aggregators, Chainlink price feeds, and stablecoin-aware protocols assume 6 decimals for USD-pegged tokens. Diverging would break composability with the broader DeFi ecosystem.

#### Peg Mechanism

NCSC targets $1.00 per token. The supply is adjusted programmatically:

```
targetSupply (micro-dollars) = getTotalLockedValueUSD() × 1,000,000
currentSupply                = NCSCStablecoin.totalSupply()
delta                        = targetSupply − currentSupply

if delta > 0: mint delta NCSC to stability reserve address
if delta < 0: burn |delta| NCSC from stability reserve address
```

`adjustSupply()` is callable by any `STABILITY_ROLE` holder. The oracle cron calls it automatically every hour if `|delta / currentSupply| > 0.005` (0.5% deviation threshold). The threshold prevents unnecessary gas spend on trivial price fluctuations.

#### Core Price Formula

$$P_{NCSC} = \frac{V_{treasury}}{S_{NCSC}}$$

Where:
- $P_{NCSC}$: NCSC market price (target: $1.00)
- $V_{treasury}$: Total USD market value of all locked natural capital tokens
- $S_{NCSC}$: Total NCSC supply (in dollars, i.e. `totalSupply() / 1,000,000`)

The mechanism ensures $P_{NCSC} = 1.00$ by keeping $S_{NCSC} = V_{treasury}$ at all times (within the 0.5% adjustment threshold).

#### Compliance Design (USDC Pattern)

Following USDC's compliance architecture:

- **Blacklist**: Addresses on the blacklist cannot send, receive, or approve transfers. Applied by `BLACKLISTER_ROLE`.
- **Pause**: All transfers can be halted globally in an emergency by `PAUSER_ROLE`.
- **Redemption gate**: `redemptionEnabled` flag starts `false`. The `redeem()` function reverts with `RedemptionNotEnabled` until the flag is set `true` by `DEFAULT_ADMIN_ROLE`. This is enforced in contract storage — it cannot be bypassed.
- **Access-controlled mint/burn**: Only `MINTER_ROLE` can call `mint()`. Any holder can burn their own tokens.

#### Access Roles

| Role | Capability |
|---|---|
| `DEFAULT_ADMIN_ROLE` | Set `redemptionEnabled`; upgrade contract |
| `MINTER_ROLE` | Call `mint()` |
| `STABILITY_ROLE` | Call `adjustSupply()` |
| `PAUSER_ROLE` | Pause/unpause all transfers |
| `BLACKLISTER_ROLE` | Add/remove addresses from transfer blacklist |
| `UPGRADER_ROLE` | Authorise UUPS upgrades |

---

## 4. Supply Lifecycle

```
             RWA minting event (MultiSigGovernance)
                          │
                          ▼
             ┌────────────────────────┐
             │  lockAmount = 1% of   │
             │  minted RWA tokens    │
             │  → TreasuryAsset      │
             └────────────┬──────────┘
                          │ getTotalLockedValueUSD() increases
                          ▼
             ┌────────────────────────┐
             │  Oracle cron (1hr)    │
             │  delta > 0.5%         │
             │  → mint NCSC          │
             └────────────┬──────────┘
                          │ NCSC enters circulation
                          ▼
                   [NCSC holders:
                    trade, transfer,
                    use in DeFi,
                    hold for voting]
                          │
                   RWA asset retired
                   (credits surrendered)
                          │
                          ▼
             ┌────────────────────────┐
             │  retireTokens()        │
             │  burns locked tokens  │
             └────────────┬──────────┘
                          │ getTotalLockedValueUSD() decreases
                          ▼
             ┌────────────────────────┐
             │  Oracle cron          │
             │  delta < −0.5%        │
             │  → burn NCSC          │
             └────────────────────────┘
```

---

## 5. Collateral Model

### 5.1 Collateralisation Ratio

The protocol maintains a 1:1 collateralisation ratio by design: NCSC supply tracks treasury USD value exactly, adjusted hourly. The `collateral ratio = getTotalLockedValueUSD() / (totalSupply() / 1e6)` is publicly readable on-chain and exposed via the oracle API at `/api/treasury/collateral-ratio`.

In practice, the ratio will be close to 1.0 (100%) because the supply adjustment mechanism targets exact parity. Small deviations (up to 0.5%) are tolerated between adjustments to avoid unnecessary gas spend.

### 5.2 Treasury Growth Over Time

The treasury grows monotonically as the NCRB platform onboards more certificates:
- Every new minting event adds 1% of tokens to the treasury
- The lock percentage can be increased (up to 5%) as the platform matures
- Retired assets reduce the treasury, but only when the underlying credits are surrendered for offsetting — a use-case that generates separate fees and demonstrable impact

### 5.3 Asset Diversity as Stability

Unlike a stablecoin backed by a single commodity or fiat currency, NCSC's collateral spans 10 distinct natural capital asset classes across multiple geographies, registries, and market sectors. This diversification provides:

- **Market resilience**: A downturn in carbon credit prices does not collapse the treasury if forestry rights and water rights retain value
- **Ecological resilience**: Diversified asset types have uncorrelated event risks (drought affecting one region, does not affect ocean sequestration credits)
- **Regulatory resilience**: Different asset classes are governed by different regulatory frameworks, reducing single-point regulatory risk

### 5.4 Price Oracle Integrity

NCSC supply is driven by `RWAPriceOracle`, which aggregates prices from multiple sources (exchange data, registry price feeds, broker data) and applies the quality band multiplier from `QualityAssessment`. Oracle prices are updated every hour and are protected by:

- Multi-source aggregation (no single price feed dependency)
- Quality-score multipliers (A+ assets command premium pricing)
- Deviation checks (outlier prices flagged before acceptance)
- On-chain price history (all price updates emitted as events)

---

## 6. Regulatory Framework

### 6.1 Issuance vs. Fiat Redemption

NCSC operates under a two-phase regulatory model:

**Phase 1 — On-chain issuance (available immediately)**: NCSC can be minted and distributed as soon as the treasury holds locked tokens. No regulatory approval is required for:
- Minting NCSC against treasury collateral
- On-chain transfers between wallets
- Listing on decentralised exchanges
- Use in DeFi protocols (lending, liquidity provision, yield farming)

**Phase 2 — Fiat redemption (gated by regulatory approval)**: Burning NCSC in exchange for USD wired to a bank account constitutes a money transmission activity in most jurisdictions. This requires regulatory approval (money transmitter licence, e-money institution registration, or equivalent) in each operating jurisdiction.

The `redemptionEnabled` flag enforces this on-chain. It is `false` at deployment. Only `DEFAULT_ADMIN_ROLE` can set it `true`, and only once regulatory approvals are in place. Until then, `redeem()` reverts with `RedemptionNotEnabled`.

This design allows the platform to begin building the treasury, establishing on-chain liquidity, and demonstrating the peg mechanism well before any fiat-facing regulatory approval is required.

### 6.2 US Regulatory Framework (GENIUS Act / STABLE Act)

The United States enacted landmark federal stablecoin legislation in July 2025 via the GENIUS Act and STABLE Act.[^4][^5] Key requirements applicable to NCSC:

- **1:1 backing**: NCSC maintains 1:1 (or better) backing at all times via its programmatic supply adjustment mechanism
- **Monthly reporting**: The platform will publish monthly treasury reports disclosing total locked asset value, per-asset-class breakdown, and collateralisation ratio
- **Independent audits**: Third-party ecological certification of underlying assets and independent smart contract audits provide the audit chain required
- **AML/KYC**: Blacklist functionality and pause capability meet the compliance control requirements; full AML/KYC integration will be implemented before fiat redemption is enabled

### 6.3 Global Coordination

The Financial Stability Board and European institutions are developing parallel requirements focused on transparency, redemption enforceability, and systemic risk management.[^5] NCSC's architecture — on-chain transparency, no hidden reserves, programmatic supply control, and a regulatory gate on fiat redemption — is designed to align with emerging global standards.

### 6.4 Natural Capital Asset Certification

The ecological integrity of NCSC's collateral is the foundation of its compliance posture. Every asset backing NCSC must:

1. Be registered in a recognised international registry (Verra, Gold Standard, Plan Vivo, IUCN, etc.)
2. Pass NCRB's quality assessment (minimum quality band: C or above)
3. Have independent third-party verification of the underlying ecological claim
4. Comply with the Natural Capital Protocol methodology for valuation and impact reporting[^6]

Assets that fail to meet these standards cannot be minted as RWA tokens and therefore cannot enter the treasury.

---

## 7. Market Opportunity

### 7.1 Green Finance Growth

The global green finance market is projected to reach $28.7 trillion by 2033 at a 21.25% CAGR.[^2] Sustainable finance broadly is expected to reach $24.3 trillion by 2030.[^3] These are the capital pools that NCSC connects to natural capital assets.

### 7.2 ESG-Aligned Settlement

NCSC enables instant, cross-border, climate-aligned settlement between corporates, banks, and investment platforms. For organisations with net-zero commitments and ESG mandates, settling transactions in a currency backed by certified natural capital assets directly contributes to their sustainability reporting and impact metrics.

### 7.3 Voluntary Carbon Market Integration

The voluntary carbon market (VCM) is the primary initial driver of NCRB's treasury. Carbon credits — the most liquid and standardised natural capital asset class — are the first asset type supported and generate the highest volume of minting events. NCSC provides the VCM with a liquid, stable unit of account denominated in certified carbon value rather than dollars.

### 7.4 Use Cases

| Use Case | Description |
|---|---|
| **Reserve asset** | Sovereign and institutional portfolios seeking ESG-aligned liquid reserves |
| **Payment settlement** | Cross-border B2B payments in a climate-positive stable currency |
| **DeFi collateral** | Lending, liquidity provision, and yield strategies using ESG-backed stable value |
| **Carbon market pricing** | Stable unit of account for carbon credit transactions |
| **Impact investment** | Fund structures that require verifiable ESG collateral for investor reporting |
| **Treasury management** | Corporate treasury allocation to climate-positive stable assets |

---

## 8. Risk Factors and Mitigations

| Risk | Description | Mitigation |
|---|---|---|
| **Collateral price volatility** | Natural asset prices fluctuate due to market or ecological shifts | Hourly oracle updates; 0.5% adjustment threshold prevents whipsawing; diversified 10-asset-class basket |
| **Oracle manipulation** | Price feed manipulation inflates treasury value | Multi-source aggregation; deviation checks; on-chain price history; admin pause capability |
| **Smart contract vulnerability** | Bug in TreasuryAssetContract or NCSCStablecoin | Independent security audit before v1.0.0 mainnet; UUPS upgradeability for post-audit patches; bug bounty program |
| **Asset certification fraud** | Underlying assets are not as certified | Third-party registry verification required; NCRB quality assessment; on-chain certificate hashes; community reporting |
| **Regulatory change** | Regulatory environment changes status of natural capital assets | `redemptionEnabled` gate; blacklist; pause; UUPS upgrade path; legal counsel in each operating jurisdiction |
| **Redemption/liquidity shock** | Sudden mass burn pressure | Fiat redemption gated until regulatory approval; on-chain redemption can be staged; treasury is non-withdrawable |
| **Concentration risk** | Over-reliance on a single asset class or geography | Asset diversity requirements; lock percentage applied equally across all 10 asset types |

---

## 9. Governance

### 9.1 Stability Operations

NCSC supply adjustments are performed by whitelisted `STABILITY_ROLE` accounts operated by the NCRB oracle service. The stability algorithm is deterministic: it reads `getTotalLockedValueUSD()`, compares to `totalSupply()`, and mints or burns the delta. There is no discretionary decision-making in supply adjustments.

### 9.2 Administrative Controls

Platform administrators holding `DEFAULT_ADMIN_ROLE` can:
- Enable fiat redemption (`setRedemptionEnabled(true)`) once regulatory approvals are in place
- Adjust the treasury lock percentage (within 100–500 bps)
- Add or remove addresses from the blacklist (via `BLACKLISTER_ROLE`)
- Pause all transfers in an emergency (via `PAUSER_ROLE`)
- Upgrade contracts via UUPS proxy (via `UPGRADER_ROLE`)

All admin actions emit on-chain events and are publicly auditable.

### 9.3 Future Token Holder Governance

Once NCSC is actively traded and regulatory approvals for fiat redemption are in place, governance will expand to include NCSC token holder voting on funding proposals for new blue and green conservation projects. NCSC holders will vote on project funding requests from the treasury, with a ≥40% participation threshold and ≥60% approval threshold. This phase is described in detail in the NCRB Proposals Program documentation.

---

## 10. Deployment

### 10.1 Networks

NCSC is deployed on the same networks as the NCRB RWA platform:

| Network | Chain ID | Status |
|---|---|---|
| Ethereum Sepolia (testnet) | 11155111 | v2.0.0 target |
| Avalanche Fuji (testnet) | 43113 | v2.0.0 target |
| XRPL EVM Testnet | 1449000 | v2.0.0 target |
| Ethereum Mainnet | 1 | Post-audit |
| Avalanche C-Chain | 43114 | Post-audit |
| XRPL EVM Mainnet | TBD | Post-audit |

### 10.2 Deployment Order

```
1. Deploy TreasuryAssetContract (UUPS proxy)
   — Constructor args: RWAPriceOracle address
   — Set lockPercentageBps = 100 (1%)

2. Deploy NCSCStablecoin (UUPS proxy)
   — initialize(admin, minter, pauser, upgrader, blacklister)
   — redemptionEnabled = false (default)

3. Grant TREASURY_ROLE on TreasuryAssetContract:
   — to MultiSigGovernance (receiveTokens on mint)
   — to oracle service account (retireTokens on retirement)

4. Grant MINTER_ROLE + STABILITY_ROLE on NCSCStablecoin:
   — to oracle service account

5. Set TreasuryAssetContract address in MultiSigGovernance
   (so executeProposal knows where to send the lock amount)

6. Configure oracle cron: adjustSupply every 1 hour, threshold 0.5%

7. Add TreasuryAssetContract + NCSCStablecoin to CONTRACT_ADDRESSES
   in ncrb-dapp
```

### 10.3 Timeline

NCSC development is planned for **Phase 2b (v2.0.0, target Q1 2027)**. This follows:
- v1.0.0 mainnet launch (Q3 2026) — security audit, production deployment of RWA tokenisation platform
- Phase 2a partner onboarding — sufficient treasury accumulation from live minting events
- NCSC contract development and testing — 4–6 weeks
- Independent security audit of TreasuryAssetContract + NCSCStablecoin

---

## 11. Key Invariants

| Invariant | Enforcement |
|---|---|
| NCSC supply ≈ treasury USD value (±0.5%) | Oracle cron + `adjustSupply()` |
| Treasury locked balance decreases only on asset retirement | `TreasuryAssetContract` — no withdrawal function |
| Lock percentage within 100–500 bps | `setLockPercentage()` range check |
| `redemptionEnabled = false` until admin explicitly sets it | `NCSCStablecoin` storage |
| Blacklisted addresses cannot send, receive, or approve | Transfer override in `NCSCStablecoin` |
| `retireTokens()` burns corresponding treasury tokens permanently | `TreasuryAssetContract.retireTokens()` → dead address |

---

## Appendix A: Technical References

| Document | Location |
|---|---|
| NCSC Architecture | `docs/architecture/NCSC_ARCHITECTURE.md` |
| Token Lifecycle | `docs/architecture/TOKEN_LIFECYCLE.md` |
| System Overview | `docs/architecture/SYSTEM_OVERVIEW.md` |
| Oracle API Integration | `docs/integration/ORACLE_API_INTEGRATION.md` |

---

## Appendix B: References

[^1]: European Parliament Research Service (2015). *The Nature-Based Solutions* — Natura 2000 network ecosystem service valuation. https://www.europarl.europa.eu/RegData/etudes/BRIE/2015/551321/EPRS_BRI(2015)551321_EN.pdf

[^2]: Spherical Insights (July 2025). *Global Green Finance Market Size & Growth — Projected $28.71T by 2033 at 21.25% CAGR.* https://www.sphericalinsights.com/blogs/top-20-green-finance-companies-in-global-2025-statistics-view-by-spherical-insights-consulting

[^3]: Mordor Intelligence (June 2025). *Sustainable Finance Market — $24.3T by 2030.* https://www.mordorintelligence.com/industry-reports/sustainable-finance-market

[^4]: Latham & Watkins (2025). *The GENIUS Act of 2025: Stablecoin Legislation Adopted in the US.* https://www.lw.com/en/insights/the-genius-act-of-2025-stablecoin-legislation-adopted-in-the-us

[^5]: Skadden (2025). *US Establishes First Federal Regulatory Framework for Stablecoins.* https://www.skadden.com/insights/publications/2025/07/us-establishes-first-federal-regulatory-framework

[^6]: Natural Capital Coalition (2016). *Natural Capital Protocol.* https://capitalscoalition.org/capitals-approach/natural-capital-protocol/

---

*Natural Capital ReBank (NCRB) — Tokenising the Value of Nature*
*This document is for informational purposes only and does not constitute financial, legal, or investment advice.*
