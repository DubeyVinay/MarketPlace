import React from "react";
import "./style.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="header">
        <div>
          <h3>Marketplace</h3>
        </div>
        <ul className="header-head">
          <li>
            <button
              style={{ marginRight: "25px" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Buy NFT
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/create");
              }}
            >
              Create NFT
            </button>
          </li>
        </ul>
        <ConnectButton />
      </div>
    </Container>
  );
};

export default Header;
