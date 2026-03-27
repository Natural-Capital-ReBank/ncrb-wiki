---
id: oracle-api
title: Oracle API Reference
---

# Oracle API Reference

The NCRB Oracle API is a REST API that serves as the primary backend for the dApp. It aggregates data from on-chain contracts and the shared PostgreSQL database, and exposes it through a set of structured JSON endpoints.

> **API server links:** Coming soon. In the meantime, you can run the API locally by cloning `ncrb-oracles` and following the setup instructions in the repository README.

An interactive **Swagger UI** is available at `/docs` and the raw **OpenAPI spec** at `/docs.json` on any running instance.

---

## Base URL (Local)

```
http://localhost:3001
```

---

## Response Format

All endpoints return a consistent JSON envelope:

```json
// Success
{
  "success": true,
  "data": { }
}

// Error
{
  "success": false,
  "error": "ErrorType",
  "message": "Human-readable description of what went wrong"
}
```

**HTTP status codes used:**

| Code | Meaning |
|---|---|
| `200` | Success |
| `400` | Bad request — missing or invalid parameters |
| `404` | Resource not found |
| `500` | Internal server error |
| `503` | Service unhealthy (no networks configured) |

---

## Health

### `GET /api/health`

Returns the current health status of the Oracle API service, including database connectivity and per-network contract configuration.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-18T00:00:00.000Z",
  "environment": "production",
  "services": { "database": true },
  "networks": {
    "fuji": {
      "configured": true,
      "contracts": {
        "accountManager": "0x39BFC...",
        "assetRegistry": "0xc338f..."
      }
    },
    "sepolia": { "configured": true },
    "xrpl": { "configured": true }
  }
}
```

Status values: `healthy`, `degraded`, `unhealthy` (503)

---

## Certificates

Certificates represent submitted real-world asset records, indexed from on-chain `CertificateSubmitted` and `CertificateFinalized` events.

### `GET /api/certificates`

List all certificates. Optionally filter by network.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `network` | string | `fuji`, `sepolia`, or `xrpl` |

---

### `GET /api/certificates/:serialNumber`

Get a single certificate by its on-chain serial number.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `network` | string | Network to query |

---

### `GET /api/certificates/registry/:address`

List all certificates submitted by a specific registry address.

---

### `GET /api/certificates/asset-type/:assetType`

List all certificates for a given asset type ID (0–9, 255).

See [Asset Types](./asset-types) for the full ID reference.

---

### `GET /api/certificates/stats/total`

Returns the total count of certificates across all networks.

---

## Quality Assessment

### `POST /api/quality/assess`

Submit a single certificate for quality assessment. The Oracle API scores it across 6 dimensions and returns a composite score (0–100) and rating band (AAA → Not Eligible).

**Request body:**
```json
{
  "serialNumber": "VCS-2024-001-001",
  "assetType": 0,
  "network": "fuji",
  "parameters": {
    "vintage": 2023,
    "methodology": "VM0015",
    "additionality": "financial",
    "cobenefits": ["CCB_GOLD", "SDG_13"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "serialNumber": "VCS-2024-001-001",
    "score": 78,
    "band": "AA",
    "dimensions": {
      "technicalQuality": 82,
      "additionality": 75,
      "permanence": 80,
      "certificationLevel": 70,
      "socialImpact": 85,
      "vintageCondition": 72
    }
  }
}
```

---

### `POST /api/quality/assess/batch`

Submit multiple certificates for assessment in a single request.

**Request body:**
```json
{
  "certificates": [ /* array of individual assess request bodies */ ],
  "network": "fuji"
}
```

---

### `GET /api/quality/methodology`

Returns the current scoring methodology — dimension weights, band thresholds, and scoring rules — for each supported asset type.

---

### `GET /api/quality/:serialNumber`

Returns the stored quality metrics for a previously assessed certificate.

---

## Governance Proposals

### `GET /api/proposals`

List all governance proposals, optionally filtered by network.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `network` | string | `fuji`, `sepolia`, or `xrpl` |
| `status` | string | `pending`, `approved`, `rejected`, `executed` |

---

### `GET /api/proposals/:proposalId`

Get a single proposal by ID.

---

### `POST /api/proposals/:proposalId/execute`

Execute an approved proposal on-chain. Requires the Oracle API to be configured with a wallet that holds the appropriate governance role.

---

## Account Management

All write operations require the `ACCOUNT_MANAGER_ROLE` on the `AccountManager` contract, held by the Oracle API's configured wallet (`ACCOUNT_MANAGER_PRIVATE_KEY`).

### `GET /api/accounts/:address`

Get account details for an address.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `network` | string | Network to query |

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x...",
    "accountType": "MULTISIG",
    "status": "ACTIVE",
    "name": "Verra Registry",
    "metadata": { "organization": "Verra", "website": "https://verra.org" },
    "createdAt": 1700000000
  }
}
```

---

### `GET /api/accounts`

List all registered accounts, optionally filtered by network, status, or account type.

---

### `POST /api/accounts`

Register a new account on-chain.

**Request body:**
```json
{
  "accountAddress": "0x742d35Cc...",
  "accountType": "MULTISIG",
  "name": "Verra Registry",
  "metadata": { "organization": "Verra", "website": "https://verra.org" },
  "network": "fuji"
}
```

---

### `PUT /api/accounts/:address/activate`

Activate a previously inactive or suspended account.

---

### `PUT /api/accounts/:address/suspend`

Suspend an active account. Requires a `reason` in the request body.

---

### `DELETE /api/accounts/:address`

Remove an account from the registry. Requires a `reason` in the request body.

---

### `POST /api/accounts/:address/roles`

Grant a role to an account.

**Request body:**
```json
{
  "role": "REGISTRY_ROLE",
  "network": "fuji"
}
```

---

### `DELETE /api/accounts/:address/roles/:role`

Revoke a role from an account.

---

## Price Oracle

Price data is aggregated by `ncrb-indexer` from multiple external sources and stored in the shared database. The Oracle API reads and serves this data.

### `GET /api/prices/all`

Returns the latest aggregated price for all asset types.

**Response:**
```json
{
  "success": true,
  "data": {
    "0": { "assetType": 0, "name": "Carbon Credit", "price": 14.50, "currency": "USD", "unit": "tCO2e", "confidence": 0.92, "updatedAt": "..." },
    "1": { "assetType": 1, "name": "Plastic Credit", "price": 520.00, "currency": "USD", "unit": "tonne", "confidence": 0.85, "updatedAt": "..." }
  }
}
```

---

### `GET /api/prices/:assetType`

Returns the latest price for a specific asset type by ID.

---

### `GET /api/prices/:assetType/history`

Returns historical price data.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `period` | string | `24h`, `7d`, `30d`, `90d`, `1y` |

---

### `GET /api/prices/:assetType/sources`

Returns the configured price sources for an asset type, including reliability scores and last fetch times.

---

## Standards

### `GET /api/standards`

List all on-chain standards from `StandardsRegistry`.

---

### `GET /api/standards/:standardId`

Get details for a specific standard by its `bytes32` identifier.

---

### `GET /api/standards/check/:standardId/:assetType`

Check whether a standard is applicable to a given asset type.

---

## Compliance

### `GET /api/compliance/certificate/:serial`

Get all compliance records for a certificate.

---

### `GET /api/compliance/record/:recordId`

Get a single compliance record.

---

### `GET /api/compliance/check/:serial/:standardId`

Check compliance status for a certificate against a specific standard.

---

### `GET /api/compliance/effective-status/:recordId`

Returns the effective compliance status with automatic expiry evaluation applied.

---

## Buyer Claims

Records of on-chain credit retirements, indexed from `BuyerClaimsRegistry` events.

### `GET /api/claims/:claimId`

Get a single retirement claim by ID.

---

### `GET /api/claims/buyer/:address`

Get all retirement claims for a buyer wallet address.

---

### `GET /api/claims/certificate/:serial`

Get all retirement claims for a specific certificate.

---

## Quality Profiles

### `GET /api/quality-profiles/:assetType`

Returns the on-chain quality profile for an asset type — the dimension names and their weights as configured in `QualityAssessment`.

**Response:**
```json
{
  "success": true,
  "data": {
    "assetType": 0,
    "dimensions": ["Technical Quality", "Additionality", "Permanence", "Certification Level", "Social Impact", "Vintage/Condition"],
    "weights": [25, 20, 20, 15, 12, 8]
  }
}
```

---

### `GET /api/quality-profiles/:assetType/bands`

Returns the rating bands for an asset type (AAA, AA, A, BBB, Not Eligible) with their score ranges and price multipliers.

---

### `GET /api/quality-profiles/score/:serialNumber`

Returns the quality score stored on-chain for a specific certificate.

---

## Marketplace

The Marketplace API surfaces data from `RWAMarketplace.sol`. All endpoints are DB-first with on-chain RPC fallback. Listing objects include certificate metadata joined from the most recent approved certificate for the listing's asset type.

### `GET /api/marketplace/listings`

List marketplace listings with optional filtering and sorting.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `network` | string | `fuji`, `sepolia`, or `xrpl` |
| `asset_type` | number | Filter by asset type ID (0–9) |
| `status` | number | `0`=ACTIVE, `1`=SOLD, `2`=CANCELLED, `3`=EXPIRED |
| `seller` | string | Filter by seller address |
| `q` | string | Free-text search (project name, country, methodology) |
| `sort_by` | string | `listing_id` \| `price_per_token` \| `amount_remaining` \| `created_at` |
| `sort_dir` | string | `asc` \| `desc` |
| `limit` / `offset` | number | Pagination (default limit: 20) |

**Response includes these certificate-derived fields** (null when no approved certificate exists):

`certificateSerial`, `projectId`, `projectName`, `vintage`, `qualityScore`, `unit`, `methodology`, `country`, `subType`, `sdgGoals`, `projectImageUrl`, `latitude`, `longitude`, `correspondingAdjustment`, `creditMechanism`

---

### `GET /api/marketplace/listings/:listingId`

Get a single listing by its on-chain `listingId`. Returns the same object shape as the list endpoint.

---

### `GET /api/marketplace/trades`

List completed trades.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `network` | string | Network |
| `buyer` | string | Filter by buyer address |
| `seller` | string | Filter by seller address |
| `aggregator` | string | Filter by aggregator address |
| `listing_id` | number | Filter all trades for a specific listing |

---

### `GET /api/marketplace/trades/:tradeId`

Get a single trade by ID.

---

### `GET /api/marketplace/stats`

Returns aggregated marketplace statistics: active/total listing counts, total trade count, total volume, platform fees, aggregator fees, and a breakdown by asset type.

---

### `GET /api/marketplace/user/:address/listings`

All listings where `:address` is the seller.

---

### `GET /api/marketplace/user/:address/trades`

All trades where `:address` is the buyer or seller.

---

### `GET /api/marketplace/aggregators`

List all registered aggregator addresses with royalty rates and volume stats.

---

### `GET /api/marketplace/aggregators/:address`

Single aggregator details.

---

## Registry Standards (Database-Driven)

### `GET /api/registry-standards/registries`

List all registry organisations configured in the database (Verra, Gold Standard, ACR, CAR, ART, etc.).

---

### `GET /api/registry-standards/methodologies/:registryId`

List methodologies available for a registry (e.g. VCS, CCB, SD VISta for Verra).

---

### `GET /api/registry-standards/quality-parameters/:registryId/:assetTypeId`

Returns the quality parameter definitions and scoring rules for a specific registry + asset type combination.

---

### `GET /api/registry-standards/sub-types`

Returns the available sub-types for a given asset type. Used by the `/registry` form Sub-Type dropdown.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `asset_type_code` | number | Asset type ID (0–9, 255) |

Sub-types with `affectsScoring: true` modify the Oracle quality score. See [Quality Scoring](./quality-scoring) for the full bonus table.

---

## IPFS

### `POST /api/ipfs/upload`

Upload certificate metadata to IPFS. The Oracle API attempts providers in order: Filebase → Pinata → Web3.Storage → NFT.Storage.

**Request:** `multipart/form-data` with a `file` field.

**Response:**
```json
{
  "success": true,
  "data": {
    "cid": "bafybeig...",
    "url": "ipfs://bafybeig...",
    "provider": "filebase"
  }
}
```

---

## SDG Definitions

### `GET /api/sdg/definitions`

Returns all 17 UN Sustainable Development Goals with names, short names, official colors, and icon URLs.

---

### `GET /api/sdg/certificate/:serialNumber`

Returns the SDG mappings for a specific certificate — which SDGs the project contributes to.

---

### `GET /api/sdg/stats`

Returns per-SDG adoption counts across all approved certificates, ordered by adoption rate.

---

## Countries

### `GET /api/countries`

List all countries. Optionally filter by region.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `region` | string | `Africa`, `Americas`, `Asia`, `Europe`, `Oceania` |

---

### `GET /api/countries/regions`

List all available region names.

---

## Cron / Price Fetcher

### `GET /api/cron`

Returns the status of the price fetcher — last run time, next scheduled run, and per-source fetch results.

> The price fetcher is driven by `ncrb-indexer`, not the Oracle API. This endpoint reflects the state stored in the database by the indexer.

---

## Running Locally

```bash
# Clone and install
git clone https://github.com/ncrb/ncrb-oracles
cd ncrb-oracles
npm install

# Configure environment
cp .env.example .env
# Edit .env — add DB connection string, RPC URLs, contract addresses

# Run database migrations
npm run db:migrate

# Start development server (with nodemon)
npm run dev

# Start production server
npm start
```

The server starts on **port 3001** by default. Set `PORT` in `.env` to override.
