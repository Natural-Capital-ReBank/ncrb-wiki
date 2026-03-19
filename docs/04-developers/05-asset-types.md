---
id: asset-types
title: Asset Types
---

# Asset Types

NCRB supports 11 asset types across 10 natural capital categories plus a generic `Other` type for future expansion. Each asset type is identified by a `uint8` integer that maps consistently across the smart contracts, Oracle API, and database.

---

## Type Reference

| ID | Name | Unit | Token Symbol | API Key |
|---|---|---|---|---|
| `0` | Carbon Credit | tCO₂e | `NC-CARBON-{ID}` | `CARBON_CREDIT` |
| `1` | Plastic Credit | tonne | `NC-PLASTIC-{ID}` | `PLASTIC_CREDIT` |
| `2` | Nitrogen Credit | kg N | `NC-NITROGEN-{ID}` | `NITROGEN_CREDIT` |
| `3` | Phosphorus Credit | kg P | `NC-PHOSPHORUS-{ID}` | `PHOSPHORUS_CREDIT` |
| `4` | Agricultural Land | hectares | `NC-AGLAND-{ID}` | `AGRICULTURAL_LAND` |
| `5` | Mining Rights | hectares | `NC-MINING-{ID}` | `MINING_RIGHTS` |
| `6` | Water Rights | m³ | `NC-WATER-{ID}` | `WATER_RIGHTS` |
| `7` | Renewable Energy Credit | MWh | `NC-REC-{ID}` | `RENEWABLE_ENERGY` |
| `8` | Forestry Rights | hectares | `NC-FORESTRY-{ID}` | `FORESTRY` |
| `9` | Biodiversity Credit | hectares | `NC-BIO-{ID}` | `BIODIVERSITY_CREDIT` |
| `255` | Other | units | `NC-OTHER-{ID}` | `OTHER` |

The `255` value (`0xFF`) is reserved for future or non-standard asset types that do not yet have a dedicated category.

---

## Using Asset Type IDs

Asset type IDs appear as the `assetType` parameter throughout the API and as `uint8` arguments in contract calls:

```js
// Filter certificates by asset type via Oracle API
GET /api/certificates/asset-type/0     // Carbon Credits
GET /api/certificates/asset-type/9     // Biodiversity Credits

// Get quality profile for an asset type
GET /api/quality-profiles/7            // Renewable Energy Credits

// Get current price for an asset type
GET /api/prices/4                      // Agricultural Land
```

In Solidity/ethers.js:

```js
// AssetRegistry.submitCertificate(serialNumber, assetType, ...)
await assetRegistry.submitCertificate('VCS-2024-001', 0, ...); // Carbon Credit = 0
```

---

## Supported Standards by Asset Type

Each asset type maps to a set of accepted industry standards. These are seeded in `StandardsRegistry` on-chain and in the `registries` / `registry_methodologies` tables in the database.

### Carbon Credits (0)

| Registry | Standards |
|---|---|
| Verra | VCS, CCB, SD VISta |
| Gold Standard | GS4GG |
| American Carbon Registry | ACR Standard |
| Climate Action Reserve | CAR Protocol |
| Architecture for REDD+ Transactions | ART TREES |

Compliance frameworks: Paris Agreement Article 6, ICVCM CCP, SBTi Net-Zero, VCMI Claims Code, ISO 14064, ISO 14068-1

---

### Plastic Credits (1)

| Registry | Standards |
|---|---|
| rePurpose Global | rePurpose Standard |
| Plastic Bank | Plastic Bank Certification |
| Verra | Plastic Waste Reduction Standard (PWRS) |
| CleanHub | CleanHub Verified |

---

### Nitrogen Credits (2)

| Programme | Scope |
|---|---|
| Nutrient Tracking Tool (NTT) | USDA-endorsed watershed modelling |
| USDA Conservation Programmes | EQIP, CSP |
| Chesapeake Bay Program | Bay watershed trading |
| State-Level Programmes | Virginia, Maryland, Pennsylvania |

Minimum requirement: 2:1 trading ratio for non-point to point source offsets.

---

### Phosphorus Credits (3)

