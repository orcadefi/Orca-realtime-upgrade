const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/...");

// You can also use an ENS name for the contract address
const bbiAddress = "bbi.tokens.ethers.eth";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const bbiAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

// The Contract object
const bbiContract = new ethers.Contract('0x37D40510a2F5Bc98AA7a0f7BF4b3453Bcfb90Ac1', bbiAbi, provider);
// Receiver Address
const address = "...";

async function getBalance(address,bbiContract){

    // Get the balance of an address
    balance = await bbiContract.balanceOf(address)
    // { BigNumber: "..." }

    // Format the BBI for displaying to the user
    console.log("Balance of", address, ":", ethers.utils.formatUnits(balance, 18),"BBI")
}
// Retrieve address BBI balance
getBalance(address,bbiContract);

// A filter for when a specific address receives tokens
const myAddress = "...";
const filter = bbiContract.filters.Transfer(null, myAddress)
// {
//   address: 'bbi.tokens.ethers.eth',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     null,
//     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
//   ]
// }

// Receive an event when that filter occurs
bbiContract.on(filter, (from, to, amount, event) => {
    // The to will always be "address"
    console.log(`I got ${ formatEther(amount) } from ${ from }.`);
});
