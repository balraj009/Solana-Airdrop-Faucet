import NavBar from "./components/Navbar";
import ConnectWallet from "./components/ConnectWallet";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 p-4">
      <NavBar />
      <ConnectWallet />
      <Footer />
    </div>
  );
}

export default App;
