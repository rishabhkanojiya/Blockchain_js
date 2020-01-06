# Blockchain_js

![made with_ nodejs](https://user-images.githubusercontent.com/30200462/71843133-3270fc00-30e9-11ea-8761-fbbed9b8b617.png)
![made with_ reactjs](https://user-images.githubusercontent.com/30200462/71843141-343abf80-30e9-11ea-86f3-964b096dcdd4.png)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](http://ec2-52-90-41-158.compute-1.amazonaws.com:3050/)



![Screenshot from 2020-01-07 00-14-42](https://user-images.githubusercontent.com/30200462/71840448-57fb0700-30e3-11ea-9291-76974cdcd131.png)


![Screenshot from 2020-01-07 00-16-40](https://user-images.githubusercontent.com/30200462/71840450-58939d80-30e3-11ea-9527-3385ff9c9465.png)



Blockchain js is a decentralized blockchain network made using nodejs and express running across five nodes synchronized with each other and with no node conflicts so that all nodes have the same data.

The Blockchain_js have all of the following features:

- A proof of work algorithm to secure the network.
- Hashing algorithms within the blockchain to protect the data.
- The ability to mine (create) new data-containing blocks.
- The ability to create and store transactions in blocks.
- An API / server that is used from the internet to communicate with the blockchain.
- It will be hosted on a blockchain network that is decentralized.
- A consensus algorithm to check the integrity and alignment of the network nodes.
- A broadcasting system for the synchronization of data in the blockchain network.

## Guidelines

This document provides guidelines and examples for Blockchain_js APIs, maintainability, and best practices across applications. Blockchain_js APIs aim to balance a truly RESTful API interface.

## Tech

Blockchain_js uses a number of open source projects to work properly:

- [node.js](https://nodejs.org/en/) - evented I/O for the backend
- [Express](https://expressjs.com/) - fast node.js network app framework [@tjholowaychuk]
- [ReactJS](https://reactjs.org/) - HTML enhanced for web apps!
- [Docker $ Docker-compose](https://www.docker.com/) - Securely build, share and run any application, anywhere.


## Installation

Blockchain_js requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/rishabhkanojiya/Blockchain_js.git
$ docker-compose up
```

## Routes 

## /home

* You can use the route /home to find blocks, transactions and addresses using the hash value.
* Use the api route /mine to obtain the hash value. 
* After using /transaction/ broadcast, the /blockchain route can be used to find the transactionId 
* The address of the sender or the receiver can be used in the Address section

![Screenshot from 2020-01-07 00-16-40](https://user-images.githubusercontent.com/30200462/71840450-58939d80-30e3-11ea-9527-3385ff9c9465.png)



## /api

![Screenshot from 2020-01-07 00-15-37](https://user-images.githubusercontent.com/30200462/71840449-58939d80-30e3-11ea-931b-aeb95a1e82d3.png)


## Request & Response Examples

### API Resources

1. GET /blockchain
2. POST /register-and-broadcast-node
3. POST /transaction/broadcast
4. GET /mine
5. GET /consensus

Other Resources

- POST /register-node
- POST /register-nodes-bulk

### GET /blockchain

```sh
$ GET http://localhost:3001/blockchain
```

Response body:

```
{
  "chain": [
    {
      "index": 1,
      "timeStamp": 1577872441944,
      "transactions": [],
      "nonce": 100,
      "hash": "0",
      "previousBlockHash": "0"
    }
  ],
  "pendingTransactions": [],
  "currentNodeUrl": "http://localhost:3001",
  "networkNodes": []
}
```

### POST /register-and-broadcast-node

```sh
$ POST http://localhost:3002/register-and-broadcast-node
```

Request body :

```
{
	"newNodeUrl": 	"http://localhost:PORT"
}
```

PORT can be :3001, 3002, 3003, 3004, 3005

Response body:

```
{
  "chain": [
    {
      "index": 1,
      "timeStamp": 1577873393360,
      "transactions": [],
      "nonce": 100,
      "hash": "0",
      "previousBlockHash": "0"
    },
    {
      "index": 2,
      "timeStamp": 1577873456078,
      "transactions": [
        {
          "amount": 222240,
          "sender": "rkAssffsgfadasdsdfsf",
          "recipient": "kirAdsdafsdfsdfsfa"
        },
        {
          "amount": 12.5,
          "sender": "00",
          "recipient": "da9f5d002c7e11eaa836bd8c2b4e8978"
        }
      ],
      "nonce": 34285,
      "hash": "0000a6c53b6b02a3a31e01a50b76ec68eeaea2d8b6b16a7da1c006da78889421",
      "previousBlockHash": "0"
    }
  ],
  "pendingTransactions": [],
  "currentNodeUrl": "http://localhost:3001",
  "networkNodes": ["http://localhost:3004", "http://localhost:3002"]
}
```

### POST /transaction/broadcast

```sh
$ POST http://localhost:3001/transaction/broadcast
```

Request body :

```
{
	"amount": 222240,
	"sender": "rkAssffsgfadasdsdfsf",
	"recipient": "kirAdsdafsdfsdfsfa"

}
```

Response body:

```
{
  "note": "Transaction Created and broadcast successfully."
}
```

Output :

```
{
    "chain": [
        {
            "index": 1,
            "timeStamp": 1577907958807,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 900,
            "sender": "rkAssffsgfadasdsdfsf",
            "recipient": "kirAdsdafsdfsdfsfa",
            "transactionId": "654822202ccf11ea9dbde3407d5d76d4"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": [
        "http://localhost:3005",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004"
    ]
}
```

### GET /mine

```sh
$ GET http://localhost:3001/mine
```

Response body:

```
{
    "note": "New block mined and boradcasted successfully",
    "Block": {
        "index": 2,
        "timeStamp": 1577907865551,
        "transactions": [
            {
                "amount": 900,
                "sender": "rkAssffsgfadasdsdfsf",
                "recipient": "kirAdsdafsdfsdfsfa",
                "transactionId": "1682e1702ccf11eaa6161fca2679060f"
            }
        ],
        "nonce": 243531,
        "hash": "000008b81dc605c9d8ef96593c44ccce24d3940f02ef39b4ff63120ad37ec7b2",
        "previousBlockHash": "0"
    }
}
```

Output :

```
{
    "chain": [
        {
            "index": 1,
            "timeStamp": 1577907824592,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timeStamp": 1577907865551,
            "transactions": [
                {
                    "amount": 900,
                    "sender": "rkAssffsgfadasdsdfsf",
                    "recipient": "kirAdsdafsdfsdfsfa",
                    "transactionId": "1682e1702ccf11eaa6161fca2679060f"
                }
            ],
            "nonce": 243531,
            "hash": "000008b81dc605c9d8ef96593c44ccce24d3940f02ef39b4ff63120ad37ec7b2",
            "previousBlockHash": "0"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "053c6d002ccf11eab36a513327ae1365",
            "transactionId": "1da7f3a02ccf11eab36a513327ae1365"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": [
        "http://localhost:3005",
        "http://localhost:3002",
        "http://localhost:3003"
    ]
}
```

## Consensus algorithm

> A consensus algorithm is a mechanism through which all the Blockchain network peers achieve a common agreement on the distributed ledger's current state.

### GET /consensus

```sh
$ GET http://localhost:3005/consensus
```

Response body:

```
{
    "note": "This chain has been replaced.",
    "chain": [
        {
            "index": 1,
            "timeStamp": 1577955820912,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timeStamp": 1577955918353,
            "transactions": [],
            "nonce": 16441,
            "hash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285",
            "previousBlockHash": "0"
        },
        {
            "index": 3,
            "timeStamp": 1577955924593,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "c54cfa002d3e11ea9432b9ed2ec60f63",
                    "transactionId": "ff6199302d3e11ea9432b9ed2ec60f63"
                }
            ],
            "nonce": 11244,
            "hash": "00001dffe90cfdd6e01b149bac7f9f2dd7d7bf2dc02218e08b543031ab3f3104",
            "previousBlockHash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285"
        }
    ]
}
```
