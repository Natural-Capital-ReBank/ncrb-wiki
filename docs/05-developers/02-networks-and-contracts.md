---
id: networks-and-contracts
title: Networks & Contracts
---

# Networks & Contracts

NCRB is deployed across three EVM-compatible testnets. All contract addresses below are current as of the March 2026 testnet deployment.

---

## Supported Networks

| Network | Chain ID | Type | RPC (Public) |
|---|---|---|---|
| **Avalanche Fuji** | 43113 | Testnet | `https://api.avax-test.network/ext/bc/C/rpc` |
| **Ethereum Sepolia** | 11155111 | Testnet | `https://rpc.sepolia.org` |
| **XRPL EVM Testnet** | 1449000 | Testnet | `https://rpc-evm-sidechain.xrpl.org` |

Network identifiers used in API calls: `fuji`, `sepolia`, `xrpl`

---

## Contract Addresses

### Avalanche Fuji (chainId 43113)

| Contract | Address | Deploy Start Block |
|---|---|---|
| AccountManager | `0x39BFC39b352AA252FD50D7A9e065BFB1833A6F5b` | 52507364 |
| AssetRegistry | `0xc338f40C75d2FAd3526EB0641f2772E93f53EEBf` | 52507364 |
| MultiSigGovernance | `0xe5036F6e75144299B0124800f02c239E22B319fE` | 52507364 |
| QualityAssessment | `0x0412f0848B1748A8F4CC7897dd3A9F23d75B2613` | 52507364 |
| RWAPriceOracle | `0xEFeCeDf7150c3C476E7B95EC97c7363E7c7fA6D8` | 52507364 |
| StandardsRegistry | `0xe078Bf34aED14Ca71FC85Fa3e06d01F235983902` | 52507364 |
| ComplianceRegistry | `0xf133eD0aF21368925E59E28B27fBC1e6088E40E1` | 52507364 |
| RWAToken | `0xEB1b40c3742229596788Ca9dAAE453A933aB26aD` | 52507364 |
| BuyerClaimsRegistry | `0xa31Fa27dbe9FB139Ec1868e6301ECb83C4ed1375` | 52507364 |
| RWAMarketplace | `0x5bD596C326f2596A39286614cFB575179F3f254E` | 52507364 |

### Ethereum Sepolia (chainId 11155111)

| Contract | Address | Deploy Start Block |
|---|---|---|
| AccountManager | `0x1DAf0a04e9DCD9b31F667391D12444086502d2a1` | 10410606 |
| AssetRegistry | `0xDEFb5C1d38dDE4f8cdb5B153C3F3d610DC682E6b` | 10410606 |
| MultiSigGovernance | `0xD67a2E51B0fA5d1d45a65aef2D13E0E7b611613E` | 10410606 |
| QualityAssessment | `0x3c78eB4d33dECeA671fbcd99A117516970118952` | 10410606 |
| RWAPriceOracle | `0x3aEA98fdf48A66f50a0a19C788B8437f11643766` | 10410606 |
| StandardsRegistry | `0x3Bc8E6aAdEaE3E9fF15bC79593012014cdaFe392` | 10410606 |
| ComplianceRegistry | `0x0751550333b20852FfF44Ba4C2057A3F4459c064` | 10410606 |
| RWAToken | `0xDc167057b0a29981b660f727b1F5976803960b22` | 10410606 |
| BuyerClaimsRegistry | `0xBdCc1Dc824DDd5F2AC2c2Bf205F7eaF7Ac228F8b` | 10410606 |
| RWAMarketplace | `0x35911D1264Ce62402d8E4d9ac3F1D31264205d2e` | 10410606 |

### XRPL EVM Testnet (chainId 1449000)

| Contract | Address | Deploy Start Block |
|---|---|---|
| AccountManager | `0x0De731de6a7f305F0896C01Dfe5ea2D32d8215A6` | 5794520 |
| AssetRegistry | `0xAACF25EeEd2E220919398cD9e303815e33A64Ba8` | 5794520 |
| MultiSigGovernance | `0x8db102926D289575A741b6AF9d898007f2e8daA4` | 5794520 |
| QualityAssessment | `0xE4401ced89201e087B38ad78bCB1E81bd7927671` | 5794520 |
| RWAPriceOracle | `0xAC5A6dd8D26db40813800A0b20fc4441De21c0eF` | 5794520 |
| StandardsRegistry | `0x342DcD06511cb37aF7Bf29ec9533b30618224032` | 5794520 |
| ComplianceRegistry | `0x4dFcf597A6238afe4e07178991B6E7858Cca0b7d` | 5794520 |
| RWAToken | `0x3Cb955f59171eeB44EA574c12687eEe939B0e0e4` | 5794520 |
| BuyerClaimsRegistry | `0xB14431263a0768f794B0DF03217CaB1F550e62aa` | 5794520 |
| RWAMarketplace | `0x801da81286780f5858A1218393528bf4673e109b` | 5794520 |

---

## Contract Descriptions

### AccountManager

Manages all platform participant accounts. All platform actions (minting, listing, retiring) require the caller's address to be registered and active.

