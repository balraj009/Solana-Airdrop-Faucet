import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "react-toastify";

export default function ShowBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchBalance() {
    if (!publicKey) return;
    setLoading(true);

    const lamports = await connection.getBalance(publicKey);
    setBalance(lamports / LAMPORTS_PER_SOL);

    toast.success("Balance updated.");

    setLoading(false);
  }

  useEffect(() => {
    fetchBalance();
  }, [publicKey]);

  return (
    <div className="w-full flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-100 text-center">
        <h4 className="text-md font-semibold">SOL Balance</h4>

        <p className="text-xl font-mono mt-2">
          {balance === null ? "—" : balance.toFixed(4)}
        </p>

        <button
          onClick={fetchBalance}
          disabled={!publicKey || loading}
          className="mt-3 px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    </div>
  );
}
