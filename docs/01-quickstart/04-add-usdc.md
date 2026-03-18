---
id: add-usdc
title: Add USDC to Your Wallet
---

# Add USDC to Your Wallet

NCRB uses **USDC (USD Coin)** as the payment currency on the marketplace. To buy credits you need USDC in your wallet on the same network as the listing you want to purchase.

USDC is a stablecoin — 1 USDC = 1 US Dollar.

---

## USDC Contract Addresses

USDC is a separate token on each network. You need to add the correct contract address for each chain you plan to use.

| Network | Chain | USDC Contract Address |
|---|---|---|
| Avalanche Fuji (testnet) | `43113` | `0x5425890298aed601595a70AB815c96711a31Bc65` |
| Ethereum Sepolia (testnet) | `11155111` | `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238` |
| XRPL EVM Testnet | `1449000` | `0x925965a6FCe11D0589dAD8972e7e5B8879bCb9ef` |

---

## How to Add USDC in MetaMask

The steps are the same for every network — just make sure you are on the correct network first.

### Step-by-step

1. Open MetaMask and switch to the network you want to add USDC on (e.g. **Avalanche Fuji Testnet**)
2. Scroll to the bottom of the token list and click **Import tokens**
3. Select the **Custom token** tab
4. Paste the USDC contract address for that network (see table above) into the **Token contract address** field
5. MetaMask will automatically fill in:
   - **Token symbol:** `USDC`
   - **Token decimals:** `6`
6. Click **Add custom token**
7. Click **Import tokens** to confirm

USDC will now appear in your MetaMask token list for that network.

---

## Repeat for Each Network

You need to add USDC separately on each chain you plan to use. Repeat the steps above after switching to each network:

- **Avalanche Fuji** — `0x5425890298aed601595a70AB815c96711a31Bc65`
- **Ethereum Sepolia** — `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`
- **XRPL EVM Testnet** — `0x925965a6FCe11D0589dAD8972e7e5B8879bCb9ef`

---

## Get Testnet USDC

Testnet USDC has no real value — it is used for testing the platform. You can get free testnet USDC from Circle's faucet:

### Avalanche Fuji & Ethereum Sepolia

1. Go to the [Circle USDC Faucet](https://faucet.circle.com)
2. Select the network (**Avalanche Fuji** or **Ethereum Sepolia**)
3. Paste your MetaMask wallet address
4. Click **Send** — testnet USDC will arrive within a minute

### XRPL EVM Testnet

The XRPL EVM testnet uses a bridged USDC. Check the [XRPL EVM Bridge](https://bridge.xrpl.org) or the NCRB support channels for current instructions on obtaining testnet USDC on XRPL EVM.

---

## Get Mainnet USDC

On mainnet you will use real USDC. You can acquire it from:

- **Centralised exchanges** — Coinbase, Binance, Kraken (search for USDC, withdraw to your MetaMask address on the correct chain)
- **Avalanche Bridge** — bridge USDC from Ethereum to Avalanche C-Chain at [bridge.avax.network](https://bridge.avax.network)
- **On-ramp services** — buy USDC directly with a card via MetaMask's built-in buy feature

> Always double-check you are withdrawing to the correct network. Sending USDC to the wrong chain may result in permanent loss of funds.

---

## Checking Your USDC Balance

1. Open MetaMask
2. Make sure you are on the correct network
3. USDC will appear in your token list with your current balance
4. If it does not appear, follow the **Add USDC in MetaMask** steps above

---

## What's Next?

You are ready to use NCRB. Visit the [NCRB Marketplace](https://www.ncrb.world/coming-soon) to browse available credits.

Need help? See the [FAQ](../faq) or visit our [Support](../support) page.
