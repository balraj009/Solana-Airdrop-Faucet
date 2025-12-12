**S - A_F — Solana Airdrop Faucet**
==========================================================

**A simple and modern Solana wallet demo that allows users to:** 

* Connect a Solana wallet

* Request SOL airdrops on devnet

* View live SOL balance

* Sign messages (prove wallet ownership)

* Send SOL to any address on devnet

> Built using React + Wallet Adapter + Solana Web3.js.

* * *

🚀 **Features**
---------------

### 1) Connect Wallet

* Easily connect popular Solana wallets like Phantom, Solflare, and Backpack using Wallet Adapter.

### 2) Request Devnet SOL Airdrop

* Quickly receive free SOL on the Devnet for testing transactions and development.

### 3) Real-Time SOL Balance

* View your wallet’s current SOL balance with instant refresh support.

### 4) Sign Messages (Ed25519)

* Verify wallet ownership securely by signing messages and validating signatures.

### 5) Send SOL

* Transfer SOL to any devnet wallet address with one click.

* * *

🛠️ **Tech Stack**
------------------

*   **React + Vite** 
> Fast frontend framework and build tool for creating modern web apps.
    
*   **Solana Wallet Adapter** 
> Easily connects Solana wallets like Phantom, Solflare, and Backpack to your app.
    
*   **@solana/web3.js** 
> Official Solana JavaScript library used to send transactions, get balances, and interact with the blockchain.
    
*   **@noble/ed25519** 
> Cryptographic library used to sign and verify messages with the Ed25519 curve.
    
*   **TailwindCSS** 
> Utility-first CSS framework for building responsive and modern UI components.
    
*   **React-Toastify** 
> Shows clean, customizable toast notifications for alerts, errors, and success messages.
      
*   **Lucide Icons**
    

* * *

📦 **Installation**
-------------------

Clone the repo:

`git clone https://github.com/your-username/your-repo.git
cd your-repo` 

Install dependencies:

`npm install` 

* * *

⚙️ **Environment Setup**
-------------------

If you want a custom RPC provider, create:

**.env**

`VITE_RPC_URL=https://api.devnet.solana.com` 

And update ConnectionProvider:

`<ConnectionProvider endpoint={import.meta.env.VITE_RPC_URL}>` 

Start the project:

`npm run dev` 

* * *

📚 **Component Overview**
----------------------------
| Component              | Purpose |
| :---------------- | :------: |
| `SmallUI`      |   Wallet connect + disconnect card   |
| `ShowBalance`          |   Fetch & display SOL balance   |
| `RequestAirdrop`    |  Request devnet SOL airdrop   |
| `SignMessage` |  Sign + verify message ownership  |
| `SendTokens`  |   Send SOL to another wallet   |
| `ConnectWallet` |  Wraps all components + wallet providers   |
  

* * *

🔎 **How Solana Airdrop Faucet Works**
------------------------------

### 1️⃣ Connect a Wallet

*   Phantom

* Backpack

* MetaMash

Once connected, the app can read the wallet’s public key and perform actions on Devnet.
    

### 2️⃣ Fetch & Display Wallet Balance

After the wallet connects:

* The app calls `connection.getBalance(publicKey)`

* Converts lamports → SOL

* Shows the real-time balance

* Users can refresh anytime
    

### 3️⃣ Request Devnet Airdrop

Users enter an amount and request free SOL on Devnet.

* Convert entered SOL → lamports

* Send RPC request: `connection.requestAirdrop(publicKey, lamports)`

* Wait for confirmation

* Update balance

This is **free** and only works on **Devnet**.

### 4️⃣ Sign a Message (Prove Ownership)

Users can type any message and click Sign.

* Message → UTF-8 encoded

* Wallet signs using its private key

* Signature is verified locally using @noble/ed25519

* Base58 signature is shown and can be copied

This proves the connected wallet truly belongs to the user.

### 5️⃣ Send SOL Tokens

Users can send SOL to another Devnet address.

* Validate recipient address

* Convert SOL → lamports

* Build a Solana transaction using SystemProgram.transfer()

* Wallet signs + sends the transaction

* After confirmation, balance updates

Useful for testing transfers.
    

* * *

🤝 **Contributing**
-------------------

If you'd like to improve S - A_F (Solana Airdrop Faucet) or add new feature, feel free to open:

*   Issues
    
*   Feature requests
    
*   Pull requests
    

Contributions are always welcome ❤️

* * *

📄 **License**
--------------

This project is available under the **MIT License**  - free to use, modify, and distribute.

* * *

👨‍💻 **Developer**
--------------

Designed & Developed by Balraj
💡 MERN Developer | Web3 Enthusiast
