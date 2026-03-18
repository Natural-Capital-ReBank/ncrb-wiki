---
id: avalanche-network
title: Add Avalanche Networks
---

# Add Avalanche Networks to MetaMask

NCRB is live on the **Avalanche Fuji testnet** and will launch on **Avalanche C-Chain mainnet**. Add both networks to MetaMask so you can switch between them.

---

## Avalanche Fuji — Testnet

Fuji is the Avalanche test network. Use this to explore the NCRB platform, submit test certificates, and try the marketplace — all without real money.

### Add Fuji to MetaMask

1. Open MetaMask and click the network selector at the top (it may say "Ethereum Mainnet")
2. Click **Add a custom network** (or **Add network** → **Add a network manually**)
3. Enter the following details:

| Field | Value |
|---|---|
| **Network name** | Avalanche Fuji Testnet |
| **New RPC URL** | `https://api.avax-test.network/ext/bc/C/rpc` |
| **Chain ID** | `43113` |
| **Currency symbol** | `AVAX` |
| **Block explorer URL** | `https://testnet.snowtrace.io` |

4. Click **Save** — Fuji will appear in your network list

### Get Testnet AVAX (Free)

You need a small amount of AVAX to pay for gas fees on Fuji. Get free testnet AVAX from the Avalanche faucet:

1. Go to the [Avalanche Faucet](https://faucet.avax.network)
2. Select **Fuji (C-Chain)**
3. Paste your wallet address
4. Click **Request** — testnet AVAX will arrive in your wallet within seconds

> Testnet AVAX has no real-world value. It is only used to pay gas on the Fuji network.

---

## Avalanche C-Chain — Mainnet

The Avalanche C-Chain is the production network. This is where real assets and real USDC will be traded after the NCRB mainnet launch.

### Add Avalanche C-Chain to MetaMask

MetaMask may already include Avalanche C-Chain in its built-in network list:

1. Open MetaMask and click the network selector
2. Click **Add a custom network** → **Popular custom networks** — look for **Avalanche Network C-Chain**
3. If found, click **Add** and confirm

If it is not listed, add it manually:

| Field | Value |
|---|---|
| **Network name** | Avalanche C-Chain |
| **New RPC URL** | `https://api.avax.network/ext/bc/C/rpc` |
| **Chain ID** | `43114` |
| **Currency symbol** | `AVAX` |
| **Block explorer URL** | `https://snowtrace.io` |

4. Click **Save**

### Get Mainnet AVAX

To transact on Avalanche C-Chain mainnet you need AVAX to pay gas. You can acquire AVAX from:
- A centralised exchange (Coinbase, Binance, Kraken) — withdraw to your MetaMask address
- A cross-chain bridge (e.g. the [Avalanche Bridge](https://bridge.avax.network)) if you hold assets on Ethereum

---

## Switching Between Networks

1. Open MetaMask
2. Click the network selector at the top
3. Select **Avalanche Fuji Testnet** (testing) or **Avalanche C-Chain** (mainnet)

The NCRB dApp will automatically detect your active network and display the corresponding contracts and assets.

---

## What's Next?

- [Add XRPL EVM Networks](./xrpl-network) — set up the other supported network
- [Add USDC to Your Wallet](./add-usdc) — required to purchase credits on the marketplace