| Programme | Scope |
|---|---|
| Ohio River Basin Trading Program | Multi-state |
| Vermont Phosphorus Credit System | Lake Champlain watershed |
| Lake Champlain Basin Program | US–Canada cross-border |
| USDA NRCS | Conservation practice standards |

Minimum requirement: 2:1 trading ratio; TMDL programme compliance.

---

### Agricultural Land (4)

| Standard | Notes |
|---|---|
| USDA Land Capability Classification (LCC) | Classes I–IV eligible; V–VIII not eligible |
| USDA LESA Score | Land Evaluation and Site Assessment |
| USDA NOP | Organic certification (+20–50% premium) |

---

### Mining Rights (5)

| Standard | Jurisdiction |
|---|---|
| NI 43-101 | Canada |
| JORC Code | Australia / international |
| SEC S-K 1300 | United States |

Minimum: Probable Reserves or Measured Resources. Inferred Resources not eligible.

---

### Water Rights (6)

| Authority | Notes |
|---|---|
| State Water Resources Board | California, Colorado, Arizona, etc. |
| Riparian rights doctrine | Eastern US |
| Prior appropriation doctrine | Western US (priority date critical) |
| Australian water trading | Murray-Darling Basin |

---

### Renewable Energy Credits (7)

| Registry | Region |
|---|---|
| APX / NEPOOL GIS | New England |
| APX / PJM-GATS | Mid-Atlantic & Midwest |
| M-RETS | Midwest |
| WREGIS | Western US |
| NAR | North America (voluntary) |
| Green-e Energy | National voluntary |

Compliance frameworks: RE100, GHG Protocol Scope 2 (market-based), EAC (international)

---

### Forestry Rights (8)

| Standard | Notes |
|---|---|
| FSC (Forest Stewardship Council) | Gold standard globally |
| SFI (Sustainable Forestry Initiative) | North America |
| ATFS (American Tree Farm System) | Small/family forests |
| Verra VCS + Gold Standard | For REDD+ credits |

Compliance frameworks: SBTi FLAG, TNFD, Paris Agreement Article 6, CSRD E4

---

### Biodiversity Credits (9)

| Standard | Notes |
|---|---|
| UK Biodiversity Metric 4.0 | Mandatory for UK BNG compliance |
| Plan Vivo | Community-based nature standard |
| Verra (VCS + SD VISta) | Combined carbon + biodiversity |
| NatureQuant | Quantitative natural infrastructure index |
| Terrasos | Colombian biodiversity certificates |

Compliance frameworks: Kunming-Montreal GBF, TNFD, CSRD E4, SBTN, UK Environment Act 2021

---

## Market Data

| Asset Type | Market Size | CAGR | Addressable Market |
|---|---|---|---|
| Carbon Credits | $850B | 15% | $425B |
| Plastic Credits | $150B | 25% | $75B |
| Nitrogen Credits | $80B | 18% | $24B |
| Phosphorus Credits | $60B | 16% | $18B |
| Agricultural Land | $12T | 5% | $360B |
| Mining Rights | $1.5T | 6% | $150B |
| Water Rights | $350B | 8% | $105B |
| Renewable Energy Credits | $200B | 12% | $100B |
| Forestry Rights | $800B | 7% | $80B |
| Biodiversity Credits | $600B | 20% | $180B |

> **Total addressable market: US $16.5 trillion**

---

## Checking Asset Type Support On-Chain

```js
// Check if a specific standard is applicable to an asset type
GET /api/standards/check/:standardId/:assetType

// Get all quality parameters for a registry + asset type combination
GET /api/registry-standards/quality-parameters/:registryId/:assetTypeId

// Get current price for any asset type
GET /api/prices/:assetType
```

In the `StandardsRegistry` contract, asset type applicability is stored as a **bitmask** (`uint256`) where bit `n` corresponds to asset type `n`:

```js
// Example: check if standard applies to Carbon Credits (assetType 0)
const applicableBitmask = await standardsRegistry.getApplicableAssetTypes(standardId);
const appliesToCarbon = (applicableBitmask & (1n << 0n)) !== 0n;
```
