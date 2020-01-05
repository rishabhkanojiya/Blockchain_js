const Blockchain = require("./blockchain");

const JAHCoin = new Blockchain();

const bc1 = {
  chain: [
    {
      index: 1,
      timeStamp: 1577912883081,
      transactions: [],
      nonce: 100,
      hash: "0",
      previousBlockHash: "0"
    },
    {
      index: 2,
      timeStamp: 1577912922552,
      transactions: [],
      nonce: 16441,
      hash: "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285",
      previousBlockHash: "0"
    },
    {
      index: 3,
      timeStamp: 1577913001970,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cc5470802cda11eaba955595fe89a7d4",
          transactionId: "e3e527802cda11eaba955595fe89a7d4"
        },
        {
          amount: 900,
          sender: "rkAssffsgfadasdsdfsf",
          recipient: "kirAdsdafsdfsdfsfa",
          transactionId: "f8a88db02cda11eaba955595fe89a7d4"
        },
        {
          amount: 100,
          sender: "rkAssffsgfadasdsdfsf",
          recipient: "kirAdsdafsdfsdfsfa",
          transactionId: "077d65e02cdb11eaba955595fe89a7d4"
        },
        {
          amount: 1200,
          sender: "rkAssffsgfadasdsdfsf",
          recipient: "kirAdsdafsdfsdfsfa",
          transactionId: "0a6bac302cdb11eaba955595fe89a7d4"
        }
      ],
      nonce: 32183,
      hash: "000028f854960d307331cfcbac74ca019d40657713e69febccc60a0269d1a8b0",
      previousBlockHash:
        "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285"
    },
    {
      index: 4,
      timeStamp: 1577913092483,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cc5470802cda11eaba955595fe89a7d4",
          transactionId: "133239602cdb11eaba955595fe89a7d4"
        },
        {
          amount: 10,
          sender: "rkAssffsgfadasdsdfsf",
          recipient: "kirAdsdafsdfsdfsfa",
          transactionId: "3d80e9a02cdb11eaba955595fe89a7d4"
        },
        {
          amount: 20,
          sender: "rkAssffsgfadasdsdfsf",
          recipient: "kirAdsdafsdfsdfsfa",
          transactionId: "3fc5f7a02cdb11eaba955595fe89a7d4"
        },
        {
          amount: 30,
          sender: "rkAssffsgfadasdsdfsf",
          recipient: "kirAdsdafsdfsdfsfa",
          transactionId: "41d3f0102cdb11eaba955595fe89a7d4"
        }
      ],
      nonce: 179929,
      hash: "000043c51f6731daa5a3fd4d6668265ad97ff15c12463c5c11d56b25f6b9cfff",
      previousBlockHash:
        "000028f854960d307331cfcbac74ca019d40657713e69febccc60a0269d1a8b0"
    },
    {
      index: 5,
      timeStamp: 1577913102013,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cc5470802cda11eaba955595fe89a7d4",
          transactionId: "492569702cdb11eaba955595fe89a7d4"
        }
      ],
      nonce: 1632,
      hash: "0000db67f6b6f29348a8ced137286b650b8a6be5dbf15dd13a4446a539f9e805",
      previousBlockHash:
        "000043c51f6731daa5a3fd4d6668265ad97ff15c12463c5c11d56b25f6b9cfff"
    },
    {
      index: 6,
      timeStamp: 1577913104579,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cc5470802cda11eaba955595fe89a7d4",
          transactionId: "4ed36c002cdb11eaba955595fe89a7d4"
        }
      ],
      nonce: 15599,
      hash: "00006ada7f5932a6315257519be067519c2692021a0a85db91eb8a42f0bd0c0a",
      previousBlockHash:
        "0000db67f6b6f29348a8ced137286b650b8a6be5dbf15dd13a4446a539f9e805"
    }
  ],
  pendingTransactions: [
    {
      amount: 12.5,
      sender: "00",
      recipient: "cc5470802cda11eaba955595fe89a7d4",
      transactionId: "505acf502cdb11eaba955595fe89a7d4"
    }
  ],
  currentNodeUrl: "http://localhost:3001",
  networkNodes: []
};

console.log(`Valid : ${JAHCoin.chainIsValid(bc1.chain)}`);
