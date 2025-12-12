import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import RequestAirdrop from "./RequestAirdrop";
import ShowBalance from "./ShowBalance";
import SignMessage from "./SignMessage";
import SendTokens from "./SendTokens";

function SmallUI() {
  const { connected } = useWallet();

  return (
    <div className="w-full flex items-center justify-center px-4 py-8">
      <div
        className="w-full max-w-5xl rounded-xl border border-slate-700
                   bg-slate-900 shadow-lg p-6 text-slate-100
                   flex flex-col items-center gap-5 text-center"
      >
        <div>
          <h4 className="text-lg font-semibold">Wallet</h4>
          <p className="text-xs text-slate-400 mt-1">
            Connect to use app features
          </p>
        </div>

        <div className="w-auto">
          <WalletMultiButton />
        </div>

        {connected && (
          <div className="w-auto">
            <WalletDisconnectButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConnectWallet() {
  return (
    <ConnectionProvider endpoint={import.meta.env.VITE_RPC_URL}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <SmallUI />
          <ShowBalance />
          <div className="w-full max-w-5xl mx-auto px-4">
            <div className="flex flex-row justify-center items-center grid grid-cols-1 lg:grid-cols-3 gap-4">
              <RequestAirdrop />
              <SignMessage />
              <SendTokens />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
