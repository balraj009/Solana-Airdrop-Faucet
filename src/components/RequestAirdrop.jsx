import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "react-toastify";

function RequestAirdrop() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [amount, setAmount] = useState("0.1");
  const [loading, setLoading] = useState(false);

  async function requestAirdrop() {
    if (!wallet || !wallet.connected || !wallet.publicKey) {
      toast.error("Connect your wallet first.");
      return;
    }

    const sol = parseFloat(amount);
    if (Number.isNaN(sol) || sol <= 0) {
      toast.error("Enter a valid amount ( > 0 ).");
      return;
    }

    setLoading(true);

    try {
      const sig = await connection.requestAirdrop(
        wallet.publicKey,
        amount * LAMPORTS_PER_SOL
      );
      toast.info("Airdrop requested. Awaiting confirmation...");
    } catch (err) {
      console.error("Airdrop error:", err);
      toast.error("Airdrop failed: " + (err?.message || String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xs mx-auto mt-4">
      <label className="block text-sm text-slate-300 mb-2 text-center">
        Request devnet airdrop (SOL)
      </label>

      <div className="flex gap-2">
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-700"
          aria-label="amount in SOL"
        />

        <button
          onClick={requestAirdrop}
          disabled={!wallet?.connected || loading}
          className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Requesting..." : "Airdrop"}
        </button>
      </div>
    </div>
  );
}

export default RequestAirdrop;
