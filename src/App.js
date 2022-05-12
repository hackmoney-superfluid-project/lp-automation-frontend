import './App.css';
import NavBar from './components/NavBar';
import CreateStreamWidget from './components/superfluidWidgets/CreateStreamWidget';
import UpdateStreamWidget from './components/superfluidWidgets/UpdateStreamWidget';
import DeleteStreamWidget from './components/superfluidWidgets/DeleteStreamWidget';
import { useWalletConnect } from './utils/WalletConnectSessionWeb3Provider';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import SuperAppInterface from './constants/SuperAppPOC.json';
import { ethers } from 'ethers';

function App() {

  // get info about the current WalletConnect session
  const walletConnectSession = useWalletConnect();

  useEffect(() => {
    // init web3 and contract
    const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws-matic-mumbai.chainstacklabs.com"));
    const contract = new web3.eth.Contract(SuperAppInterface.abi, '0xE31a26B61FA29986a6679DD9063E12a754608999');

    contract.events.AgreementCreated({ fromBlock: 'latest' }).on('data', (event) => {
      console.log(event)
    })
  }, [])

  return (
    <Router>
      <div className='flex flex-col items-center w-full h-screen p-4 radial-gradient' >
        <NavBar />
        <div className='h-20' />
        <Routes>
          <Route path='/' element={<Navigate to="/create" />} />
          <Route path='/create' element={<CreateStreamWidget />} />
          <Route path='/update' element={<UpdateStreamWidget />} />
          <Route path='/delete' element={<DeleteStreamWidget />} />
          <Route path='*' element={<Navigate to="/create" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
