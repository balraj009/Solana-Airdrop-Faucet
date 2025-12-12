import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { toast } from "react-toastify";

export default function SendTokens() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.1");
  const [loading, setLoading] = useState(false);

  async function handleSendToken() {
    if (!wallet?.publicKey) return toast.error("Connect your wallet");
    if (!to) return toast.error("Enter recipient address");
    const sol = parseFloat(amount);
    if (Number.isNaN(sol) || sol <= 0)
      return toast.error("Enter a valid amount");

    let toPub;
    try {
      toPub = new PublicKey(to);
    } catch {
      return toast.error("Invalid recipient address");
    }

    const lamports = Math.round(sol * LAMPORTS_PER_SOL);
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: toPub,
        lamports,
      })
    );

    setLoading(true);
    try {
      const sig = await wallet.sendTransaction(tx, connection);
      await connection.confirmTransaction(sig);
      toast.success(`Sent ${sol} SOL — ${sig.slice(0, 8)}…`);
    } catch (err) {
      console.error("Send error:", err);
      toast.error(err?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 text-center">
        <h4 className="text-lg font-semibold">Send SOL</h4>
        <p className="text-xs text-slate-400 mt-1">Send tokens on devnet</p>

        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Recipient address"
          className="w-full mt-3 px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-700 text-sm"
        />

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          step="0.01"
          min="0"
          placeholder="Amount (SOL)"
          className="w-full mt-3 px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-700 text-sm"
        />

        <button
          onClick={handleSendToken}
          disabled={!wallet?.connected || loading}
          className="w-full mt-4 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50"
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
