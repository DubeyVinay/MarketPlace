import React, { useContext, useEffect, useState } from "react";
import appContext from "../../Context/ContextApp";
import axios from "axios";
import { useAccount } from "wagmi";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { buyNFT, buyNFTs } from "../../ContractIntegration/ContractIntegration";
const BuyNFT = () => {
  const { address } = useAccount();
  const { data } = useContext(appContext);
  const [nftDetails, getNftDetails] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const a = JSON.parse(localStorage.getItem("Hash"));
    const nftDetailsArray = [];
    for (let i = 0; i < a.length; i++) {
      const res = await axios.get(`${a[i]}`);
      nftDetailsArray.push(res.data);

      // fetch(`${a[i]}`, {
      //   headers: {
      //     Accept: "text/plain",
      //   },
      // }).then((res) => console.log(res.json()));

      // getNftDetails(res);
    }
    console.log("<<<<<<<,", nftDetailsArray);
    getNftDetails(nftDetailsArray);
  };

  const handleBuy = async () => {
    if (address != undefined) {
      let res = await buyNFTs(address);
      if (res != false) {
        alert("You Bought a NFT");
      } else {
        alert("Something went wrong!");
      }
    } else {
      alert("Please connect to metamask!");
    }
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <div>
        <Row>
          {nftDetails.map((item, key) => (
            <>
              <Col style={{ marginTop: "20px" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img src={item?.NFTImage} />
                  <Card.Body>
                    <Card.Title>
                      {item?.NFTName}
                      <br />
                    </Card.Title>
                    <p>${item?.NFTPrice}</p>
                    <Button onClick={handleBuy}>Buy Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default BuyNFT;
