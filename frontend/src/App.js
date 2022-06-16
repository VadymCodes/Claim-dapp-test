import React, { useEffect, useState } from 'react';
import TestContract from './contracts/Test.json';
import TokenContract from './contracts/MockToken.json';
// import getWeb3 from './getWeb3';
import Web3 from 'web3';
import './App.css';

const App = () => {
 
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [value, setValue] = useState("");
  let testContract;

  useEffect(() => {
    (async () => {
      try {
        // const web3 = await getWeb3();
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const tokenContract = new web3.eth.Contract(
          TokenContract.abi,
          "0xbDde9b61Dc4Edd5A39b9A6c71Bf6277f10f8aa09"
        );
        
        const bal = await tokenContract.methods.balanceOf(accounts[0]).call();
        setBalance(bal);
        
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    })();
  }, []);

  async function claim() {
    console.log(`value ${value}`);
    const web3Obj = new Web3(window.ethereum);
    testContract = new web3Obj.eth.Contract(
      TestContract.abi,
      "0x5dBD1d3C5179Fb34a917a3FBA1E7cfA9f45F71f1"
      );
    try {
      await testContract.methods.claim(value).call();
    } catch (error) {
      // console.error(error.message);
      alert(`You are not whitelist member.`);
    }
  }

  return (
    <div className='App'>
      <h1>Claim Your Tokens!</h1>
      <p>Only whitelist members can claim his tokens from his shed.</p>
        {account ? (
          <div>
            <p>Your wallet address is <strong>{account}</strong></p>
            <p>Your balance on contract is <strong>{balance ? balance / (10 ** 18) : "0"}</strong> that you can claim.</p>
          </div>) : 
          "Please connect your wallet."}
      <div>
        <input className="field" value={value} onChange={(e) => {setValue(e.target.value)}}/>
        <button className="button" onClick={claim}>Claim</button>
      </div>
    </div>
  );
};

export default App;
