---
id: intro
title: For Developers
---

# Developer Documentation

Welcome to the NCRB developer documentation. This section covers the technical architecture, smart contracts, Oracle API, quality scoring system, and supported asset types.

---

## Sections

| Section | Description |
|---|---|
| [Architecture](./architecture) | How the platform components fit together |
| [Networks & Contracts](./networks-and-contracts) | Testnet contract addresses and ABIs |
| [Oracle API](./oracle-api) | REST API reference — endpoints, request/response formats |
| [Quality Scoring](./quality-scoring) | How assets are scored, rated, and priced |
| [Asset Types](./asset-types) | All supported asset classes with IDs, units, and standards |

---

## Platform at a Glance

NCRB is a multi-chain Real-World Asset (RWA) tokenization platform. Developers interact with three primary layers:

**Smart Contracts** — Solidity contracts deployed on Avalanche, Ethereum, and XRPL EVM. Handles asset registration, token minting, governance, compliance, and marketplace trading.

**Oracle API** — A Node.js/Express REST API (`ncrb-oracles`) that bridges the blockchain and the frontend. Provides certificate queries, quality assessment, governance, account management, price data, compliance records, and more. A Swagger UI and OpenAPI spec are served alongside the API.

**Blockchain Indexer** — A separate polling service (`ncrb-indexer`) that watches all three chains for contract events, writes them to a shared PostgreSQL database, and drives the price aggregation pipeline. The Oracle API reads from this shared database.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contracts | Solidity 0.8.24, Hardhat, OpenZeppelin (UUPS upgradeable, role-based access control) |
| Token Standard | ERC-7943 (uRWA) — ERC-20 compatible with on-chain compliance hooks |
| Oracle API | Node.js (ESM), Express.js, Winston logging, Swagger UI |
| Indexer | Node.js polling loop, ethers.js v6, exponential backoff retry |
| Database | PostgreSQL (Neon) — shared between Oracle API and Indexer |
| Deployment | Vercel (serverless) for Oracle API; separate process for Indexer |
| Networks | Avalanche (C-Chain / Fuji), Ethereum (Mainnet / Sepolia), XRPL EVM |
