const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const { ethers } = require("ethers");
const contractABI = require("./artifacts/contracts/HelloWorld.sol/HelloWorld.json"); 

const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "0xEAd57E231e485567ccC5eEe65a7c1791123D761F";
const contract = new ethers.Contract(contractAddress, contractABI.abi, wallet);

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
    
});

app.get("/status", async(req, res) => {
    const message = await contract.message();
    res.status(200).send({
        status: true,
        message: 'hello world!',
        data: {
            message
        }
    })
});
app.post("/update", async (req, res) => {
    try {
      const { newMessage } = req.body;
      const tx = await contract.update(newMessage);
      await tx.wait();
      res.json({ txHash: tx.hash, newMessage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });