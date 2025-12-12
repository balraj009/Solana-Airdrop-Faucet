// SignMessage.jsx
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as ed25519 from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha2.js";
import bs58 from "bs58";
import { toast } from "react-toastify";

ed25519.etc.sha512Sync = (...m) => sha512(ed25519.etc.concatBytes(...m));
ed25519.etc.sha512Async = async (...m) => sha512(ed25519.etc.concatBytes(...m));

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [sigB58, setSigB58] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSign() {
    if (!publicKey) return toast.error("Connect wallet first");
    if (!signMessage) return toast.error("Wallet cannot sign messages");
    if (!message) return toast.error("Enter a message");

    setLoading(true);
    try {
      const encoded = new TextEncoder().encode(message);
      const signature = await signMessage(encoded);

      const valid = await ed25519.verifyAsync(
        signature,
        encoded,
        publicKey.toBytes()
      );

      if (!valid) throw new Error("Invalid signature");

      const b58 = bs58.encode(signature);
      setSigB58(b58);
      toast.success("Message signed");
    } catch (err) {
      console.error("Sign error:", err);
      toast.error(err?.message || "Sign failed");
      setSigB58("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex items-center justify-center px-4 py-4">
      <div
        className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100
                   flex flex-col items-center gap-4 text-center"
      >
        <div>
          <h4 className="text-lg font-semibold">Sign Message</h4>
          <p className="text-xs text-slate-400 mt-1">Prove wallet ownership</p>
        </div>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message to sign"
          className="w-full px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-700 text-sm"
        />

        <button
          onClick={handleSign}
          disabled={loading || !publicKey}
          className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Signing…" : "Sign Message"}
        </button>

        {sigB58 ? (
          <div className="w-full mt-2">
            <div className="text-xs text-slate-400 mb-1">Signature</div>
            <div className="flex flex-col justify-center items-center gap-2">
              <code className="flex-1 break-all bg-slate-800 p-2 rounded text-sm font-mono">
                {sigB58}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(sigB58);
                  toast.info("Signature copied");
                }}
                className="px-2 py-1 rounded-md border border-slate-700 text-sm cursor-pointer hover:bg-slate-700"
              >
                Copy
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
