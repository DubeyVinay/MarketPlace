import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import Web3 from "web3";
import NFTAbi from "../ABIs/NFTAbi.json";
import MarketplaceAbi from "../ABIs/MarketplaceAbi.json";
const web3 = new Web3(window.ethereum);

const NFTAddress = "0xB597bDD800867597066D5c019E9335E2aa4CB1cB";
const marketplace = "0xb252186d3506Ddc7Dd61D02da5309bEa55FF8F23";
const erc20Token = "0x02CE860e119581d4634611f3d926E02D997004c9";
let tId;
let nft = new web3.eth.Contract(NFTAbi.abi, NFTAddress);
let marketPalce = new web3.eth.Contract(MarketplaceAbi.abi, marketplace);

export const mintNFT = async (owner, tokenURI, royalty, price) => {
  debugger;
  try {
    let res = await nft.methods
      .mint(owner, tokenURI, royalty)
      .send({ from: owner });
    tId = res.events.Transfer.returnValues.tokenId;
    let res2 = await marketPalce.methods
      .listNFT(tId, price)
      .send({ from: owner });

    return res2;
  } catch (error) {
    return false;
  }
};

export const buyNFTs = async (buyer) => {
  debugger;
  try {
    let res = await marketPalce.methods.buyNFT(tId).send({ from: buyer });
    return res;
  } catch (error) {
    return false;
  }
};
