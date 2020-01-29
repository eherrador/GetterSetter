import React, { Component } from "react";
import GetterSetterContract from "./contracts/GetterSetter.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { storageNumber: 0, storageString: "---", web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("account[0]: "+accounts[0]);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log("networkId: "+networkId);
      const deployedNetwork = GetterSetterContract.networks[networkId];
      console.log("deployedNetwork: "+deployedNetwork);
      console.log("deployedNetwork address: "+deployedNetwork.address);
      const instance = new web3.eth.Contract(
        GetterSetterContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    console.log("Account: "+accounts[0]);
    console.log("Contract: "+contract);
    
    try {
      // Stores a given value, 53 by default.
      await contract.methods.setNumber(44).send({ from: accounts[0] });
    }
    catch (error){
      console.log("error: "+error);
    }
    // Get the value from the contract to prove it worked.
    const responseNumber = await contract.methods.getNumber().call();
    console.log("responseNumber: "+responseNumber);
    // Update state with the result.
    this.setState({ storageNumber: responseNumber });

    try {
      // Stores a given value, Edgar by default.
      await contract.methods.setString("Mikki").send({ from: accounts[0] });
    }
    catch (error){
      console.log("error: "+error);
    }
    // Get the value from the contract to prove it worked.
    const responseString = await contract.methods.getString().call();
    console.log("responseString: "+responseString);
    // Update state with the result.
    this.setState({ storedString: responseString });
  };

  render() {
    if (!this.state.web3) {
      return <div>There is an error loading Web3...</div>;
    }
    return (
      <div className="App">
        <h2>Smart Contract</h2>
        <div>The stored number is: {this.state.storageNumber}</div>
        <div>The stored string is: {this.state.storedString}</div>
      </div>
    );
  }
}

export default App;
