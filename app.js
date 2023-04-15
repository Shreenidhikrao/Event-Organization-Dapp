var account;
async function connectMetamask() {
if(window.ethereum !== "undefined") {
	const accounts = await ethereum.request({method: "eth_requestAccounts"});
	account = accounts[0];
	document.getElementById("accountArea").innerHTML = "connected";
}
}
async function connectContract() {
const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "buyTicket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ticketCount",
				"type": "uint256"
			}
		],
		"name": "createEvent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "events",
		"outputs": [
			{
				"internalType": "address",
				"name": "organizer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ticketCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ticketRemain",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "next",
				"type": "uint256"
			}
		],
		"name": "get",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "organizer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ticketCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ticketRemain",
						"type": "uint256"
					}
				],
				"internalType": "struct EventContract.Event",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMember",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "eventId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "ticketHolder",
				"type": "address"
			}
		],
		"name": "showTicket",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tickets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferTicket",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const Address = "0xbc542bDb455d9e42ef102A94A1d7c65d4fdff269";
window.web3 = await new Web3(window.ethereum);
window.contract = await new window.web3.eth.Contract( ABI, Address); 
document.getElementById("contractArea").innerHTML = "connected";
}	

async function getMembers() {
const eid = document.getElementById("show_event").value-1;
const data = await window.contract.methods.get(eid).call();
timestamp = data[2];
console.log(timestamp);
const date = new Date(timestamp * 1000);
const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
const ttodate = date.toLocaleString('en-US', options);
console.log(ttodate);
document.getElementById("next_id1").innerHTML = "Event name : " + data[1];
document.getElementById("next_id2").innerHTML = "Event date : " + ttodate;
document.getElementById("next_id3").innerHTML = "Price : " + data[3];
document.getElementById("next_id4").innerHTML = "Total Tickets : " + data[4];
document.getElementById("next_id5").innerHTML = "Available Tickets : " + data[5];
console.log(data);
}

async function eventCreate() {
const name1 = document.getElementById("name").value
const date1 = document.getElementById("date").value
const price1 = document.getElementById("price").value
const ticketCount1 = document.getElementById("ticketCount").value
  const accounts = await web3.eth.getAccounts();
  await contract.methods
.createEvent(name1, date1, price1, ticketCount1)
.send({ from: accounts[0] });
}

async function buyTicket() {
	const id1 = document.getElementById("eventId").value-1;
	const quantity1 = document.getElementById("quantity").value;
	const wei1 = document.getElementById("Wei").value	
	const accounts = await web3.eth.getAccounts();
	await contract.methods
	  .buyTicket(id1, quantity1)
	  .send({ from: accounts[0], value: wei1 });
}

async function transferTicket() {
  const id2 = document.getElementById("transferEventId").value;
  const quantity2 = document.getElementById("transferQuantity").value;
  const to2 = document.getElementById("transferTo").value;
  const accounts = await web3.eth.getAccounts();
  await eventContract.methods
.transferTicket(id2, quantity2, to2)
.send({ from: accounts[0] });
}

async function viewTicket() {
	const showid = document.getElementById("showEventId").value-1;
	const addr = document.getElementById("address").value;
	const data1 = await window.contract.methods.showTicket(showid , addr).call();
	document.getElementById("tickets").innerHTML = "Tickets: " +  data1;
}

async function getEvent(id) {
  return await eventContract.methods.events(id).call();
}

async function getTicket(owner, id) {
  return await eventContract.methods.tickets(owner, id).call();
}
