---
id: architecture
title: Architecture
---

# Architecture

NCRB is a three-tier system: a **frontend layer**, an **Oracle API layer**, and a **blockchain layer**. A shared PostgreSQL database sits between the Oracle API and the blockchain indexer.

---

## High-Level Overview

```
┌─────────────────────────────────────────────────┐
│                  USER INTERFACES                 │
│  ncrb-website (marketing)                        │
│  ncrb-dapp (registry, governance, trading,       │
│             MyNCRB dashboard)                    │
└────────────────────┬────────────────────────────┘
                     │ HTTPS / REST
                     ▼
┌─────────────────────────────────────────────────┐
│              ORACLE API  (ncrb-oracles)          │
│  Express.js REST API  ·  Port 3001               │
│  Swagger UI at /docs  ·  OpenAPI at /docs.json   │
│                                                  │
│  Reads DB  ·  Reads contracts  ·  Writes txns    │
│  (account mgmt, quality assessment writes)       │
└────────┬───────────────────────┬────────────────┘
         │ SQL (read)            │ RPC (read/write)
         ▼                       ▼
┌─────────────────┐   ┌──────────────────────────┐
│   PostgreSQL    │   │   BLOCKCHAIN NETWORKS     │
│   (Neon)        │◄──│   Avalanche  ·  Ethereum  │
│   Shared DB     │   │   XRPL EVM               │
└────────▲────────┘   └──────────────────────────┘
         │ SQL (write)           ▲ RPC (read)
┌────────┴────────────────────┐ │
│  BLOCKCHAIN INDEXER         ├─┘
│  (ncrb-indexer)             │
│  Polling loop  ·  15s cycle │
│  Indexes contract events    │
│  Drives price aggregation   │
└─────────────────────────────┘
```

---

## Component Responsibilities

### ncrb-oracles (Oracle API)

The Oracle API is the primary backend service for the frontend dApp. It:

- **Reads the shared database** for indexed certificate data, governance proposals, price history, compliance records, and buyer claims
- **Reads smart contracts directly** via RPC for live on-chain state (account status, quality profiles, standards, rating bands)
- **Writes to contracts** for account management operations and quality assessment submissions (requires `ORACLE_PRIVATE_KEY`)
- **Serves Swagger UI** at `/docs` and the raw OpenAPI spec at `/docs.json`
- **Handles IPFS uploads** via Filebase (primary), Pinata, Web3.Storage, or NFT.Storage as fallback providers

The Oracle API is **stateless** — it does not maintain its own write-through to the database. All indexed data comes from `ncrb-indexer`.

### ncrb-indexer (Blockchain Indexer)

The indexer is a long-running Node.js process responsible for:

- **Full sync on startup** — replays all events from the deploy start block on each network
- **Incremental polling** every 15 seconds — picks up new events since the last synced block
- **Exponential backoff** on RPC failures — handles network instability gracefully
- **Price aggregation pipeline** — fetches prices from external sources (CoinGecko, GeckoTerminal, Toucan, Xpansiv CBL, ClimateTrade, USDA, ICIS, rePurpose Global) and writes weighted-average aggregations with confidence scores to the database
- **Writes `indexer_sync_state`** — tracks the last synced block per network so restarts resume from the correct position

The indexer is the **sole writer** to the shared database for blockchain-derived data. The Oracle API only reads this data.

### Shared PostgreSQL Database

A single Neon PostgreSQL instance is shared between `ncrb-oracles` and `ncrb-indexer`. The schema is managed via 14 sequential SQL migration files in `ncrb-oracles/database/migrations/`.

Key table groups:

| Group | Tables |
|---|---|
| **Certificates** | `asset_certificates`, `cad_registry` |
| **Governance** | `governance_proposals` |
| **Market** | `marketplace_listings`, `marketplace_trades`, `marketplace_aggregators` |
| **Compliance** | `compliance_records`, `onchain_standards`, `buyer_claims` |
| **Quality** | `onchain_quality_profiles`, `onchain_rating_bands` |
| **Prices** | `price_sources`, `price_history`, `price_aggregations`, `price_alerts` |
| **Reference** | `sdg_definitions`, `asset_sdg_mappings`, `asset_images`, `countries` |
| **Registry Config** | `registries`, `asset_types`, `registry_methodologies`, `quality_parameters`, `quality_band_mappings` |
| **Sync State** | `indexer_sync_state` |

### Smart Contracts (ncrb-contracts)

Ten Solidity contracts are deployed to each network (30 deployments total). They are written in Solidity 0.8.24, use OpenZeppelin's UUPS upgradeable proxy pattern, and enforce role-based access control.

See [Networks & Contracts](./networks-and-contracts) for addresses and roles.

---

## Request Lifecycle — Certificate Submission

```
Registry operator submits certificate via ncrb-dapp
    │
    ▼
ncrb-dapp calls POST /api/quality/assess (Oracle API)
    │
    ▼
Oracle API scores the certificate (0–100) across 6 dimensions
    │
    ▼
Oracle API calls AssetRegistry.submitCertificate() on-chain
    │
    ▼
ncrb-indexer detects CertificateSubmitted event (next 15s poll)
    │
    ▼
Indexer writes to asset_certificates table
    │
    ▼
ncrb-dapp reads certificate via GET /api/certificates/:serial
```

---

## Health Status

The `/api/health` endpoint returns one of three statuses:

| Status | HTTP | Meaning |
|---|---|---|
| `healthy` | 200 | Database connected and at least one network configured |
| `degraded` | 200 | No database but networks are configured |
| `unhealthy` | 503 | No networks configured at all |
