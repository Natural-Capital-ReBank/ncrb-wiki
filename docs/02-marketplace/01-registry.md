---
id: registry
title: Registry Guide
---

# Registry Partner Guide

Registry partners are organisations that submit verified real-world asset certificates to the NCRB platform. Once a certificate passes quality assessment and governance approval, RWA tokens are minted and distributed to the designated recipients.

**Examples of registry partners:** Verra, Gold Standard, American Carbon Registry, Plastic Bank, Plan Vivo.

---

## Prerequisites

Before you can submit certificates you need:

1. **A registered account** — your wallet address must be added to the `AccountManager` contract with `ACTIVE` status. Contact NCRB to initiate onboarding.
2. **The `REGISTRY_ROLE`** — granted to your wallet by an NCRB admin after your partnership agreement is signed.
3. **MetaMask installed** and connected to the correct network — see the [Quickstart guides](../quickstart) if you have not set this up.
4. **A small amount of native gas token** (AVAX, ETH, or XRP) in your wallet to pay transaction fees.

---

## The Certificate Lifecycle

```
Registry submits certificate
        │
        ▼
Oracle API computes quality score (0–100)
        │
        ▼
Certificate enters Governance queue
        │
     ┌──┴──────────────────┐
     │ 3-of-5 governance    │
     │ members vote         │
     └──┬──────────────────┘
        │
   ┌────┴────┐
Approved   Rejected / Expired
   │
   ▼
Tokens minted and distributed
   │
   ▼
Certificate available on marketplace
```

---

## Submitting a Certificate

<YouTubeEmbed id="EyUFFUnNVA0T28CQ" title="Registry - Submit Certificate" />

### 1 — Connect Your Wallet

1. Go to the **Registry Portal** in the NCRB dApp
2. Click **Connect Wallet** and select MetaMask
3. Approve the connection in MetaMask
4. Confirm the network matches the chain you intend to submit on (Fuji, Sepolia, or XRPL testnet)

### 2 — Select Asset Type

Choose one of the 10 supported asset classes:

| # | Asset Type | Unit |
|---|---|---|
| 0 | Carbon Credit | tCO₂e |
| 1 | Plastic Credit | tonne |
| 2 | Nitrogen Credit | kg N |
| 3 | Phosphorus Credit | kg P |
| 4 | Agricultural Land | hectares |
| 5 | Mining Rights | hectares |
| 6 | Water Rights | m³ |
| 7 | Renewable Energy Credit | MWh |
| 8 | Forestry Rights | hectares |
| 9 | Biodiversity Credit | hectares |

### 3 — Enter Certificate Details

Fill in the certificate metadata:

| Field | Description |
|---|---|
| **Serial Number** | Your registry's unique certificate identifier (e.g. `VCS-2024-001-001`) |
| **Project Name** | Name of the underlying project or asset |
| **Description** | Brief description of the project and environmental impact |
| **Vintage / Year** | Year the environmental benefit was generated |
| **Methodology** | Registry methodology code (e.g. `VM0015` for Verra) |
| **Sub-Type** | Asset sub-classification (e.g. `removal_dac`, `afforestation`). Sub-types with scoring impact are indicated in the dropdown. |
| **Country** | Country where the project is located |
| **Quantity** | Volume of the asset (in the unit for your asset type) |

### 4 — Upload Certificate Document

Upload your verification document to IPFS:

1. Click **Upload Certificate**
2. Select the PDF or JSON file from your local machine
3. The portal uploads it to IPFS via Filebase — you will receive a CID (content identifier)
4. This CID is stored on-chain as the authoritative reference to your certificate document

### 5 — Configure Quality Parameters

Enter the quality inputs that will be scored by the Oracle API. The fields vary by asset type. For carbon credits:

| Field | Example |
|---|---|
| Sylvera / BeZero Rating | `A` |
| Additionality Type | `Financial additionality` |
| Permanence Mechanism | `Buffer pool` |
| Certification Level | `CCP-Approved` |
| Co-benefits | CCB Gold, SDG 13, SDG 15 |
| Indigenous Community Engagement | Yes / No |

**For carbon credits — Article 6 compliance fields (optional but affect quality score):**

| Field | Options | Scoring impact |
|---|---|---|
| **Credit Mechanism** | VCM (default), Article 6.4, CORSIA, CDM → 6.4 | Article 6.4 → +5 additionality; CORSIA → +3 |
| **Corresponding Adjustment** | Not applicable, Applied | Applied → +2 additionality |
| **Letter of Authorisation (LoA) Status** | Not required / Pending, Provided | Provided (when CA = Applied) → +1 additionality |

A **Corresponding Adjustment** means the host country has formally transferred the mitigation outcome, preventing double-counting against both the host country's NDC and the buyer's corporate claim. Setting this to *Applied* and providing a LoA maximises the credit's additionality score.

The portal will show a **live quality score preview** as you fill in the fields.

### 6 — Set Token Distribution

Specify how token sale proceeds are distributed. The default split is:

| Recipient | Default Share |
|---|---|
| Asset Owner | 70% |
| NCRB Platform | 10% |
| Registry Partner | 10% |
| Third Party (aggregator) | 10% |

You can adjust these percentages — they must sum to 100%.

### 7 — Select SDG Goals

Select the UN Sustainable Development Goals your project contributes to. These are indexed on-chain and used by buyers to filter by impact alignment.

Each SDG selected adds **+1 to the co-benefits dimension** of your quality score, capped at +4. This bonus stacks on top of any sub-type co-benefits bonus.

### 8 — Submit

1. Review all details on the confirmation screen
2. Click **Submit Certificate**
3. MetaMask will prompt you to sign two transactions:
   - Transaction 1: Upload metadata to IPFS and call `AssetRegistry.submitCertificate()`
   - Transaction 2: Record quality assessment via `QualityAssessment.recordAssessment()`
4. Confirm both in MetaMask and wait for on-chain confirmation

Your certificate will now appear in the Governance queue.

---

## After Submission

### Tracking Your Submission

- Go to the **Registry Portal** and view the **My Certificates** tab
- Status will show: `Pending` → `Approved` → `Tokens Minted` (or `Rejected`)
- You can also track the proposal in the **Explorer** → **Standards / Compliance** tab

### What Happens if Rejected?

A governance member will record a rejection reason on-chain. Review the reason, correct the certificate details if possible, and resubmit as a new certificate.

### Token Distribution

When governance approves your certificate:
- Tokens are minted atomically to all distribution recipients in a single transaction
- You can view the minting event in the **My Certificates** tab
- Token balances appear immediately in each recipient's **MyNCRB Dashboard**

---

## Quality Score Requirements

| Band | Score | Result |
|---|---|---|
| AAA | 85–100 | Eligible — premium pricing |
| AA | 75–84 | Eligible |
| A | 65–74 | Eligible |
| BBB | 50–64 | Eligible — minimum threshold |
| Not Eligible | < 50 | Submission rejected before governance queue |

Certificates scoring below 50 are rejected at the quality assessment stage and do not enter the governance queue.

---

## Multi-Chain Submissions

You can submit the same underlying certificate to multiple chains to reach different liquidity pools. Each submission is tracked separately by the **CAD Registry** (Cross-chain Anti-Duplication) to prevent the same real-world asset from backing tokens on two chains simultaneously.

---

## Need Help?

See the [FAQ](../faq) or visit [Support](../support) for assistance with your submission.
