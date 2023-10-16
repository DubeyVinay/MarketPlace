import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import BuyNFT from "./Pages/Buy NFT/BuyNFT";
import CreateNFT from "./Pages/CreateNFT/CreateNFT";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        {/* Router */}
        <Routes>
          <Route path="/" index element={<BuyNFT />} />
          <Route path="/create" index element={<CreateNFT />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
