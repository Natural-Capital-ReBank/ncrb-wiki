---
id: xrpl-network
title: Add XRPL EVM Networks
---

# Add XRPL EVM Networks to MetaMask

NCRB is live on the **XRPL EVM Sidechain testnet** and will launch on the **XRPL EVM Sidechain mainnet**. The XRPL EVM Sidechain is an Ethereum-compatible chain built by Ripple, giving XRPL users access to EVM smart contracts and DeFi — including NCRB's RWA marketplace.

---

## XRPL EVM Sidechain — Testnet

The XRPL EVM testnet is for exploring NCRB without using real funds.

### Add XRPL EVM Testnet to MetaMask

1. Open MetaMask and click the network selector at the top
2. Click **Add a custom network** → **Add a network manually**
3. Enter the following details:

| Field | Value |
|---|---|
| **Network name** | XRPL EVM Sidechain Testnet |
| **New RPC URL** | `https://rpc-evm-sidechain.xrpl.org` |
| **Chain ID** | `1449000` |
| **Currency symbol** | `XRP` |
| **Block explorer URL** | `https://evm-sidechain.xrpl.org` |

4. Click **Save** — the XRPL EVM Testnet will appear in your network list

### Get Testnet XRP (Free)

You need a small amount of XRP to pay for gas on the XRPL EVM testnet. Get free testnet XRP from the XRPL faucet:

1. Go to the [XRPL EVM Faucet](https://faucet.evm-sidechain.xrpl.org)
2. Paste your MetaMask wallet address
3. Click **Request XRP** — testnet XRP arrives within seconds

> Testnet XRP has no real-world value. It is only used to pay gas on the XRPL EVM testnet.

---

## XRPL EVM Sidechain — Mainnet

The XRPL EVM Sidechain mainnet is the production network. Real assets and real USDC will be traded here after the NCRB mainnet launch.

### Add XRPL EVM Mainnet to MetaMask

1. Open MetaMask and click the network selector
2. Click **Add a custom network** → **Add a network manually**
3. Enter the following details:

| Field | Value |
|---|---|
| **Network name** | XRPL EVM Sidechain |
| **New RPC URL** | `https://rpc-evm-sidechain.xrpl.org` |
| **Chain ID** | `1440002` |
| **Currency symbol** | `XRP` |
| **Block explorer URL** | `https://evm-sidechain.xrpl.org` |

4. Click **Save**

### Get Mainnet XRP

To transact on the XRPL EVM mainnet you need XRP for gas. You can acquire XRP from:
- A centralised exchange (Coinbase, Binance, Kraken, Bitstamp) — withdraw to your MetaMask address
- If you already hold XRP in an XRPL account, you can bridge it to the EVM Sidechain via the [XRPL Bridge](https://bridge.xrpl.org)

---

## Switching Between Networks

1. Open MetaMask
2. Click the network selector at the top
3. Select **XRPL EVM Sidechain Testnet** (testing) or **XRPL EVM Sidechain** (mainnet)

The NCRB dApp automatically detects your active network and switches to the correct contracts.

---

## What's Next?

- [Add Avalanche Networks](./avalanche-network) — set up the other supported network
- [Add USDC to Your Wallet](./add-usdc) — required to purchase credits on the marketplace