**Key roles:**
- `DEFAULT_ADMIN_ROLE` — Full admin, can grant/revoke all roles
- `ACCOUNT_MANAGER_ROLE` — Can add, activate, suspend, and remove accounts
- `REGISTRY_ROLE` — Accounts permitted to submit certificates
- `GOVERNANCE_ROLE` — Accounts permitted to participate in governance
- `COMPLIANCE_ROLE` — Accounts permitted to flag compliance issues

**Account states:** `INACTIVE` → `ACTIVE` → `SUSPENDED` / `REMOVED`

**Account types:** `EOA` (externally owned account), `MULTISIG` (Gnosis Safe or equivalent)

---

### AssetRegistry

Handles certificate submission and lifecycle. Registry partners submit real-world asset certificates here, which triggers the quality assessment pipeline.

**Key events:**
- `CertificateSubmitted` — emitted on initial submission
- `CertificateFinalized` — emitted when governance approves and tokens are minted

---

### RWAToken

ERC-7943 (uRWA) compliant token contract. ERC-20 compatible with additional compliance hooks.

**Key roles:**
- `MINTER_ROLE` — Can mint new tokens (held by MultiSigGovernance)
- `COMPLIANCE_ROLE` — Can freeze tokens and execute forced transfers

**Key functions:**
- `canTransact(address)` — Checks whether an address is permitted to transact (delegates to AccountManager when set; open mode when `address(0)`)
- `canTransfer(address, address, uint256)` — Pre-flight check before any transfer
- `setFrozenTokens(address, uint256)` — Freeze a portion of a holder's balance
- `forcedTransfer(address, address, uint256)` — Compliance-role forced transfer

**Interface ID:** `0x29388973`

---

### MultiSigGovernance

3-of-5 multi-signature governance contract. Approves or rejects certificate submissions, which triggers token minting and distribution.

**Distribution:** Token proceeds are split atomically at mint time across up to 10 recipients using basis points. Default split: Asset Owner 70%, Registry Partner 10%, NCRB 10%, Third Party 10%.

---

### QualityAssessment

Stores quality scores and assessment metadata on-chain. The Oracle API writes scores here after computing them off-chain.

---

### RWAPriceOracle

On-chain price feed for all 10 asset types. Aggregates from multiple off-chain sources (managed by `ncrb-indexer`) with confidence scoring and staleness protection.

---

### StandardsRegistry

Registry of supported industry standards (Verra VCS, Gold Standard, ICVCM CCP, etc.) stored on-chain as `bytes32` identifiers.

---

### ComplianceRegistry

Records compliance attestations against specific certificates and standards. Tracks status (Pending, Compliant, NonCompliant, Expired, Revoked) with auto-expiry logic.

---

### BuyerClaimsRegistry

Permanent record of credit retirements. Each entry links a buyer wallet address, a retired certificate serial number, a claimed standard, and a timestamp — fulfilling VCMI and SBTi audit trail requirements.

---

### RWAMarketplace

Peer-to-peer marketplace with smart contract escrow. Sellers list tokens at a fixed price; buyers purchase and tokens transfer atomically with fee splitting.

**Fees:** 2.5% platform fee per trade, split atomically at settlement.

**ERC-7943 pre-flight checks:** `buy()` and `createListing()` check `canTransact()` / `canTransfer()` before execution. Uses `try/catch` to degrade gracefully when the token does not implement ERC-7943.

---

## Token Symbol Conventions

Each asset type uses a deterministic token symbol format:

| Asset Type | Symbol Pattern |
|---|---|
| Carbon Credits | `NC-CARBON-{ID}` |
| Plastic Credits | `NC-PLASTIC-{ID}` |
| Nitrogen Credits | `NC-NITROGEN-{ID}` |
| Phosphorus Credits | `NC-PHOSPHORUS-{ID}` |
| Agricultural Land | `NC-AGLAND-{ID}` |
| Mining Rights | `NC-MINING-{ID}` |
| Water Rights | `NC-WATER-{ID}` |
| Renewable Energy Credits | `NC-REC-{ID}` |
| Forestry Rights | `NC-FORESTRY-{ID}` |
| Biodiversity Credits | `NC-BIO-{ID}` |

---

## Connecting with ethers.js

```js
import { ethers } from 'ethers';

// Avalanche Fuji
const provider = new ethers.JsonRpcProvider(
  'https://api.avax-test.network/ext/bc/C/rpc'
);

const ACCOUNT_MANAGER_ADDRESS = '0x39BFC39b352AA252FD50D7A9e065BFB1833A6F5b';

// Minimal ABI for account status check
const abi = [
  'function getAccount(address) view returns (tuple(address addr, uint8 accountType, uint8 status, string name, string metadata, uint256 createdAt))'
];

const accountManager = new ethers.Contract(
  ACCOUNT_MANAGER_ADDRESS,
  abi,
  provider
);

const account = await accountManager.getAccount('0xYourAddress');
console.log(account.status); // 0 = INACTIVE, 1 = ACTIVE, 2 = SUSPENDED, 3 = REMOVED
```
