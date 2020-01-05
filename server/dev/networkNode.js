const express = require("express");
const bodyParser = require("body-parser");
const blockchain = require("./blockchain");
const uuid = require("uuid/v1");
const port = process.argv[2];
const rp = require("request-promise");

const nodeAddress = uuid()
  .split("-")
  .join("");

const JAHcoin = new blockchain();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/blockchain", (req, res) => {
  res.send(JAHcoin);
});

app.post("/transaction", (req, res) => {
  const newTransaction = req.body;
  const blockIndex = JAHcoin.addToPendingTransaction(newTransaction);
  res.json({ note: `Transaction willl be added to ${blockIndex}` });
});

app.post("/transaction/broadcast", (req, res) => {
  const { amount, sender, recipient } = req.body;
  const newTransaction = JAHcoin.createNewTransaction(
    amount,
    sender,
    recipient
  );
  JAHcoin.addToPendingTransaction(newTransaction);

  const requestPromises = [];
  JAHcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOption = {
      uri: networkNodeUrl + "/transaction",
      method: "POST",
      body: newTransaction,
      json: true
    };

    requestPromises.push(rp(requestOption));
  });

  Promise.all(requestPromises).then(data => {
    res.json({ note: "Transaction Created and broadcast successfully." });
  });
});

app.get("/mine", (req, res) => {
  const lastBlock = JAHcoin.getLastBlock();
  const previousBlockHash = lastBlock["hash"],
    currentBlockData = {
      transaction: JAHcoin.pendingTransactions,
      index: lastBlock["index"] + 1
    };
  const nonce = JAHcoin.proofOfWork(previousBlockHash, currentBlockData);
  const hash = JAHcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  // JAHcoin.createNewTransaction(12.5, "00", nodeAddress);

  const newBlock = JAHcoin.createNewBlock(nonce, previousBlockHash, hash);

  const rpNodePromises = [];
  JAHcoin.networkNodes.forEach(networkNodesUrl => {
    const reqOption = {
      uri: networkNodesUrl + "/receive-new-block",
      method: "POST",
      body: {
        newBlock
      },
      json: true
    };

    rpNodePromises.push(rp(reqOption));
  });

  Promise.all(rpNodePromises)
    .then(data => {
      const requestOption = {
        uri: JAHcoin.currentNodeUrl + "/transaction/broadcast",
        method: "POST",
        body: {
          amount: 12.5,
          sender: "00",
          recipient: nodeAddress
        },
        json: true
      };
      return rp(requestOption);
    })
    .then(data => {
      res.json({
        note: "New block mined and boradcasted successfully",
        Block: newBlock
      });
    });
});

app.post("/receive-new-block", (req, res) => {
  const newBlock = req.body.newBlock;
  const lastBlock = JAHcoin.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const correctIndex = lastBlock["index"] + 1 === newBlock["index"];

  if (correctHash && correctIndex) {
    JAHcoin.chain.push(newBlock);
    JAHcoin.pendingTransactions = [];
    res.json({
      note: "New Block received and accepted",
      newBlock
    });
  } else {
    res.json({
      note: "New Block rejected",
      newBlock
    });
  }
});

app.post("/register-and-broadcast-node", (req, res) => {
  const newNodeUrl = req.body.newNodeUrl;
  if (JAHcoin.networkNodes.indexOf(newNodeUrl) == -1) {
    JAHcoin.networkNodes.push(newNodeUrl);
  }

  const rpNodePromises = [];
  JAHcoin.networkNodes.forEach(networkNodesUrl => {
    const reqOption = {
      uri: networkNodesUrl + "/register-node",
      method: "POST",
      body: {
        newNodeUrl
      },
      json: true
    };

    rpNodePromises.push(rp(reqOption));
  });

  Promise.all(rpNodePromises)
    .then(data => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + "/register-nodes-bulk",
        method: "POST",
        body: {
          allNetworkNode: [...JAHcoin.networkNodes, JAHcoin.currentNodeUrl]
        },
        json: true
      };
      return rp(bulkRegisterOptions);
    })
    .then(data => {
      res.json({ note: "New Node Registered Successfully" });
    });
});

app.post("/register-node", (req, res) => {
  const newNodeUrl = req.body.newNodeUrl;
  if (
    JAHcoin.networkNodes.indexOf(newNodeUrl) == -1 &&
    JAHcoin.currentNodeUrl !== newNodeUrl
  ) {
    JAHcoin.networkNodes.push(newNodeUrl);
  }
  res.json({ note: "New Node Registered Successfully" });
});

app.post("/register-nodes-bulk", (req, res) => {
  const allNetworkNode = req.body.allNetworkNode;

  console.log(allNetworkNode);
  allNetworkNode.forEach(networkNodesUrl => {
    if (
      JAHcoin.networkNodes.indexOf(networkNodesUrl) == -1 &&
      JAHcoin.currentNodeUrl !== networkNodesUrl
    ) {
      JAHcoin.networkNodes.push(networkNodesUrl);
    }
  });

  res.json({ note: "Bulk registration Successfully" });
});

app.get("/consensus", (req, res) => {
  const requestPromises = [];
  JAHcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + "/blockchain",
      method: "GET",
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises).then(blockchains => {
    const currentChainLength = JAHcoin.chain.length;
    let maxChainLength = currentChainLength;
    let newLongestChain = null;
    let newPendingTransactions = null;

    blockchains.forEach(blockchain => {
      if (blockchain.chain.length > maxChainLength) {
        maxChainLength = blockchain.chain.length;
        newLongestChain = blockchain.chain;
        newPendingTransactions = blockchain.pendingTransactions;
      }
    });

    if (
      !newLongestChain ||
      (newLongestChain && !JAHcoin.chainIsValid(newLongestChain))
    ) {
      res.json({
        note: "Current chain has not been replaced.",
        chain: JAHcoin.chain
      });
    } else {
      JAHcoin.chain = newLongestChain;
      JAHcoin.pendingTransactions = newPendingTransactions;
      res.json({
        note: "This chain has been replaced.",
        chain: JAHcoin.chain
      });
    }
  });
});

app.get("/block/:blockHash", (req, res) => {
  const blockHash = req.params.blockHash;
  const correctBlock = JAHcoin.getBlock(blockHash);

  res.json({
    Block: correctBlock
  });
});

app.get("/transaction/:transactionId", (req, res) => {
  const transactionId = req.params.transactionId;
  const transactionData = JAHcoin.getTransaction(transactionId);
  res.json({
    transaction: transactionData.transaction,
    Block: transactionData.Block
  });
});

app.get("/address/:address", (req, res) => {
  const address = req.params.address;
  const addressData = JAHcoin.getAddressData(address);
  res.json({
    addressData: addressData
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
