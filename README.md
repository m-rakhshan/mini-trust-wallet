# Mini Trust Wallet (React Native + Expo)

Tiny ETH wallet MVP with:
- create/import mnemonic
- address + QR + copy
- live ETH balance
- secure mnemonic storage
- seed reveal warning + wallet reset

## Tech Stack

- Expo + React Native + TypeScript
- `ethers` for mnemonic, derivation, and address checksum
- `expo-secure-store` for seed storage
- `react-native-qrcode-svg` for QR rendering

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment file and set RPC URL:

```bash
cp .env.example .env
```

Example RPC:

```env
ETH_RPC_URL=https://cloudflare-eth.com
```

3. Run app:

```bash
npm run start
```

## MVP Features

### 1) Onboarding
- Create wallet generates 12-word BIP-39 mnemonic.
- Import wallet accepts 12/24 words and validates phrase.
- Address is derived at path:

`m/44'/60'/0'/0/0`

### 2) Wallet Home
- Shows EIP-55 checksummed address.
- Renders scannable QR of address.
- Copy button copies address to clipboard.
- Fetches ETH balance from `ETH_RPC_URL`.

### 3) Settings
- Seed reveal is protected by warning confirmation.
- Reset wallet clears secure storage and returns to onboarding.

## Required Test Fixture

Use this mnemonic in import flow:

`test test test test test test test test test test test junk`

Expected address at `m/44'/60'/0'/0/0`:

`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

## Non-goals (intentionally not included)

- Sending transactions
- Token lists / NFTs / dapps
- Multi-chain support

## AI usage

- Tooling used: Cursor AI assistant.
- Prompts used: dependency/setup guidance, commit strategy, and implementation guidance for onboarding/wallet/settings MVP.
- Files touched with AI assistance:
  - `App.tsx`
  - `app.config.ts`
  - `.env.example`
  - `.gitignore`
  - `src/navigation/index.tsx`
  - `src/navigation/bottom/index.tsx`
  - `src/navigation/bottom/routes.tsx`
  - `src/screens/Onboarding/index.tsx`
  - `src/screens/Wallet/index.tsx`
  - `src/screens/Settings/index.tsx`
  - `src/services/wallet.ts`
  - `src/services/index.ts`
  - `src/storage/secure.ts`
  - `src/storage/index.ts`

All generated content was reviewed and adjusted before finalizing.