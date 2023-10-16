import React, { useContext } from "react";
import { useFormik } from "formik";
import { createNFTSchema } from "../../Components/Schemas/createNFTSchema";
import { Container, Form, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import appContext from "../../Context/ContextApp";
import "./style.css";
import { useAccount } from "wagmi";
import { mintNFT } from "../../ContractIntegration/ContractIntegration";
const CreateNFT = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { setData, data } = useContext(appContext);
  const initialValues = {
    NFTImage: "",
    NFTName: "",
    NFTDescription: "",
    NFTPrice: 0,
    NFTRoyalty: 0,
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: createNFTSchema,
    onSubmit: async (values, action) => {
      if (address != undefined) {
        try {
          const _json = new File([JSON.stringify(values)], "metadata.json");
          console.log("JSON File", _json);

          // initialize the form data
          const fData = new FormData();

          // append the file form data to
          fData.append("file", _json);

          // call the keys from .env

          const API_KEY = "099da30c376bd5f4e031";
          const API_SECRET =
            "7b531f0e2f403bf6b727bca44625a5f7d098e96f0773eb3384c3d2a0bdf03bd0";

          // the endpoint needed to upload the file
          const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

          const response = await axios.post(url, fData, {
            maxContentLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data;boundary=${initialValues._boundary}`,
              pinata_api_key: API_KEY,
              pinata_secret_api_key: API_SECRET,
            },
          });

          console.log("file", response.data.IpfsHash);

          //Contract Calling
          const res = await mintNFT(
            address,
            response.data.IpfsHash,
            values.NFTRoyalty,
            values.NFTPrice
          );

          if (res != false) {
            const hash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            const hashArray = [hash, ...data];

            setData(hashArray);
            localStorage.setItem("Hash", JSON.stringify(hashArray));
            action.resetForm();
            navigate("/");
          } else {
            alert("Something Went Wrong!");
          }
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert("please connect metamask first!");
      }
    },
  });

  const getFile = async (e) => {
    const file = e.target.files[0];
    // initialize the form data
    const fData = new FormData();

    // append the file form data to
    fData.append("file", file);

    // call the keys from .env

    const API_KEY = "099da30c376bd5f4e031";
    const API_SECRET =
      "7b531f0e2f403bf6b727bca44625a5f7d098e96f0773eb3384c3d2a0bdf03bd0";

    // the endpoint needed to upload the file
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const response = await axios.post(url, fData, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data;boundary=${initialValues._boundary}`,
        pinata_api_key: API_KEY,
        pinata_secret_api_key: API_SECRET,
      },
    });

    const imgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    console.log(imgHash);
    setFieldValue("NFTImage", imgHash);
    //initialValues.NFTImage = imgHash;
  };
  return (
    <Container>
      <Col md="3"></Col>
      <Col md="6">
        <div
          className="createnft-header"
          style={{ marginTop: "50px", textAlign: "left" }}
        >
          <div>
            <h4>Create NFT</h4>
          </div>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>NFT Image</Form.Label>
                <Form.Control type="file" onChange={getFile} />
              </Form.Group>
              <Form.Group>
                <Form.Label>NFT Name</Form.Label>
                <Form.Control
                  type="text"
                  className="text"
                  autoComplete="off"
                  placeholder="Enter NFT Name"
                  name="NFTName"
                  value={values?.NFTName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.NFTName && touched.NFTName ? (
                  <p className="error">{errors.NFTName}</p>
                ) : null}
              </Form.Group>

              <Form.Group>
                <Form.Label>NFT Description</Form.Label>
                <Form.Control
                  type="text"
                  className="text"
                  autoComplete="off"
                  placeholder="Enter NFT Description"
                  name="NFTDescription"
                  value={values?.NFTDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.NFTDescription && touched.NFTDescription ? (
                  <p className="error">{errors.NFTDescription}</p>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>NFT Price</Form.Label>
                <Form.Control
                  type="number"
                  className="text"
                  autoComplete="off"
                  placeholder="Enter NFT Price"
                  name="NFTPrice"
                  value={values?.NFTPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.NFTPrice && touched.NFTPrice ? (
                  <p className="error">{errors.NFTPrice}</p>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>NFT Royalty</Form.Label>
                <Form.Control
                  type="number"
                  className="text"
                  autoComplete="off"
                  placeholder="Enter NFT Royalty"
                  name="NFTRoyalty"
                  value={values?.NFTRoyalty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.NFTRoyalty && touched.NFTRoyalty ? (
                  <p className="error">{errors.NFTRoyalty}</p>
                ) : null}
              </Form.Group>
              <Button
                className="signup-button"
                type="submit"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#8c40cf",
                  border: "none",
                }}
              >
                Create
              </Button>
            </Form>
          </div>
        </div>
      </Col>
      <Col md="2"></Col>
    </Container>
  );
};

export default CreateNFT;
